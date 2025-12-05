# Fuelguard Copilot Instructions

## Project Overview

**Fuelguard** is a production-ready IoT fuel monitoring and theft detection system designed for real-time fuel tracking, automatic theft detection, and multi-channel notifications.

**⚠️ CURRENT STATUS: Mock Data Mode Only** - The system currently runs with mock/demo data. Firebase is not connected. All data flows through in-memory mock objects. See `lib/firebase.ts` for `isDemoMode` flag.

### Technology Stack (Design Intent)

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS, Radix UI components
- **Backend**: Firebase Cloud Functions, Firestore, Node.js 20, TypeScript (not currently active)
- **IoT Bridge**: MQTT (EMQX/Mosquitto) ↔ Firestore bridge service (infrastructure only)
- **Hardware**: ESP32 + dual fuel sensors (ultrasonic + float) + GPS + Reed switch (not connected)
- **Notifications**: Firebase Cloud Messaging (FCM), Twilio SMS, SendGrid email (mocked)

## Mock Data Mode (Current Implementation)

### How Mock Data Works

1. **`lib/firebase.ts`** detects if Firebase credentials are missing: `isDemoMode = !firebaseConfig.apiKey || firebaseConfig.apiKey === "demo"`
2. When `isDemoMode = true`, all hooks check this flag **before** attempting Firebase operations
3. Hooks return hardcoded MOCK_DATA arrays instead of Firestore listeners
4. Components render identically whether using mock or real data—no UI changes needed
5. **All data is static in-memory**—modifications require code changes

### Mock Data Sources

- **`hooks/useVehicles.ts`**: MOCK_VEHICLES array with 3 trucks (Mumbai, Delhi, Bangalore locations, varying fuel levels)
- **`hooks/useAlerts.ts`**: MOCK_ALERTS array with theft, low_fuel, device_offline alerts, mix of active/resolved
- **`hooks/useFuelReadings.ts`**: Historical data arrays for chart display
- **`lib/api.ts`**: ApiClient methods that would fetch real data—currently unused in mock mode

### Example Mock Data Structure

```typescript
// From hooks/useVehicles.ts
const MOCK_VEHICLES: Vehicle[] = [
  {
    id: "veh-001",
    plateNumber: "XYZ-123",
    model: "Truck Alpha",
    status: "online",
    fuelLevel: 75,
    location: { lat: 19.076, lng: 72.8777 },
    deviceId: "ESP32-001",
  },
  // ... more vehicles
];
```

### Enabling Real Firebase (Future)

To transition from mock data to real Firebase:

1. Set environment variables in `.env.local`: `NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_PROJECT_ID`, `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`, etc.
2. Restart development server
3. `isDemoMode` automatically becomes false
4. Hooks activate Firestore `onSnapshot` listeners
5. **Component code needs zero changes**—data structure matches mock format exactly
6. Backend Cloud Functions in `backend/functions/` will begin operating

### Key Implementation Pattern (All Hooks)

```typescript
export function useVehicles() {
  const { orgId } = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    if (isDemoMode) {
      // Use mock data
      setVehicles(MOCK_VEHICLES);
      setLoading(false);
      return;
    }
    // ... Firebase listener code would go here
  }, [orgId]);

  return { vehicles, loading, error };
}
```

## Real Architecture (Reference for Future Firebase Integration)

### Three-Layer Data Flow

```
ESP32 Sensors
  ↓ (MQTT publish)
MQTT Broker (TLS encrypted)
  ↓ (Topic: fuelguard/devices/{deviceId}/data)
Bridge Service (Node.js)
  ↓ (Validates + transforms)
Firestore (Real-time database)
  ↓ (onFuelReadingCreated trigger)
Cloud Functions (Theft detection, alerts)
  ↓
Frontend Dashboard (Real-time listeners) + Notifications (FCM/SMS/Email)
```

### Data Isolation Pattern (When Firestore Active)

All collections use **organizationId** field for multi-tenant isolation:

- `users`, `vehicles`, `devices`, `fuelReadings`, `alerts` all have `organizationId`
- Firestore security rules enforce organization-level access control
- Frontend hooks query with `where("organizationId", "==", orgId)`
- **Never query without organizationId filter**

### Dual Sensor Validation (Hardware Design)

Fuel readings combine two sensors:

- **ultrasonic**: JSN-SR04T waterproof sensor (primary, most accurate)
- **float**: Analog float sensor (backup, slower response)
- Theft detection triggers only on validated readings with both sensors healthy

## Key File Locations & Patterns

### Frontend Structure

- **`lib/api.ts`**: ApiClient class with methods like `api.vehicles.list()`, `api.alerts.list()` (currently unused in mock mode)
- **`lib/firebase.ts`**: Firebase SDK initialization with `isDemoMode` detection
- **`hooks/`**: Custom React hooks with mock data fallback
  - `useVehicles()` - Returns `{vehicles, loading, error}` from MOCK_VEHICLES
  - `useAlerts(options)` - Filters MOCK_ALERTS by vehicleId and status
  - `useFuelReadings()` - Returns mock fuel history data
- **`components/pages/`**: Page layouts (fleet-management.tsx, fuel-statistics.tsx)
- **`components/ui/`**: Radix UI wrapped components with Tailwind

