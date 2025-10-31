"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MapPin, Shield, ShieldAlert } from "lucide-react"

// Mock theft alert data
const theftAlerts = [
  {
    id: "alert-1",
    vehicleId: "VEH-101",
    timestamp: "Today, 10:23 AM",
    location: "Dallas, TX",
    fuelLoss: 12.5,
    status: "active",
  },
  {
    id: "alert-2",
    vehicleId: "VEH-456",
    timestamp: "Yesterday, 8:45 PM",
    location: "Chicago, IL",
    fuelLoss: 8.2,
    status: "resolved",
  },
  {
    id: "alert-3",
    vehicleId: "VEH-789",
    timestamp: "Yesterday, 3:12 PM",
    location: "Los Angeles, CA",
    fuelLoss: 15.0,
    status: "active",
  },
]

export default function TheftAlertPanel() {
  const [alerts, setAlerts] = useState(theftAlerts)

  const resolveAlert = (alertId: string) => {
    setAlerts(alerts.map((alert) => (alert.id === alertId ? { ...alert, status: "resolved" } : alert)))
  }

  return (
    <ScrollArea className="h-[280px]">
      <div className="space-y-4">
        {alerts.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center p-4">
            <Shield className="mb-2 h-10 w-10 text-muted-foreground" />
            <h3 className="font-medium">No alerts</h3>
            <p className="text-center text-sm text-muted-foreground">All vehicles are secure</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`rounded-lg border p-3 ${
                alert.status === "active" ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30" : ""
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldAlert
                    className={`h-4 w-4 ${alert.status === "active" ? "text-red-500" : "text-muted-foreground"}`}
                  />
                  <span className="font-medium">{alert.vehicleId}</span>
                </div>
                <Badge variant={alert.status === "active" ? "destructive" : "outline"}>
                  {alert.status === "active" ? "Active" : "Resolved"}
                </Badge>
              </div>

              <div className="space-y-1 text-sm">
                <div className="text-muted-foreground">{alert.timestamp}</div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{alert.location}</span>
                </div>
                <div className="font-medium text-red-600 dark:text-red-400">
                  Fuel Loss: {alert.fuelLoss.toFixed(1)} L
                </div>
              </div>

              {alert.status === "active" && (
                <div className="mt-2 flex justify-end">
                  <Button size="sm" variant="outline" onClick={() => resolveAlert(alert.id)}>
                    Resolve
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  )
}
