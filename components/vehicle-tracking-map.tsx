"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Car, RefreshCw } from "lucide-react"

// Mock vehicle location data
const vehicleLocations = [
  { id: "VEH-123", lat: 40.7128, lng: -74.006, speed: 45, lastUpdate: "2 min ago" },
  { id: "VEH-456", lat: 40.7282, lng: -73.9942, speed: 0, lastUpdate: "5 min ago" },
  { id: "VEH-789", lat: 40.7112, lng: -74.014, speed: 32, lastUpdate: "1 min ago" },
  { id: "VEH-101", lat: 40.722, lng: -73.9985, speed: 27, lastUpdate: "3 min ago" },
]

export default function VehicleTrackingMap() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState("map")

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  useEffect(() => {
    // Simulate periodic location updates
    const interval = setInterval(handleRefresh, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Tabs defaultValue="map" className="w-full" onValueChange={setActiveTab}>
          <div className="flex items-center justify-between w-full">
            <TabsList>
              <TabsTrigger value="map">Map</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
            <Button size="sm" variant="outline" onClick={handleRefresh}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          <TabsContent value="map" className="m-0 mt-2">
            <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-muted/50">
              {/* Placeholder for Google Maps */}
              <div className="h-full w-full bg-[url('/placeholder.svg?height=400&width=800')] bg-cover">
                {/* Vehicle markers */}
                {vehicleLocations.map((vehicle, index) => (
                  <motion.div
                    key={vehicle.id}
                    className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                    style={{
                      // Convert lat/lng to relative position in the container
                      left: `${((vehicle.lng + 74.02) / 0.04) * 100}%`,
                      top: `${(1 - (vehicle.lat - 40.7) / 0.04) * 100}%`,
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Car className="h-4 w-4" />
                    </div>
                    <div className="mt-1 rounded-md bg-background/90 px-2 py-1 text-[10px] shadow">
                      <div className="font-bold">{vehicle.id}</div>
                      <div className="text-muted-foreground">{vehicle.speed} km/h</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="absolute bottom-2 left-2 rounded-md bg-background/80 p-2 text-xs">
                <div className="font-medium">Map Legend</div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Vehicle Location</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="list" className="m-0 mt-2">
            <div className="rounded-md border">
              <div className="grid grid-cols-3 gap-2 p-3 font-medium">
                <div>Vehicle</div>
                <div>Speed</div>
                <div>Last Update</div>
              </div>
              {vehicleLocations.map((vehicle) => (
                <div key={vehicle.id} className="grid grid-cols-3 gap-2 border-t p-3">
                  <div className="font-medium">{vehicle.id}</div>
                  <div>{vehicle.speed} km/h</div>
                  <div className="text-muted-foreground">{vehicle.lastUpdate}</div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