### Backend Structure (Not Currently Active)

```
backend/functions/src/
  ├── api/          # HTTP endpoint handlers (vehicles, devices, alerts, dashboard)
  ├── services/     # Business logic (theft detection, notification sending)
  ├── triggers/     # Firestore document triggers
  ├── types/        # TypeScript interfaces
  └── utils/        # Helper functions
```

### Important Dependencies & Tools

- **Zod**: Runtime validation (backend only—frontend skips validation in mock mode)
- **Jest**: Backend test framework (with `firebase-functions-test` emulator)
- **Next.js 14**: React framework with app router
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component library

## Theft Detection Algorithm (Reference)

Located in `backend/functions/src/triggers/alertTrigger.ts` (not active in mock mode):

- Triggers on fuel reading write to Firestore
- Detects: **fuel drop > 10% in < 5 minutes**
- Validates: Both sensors must agree, GPS location captured
- Creates alert document with type `fuel_theft`, severity `critical`
- Calls notification services (FCM, SMS, email)

## Development Workflows

### Frontend Development (Current)

```powershell
# Start development server
npm run dev

# All data comes from mock objects in hooks/
# Components render mock data without changes
```

### Adding New Features in Mock Mode

**Add a new vehicle to mock data:**

1. Edit `hooks/useVehicles.ts`
2. Add object to `MOCK_VEHICLES` array
3. Refresh browser—new vehicle appears in dashboard

**Add a new alert type:**

1. Update Alert type in `hooks/useAlerts.ts`
2. Add objects to `MOCK_ALERTS` array
3. Create UI component to display the alert type
4. Refresh browser—alert displays

### Testing Backend (Not Active)

```powershell
cd backend/functions
npm test                  # Run Jest tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
```

### Deployment Notes

- **Frontend only**: Can deploy to Vercel with just Next.js code
- **Backend (when activated)**: Requires Firebase Cloud Functions deployment
- **Current status**: No backend deployment needed

## Project-Specific Conventions

### Code Style

- **TypeScript Strict Mode**: `strict: true` in `tsconfig.json`
- **React Hooks**: Check `isDemoMode` before Firebase operations
- **Error Handling**: Mock mode skips auth/network errors
- **Demo Mode Fallback**: All hooks follow the same pattern

### Naming Conventions

- **Collections** (future): Plural lowercase (vehicles, devices, alerts, fuelReadings)
- **Document IDs** (future): Auto-generated by Firestore, referenced as `id` field
- **API routes** (future): `/api/{resource}` for list, `/api/{resource}/{id}` for single
- **React hooks**: `useVehicles()`, `useAlerts()`, `useFuelReadings()`

### Environment Variables

- **Frontend (mock mode)**: No variables required—works immediately
- **Future Firebase**: `NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_PROJECT_ID`, etc. in `.env.local`
- Check `.env.example` in root for all variables when ready to activate Firebase

## Integration Points (Future Reference)

### Firebase Services (When Activated)

- **Authentication**: Email/password via Firebase Auth
- **Firestore**: Real-time document database with security rules
- **Cloud Functions**: Node.js 20 runtime
- **Cloud Messaging (FCM)**: Push notifications

### Third-Party APIs (When Activated)

- **Twilio**: SMS notifications
- **SendGrid**: Email notifications
- **MQTT Broker**: EMQX or Mosquitto for device communication

### MQTT Message Format (Reference)

**Device → Cloud** (published to `fuelguard/devices/{deviceId}/data`):

```json
{
  "deviceId": "ESP32_001",
  "timestamp": 1234567890,
  "data": {
    "fuel": { "ultrasonic": 45.2, "float": 2048, "percentage": 55.25 },
    "gps": { "lat": 37.7749, "lon": -122.4194, "speed": 45.5 },
    "battery": 4.1,
    "signal": 25
  }
}
```

## Common Tasks in Mock Mode

### Adding a New Page

1. Create file in `app/{page-name}/page.tsx`
2. Use existing hooks (useVehicles, useAlerts) to fetch mock data
3. Mock data automatically renders—no backend needed
4. Hooks handle loading/error states

### Adding a New Hook with Mock Data

1. Create `hooks/use{Resource}.ts`
2. Define MOCK_DATA array matching the data structure
3. Check `isDemoMode` and return MOCK_DATA
4. Use with `useEffect` and `useState` for loading state
5. Export `{data, loading, error}` tuple

### Modifying Mock Data

1. Find the MOCK_DATA array in the relevant hook
2. Edit objects directly in the array
3. Restart dev server or the component will auto-refresh
4. Changes are immediate—no database required

## Known Limitations (Mock Mode)

- **No persistence**: Changes to mock data are lost on page refresh
- **No real-time sync**: Data is static; two browser windows see the same mock data
- **No authentication**: Login bypassed—all pages accessible
- **No notifications**: FCM/SMS/email skipped in mock mode
- **No MQTT bridge**: Hardware devices not connected

## References

- **Backend Deep Dive**: `backend/README.md` - API structure, collection schemas (reference only)
- **Deployment**: `docs/DEPLOYMENT.md` - Production setup (reference only)
- **Main README**: `README.md` - Architecture overview
- **For Firebase Migration**: `lib/firebase.ts` contains activation logic
