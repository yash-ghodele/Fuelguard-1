"use client"

import { Battery, Signal, Timer } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock device health data
const devices = [
  {
    id: "ESP32-123",
    vehicleId: "VEH-123",
    rssi: -67,
    battery: 78,
    lastSync: "5 min ago",
    status: "active",
  },
  {
    id: "ESP32-456",
    vehicleId: "VEH-456",
    rssi: -72,
    battery: 45,
    lastSync: "12 min ago",
    status: "active",
  },
  {
    id: "ESP32-789",
    vehicleId: "VEH-789",
    rssi: -58,
    battery: 92,
    lastSync: "3 min ago",
    status: "active",
  },
  {
    id: "ESP32-101",
    vehicleId: "VEH-101",
    rssi: -85,
    battery: 23,
    lastSync: "1 min ago",
    status: "error",
  },
]

export default function DeviceHealthPanel() {
  // Function to determine signal strength based on RSSI
  const getSignalStrength = (rssi: number) => {
    if (rssi > -70) return { label: "Excellent", color: "bg-green-500" }
    if (rssi > -80) return { label: "Good", color: "bg-amber-500" }
    return { label: "Poor", color: "bg-red-500" }
  }

  return (
    <ScrollArea className="h-[280px]">
      <div className="space-y-4">
        {devices.map((device) => {
          const signal = getSignalStrength(device.rssi)

          return (
            <div
              key={device.id}
              className={`rounded-lg border p-3 ${
                device.status === "error" ? "border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/20" : ""
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="font-medium">{device.id}</span>
                <span className="text-xs text-muted-foreground">{device.vehicleId}</span>
              </div>

              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Signal className="h-4 w-4 text-muted-foreground" />
                    <span>Signal Strength</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className={`h-2 w-2 rounded-full ${signal.color}`}></div>
                    <span>
                      {signal.label} ({device.rssi} dBm)
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Battery className="h-4 w-4 text-muted-foreground" />
                    <span>Battery Level</span>
                  </div>
                  <span>{device.battery}%</span>
                </div>

                <Progress
                  value={device.battery}
                  className="h-1.5"
                  indicatorClassName={
                    device.battery < 25 ? "bg-red-500" : device.battery < 50 ? "bg-amber-500" : "bg-green-500"
                  }
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Timer className="h-4 w-4 text-muted-foreground" />
                    <span>Last Sync</span>
                  </div>
                  <span>{device.lastSync}</span>
                </div>
              </div>

              <div className="mt-2 text-sm">
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={
                    device.status === "active" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  }
                >
                  {device.status === "active" ? "Active" : "Error"}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
}
