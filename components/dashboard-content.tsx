"use client"

import { Suspense } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SummaryCards from "@/components/summary-cards"
import VehicleSelector from "@/components/vehicle-selector"
import VehicleOverviewTable from "@/components/vehicle-overview-table"
import LiveFuelGraph from "@/components/live-fuel-graph"
import VehicleTrackingMap from "@/components/vehicle-tracking-map"
import TheftAlertPanel from "@/components/theft-alert-panel"
import DeviceHealthPanel from "@/components/device-health-panel"
import NotificationsPanel from "@/components/notifications-panel"

interface DashboardContentProps {
  selectedVehicle: string | null
  setSelectedVehicle: (vehicleId: string | null) => void
}

export default function DashboardContent({ selectedVehicle, setSelectedVehicle }: DashboardContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 md:p-6 space-y-6"
    >
      <div className="grid gap-4 md:gap-6">
        <SummaryCards />

        <div className="grid gap-4 md:gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-1">
              <VehicleSelector selectedVehicle={selectedVehicle} setSelectedVehicle={setSelectedVehicle} />
            </div>
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Vehicle Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <VehicleOverviewTable />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Live Fuel Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading chart...</div>}>
                <LiveFuelGraph />
              </Suspense>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Real-Time Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading map...</div>}>
                <VehicleTrackingMap />
              </Suspense>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Theft Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <TheftAlertPanel />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Device Health</CardTitle>
            </CardHeader>
            <CardContent>
              <DeviceHealthPanel />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <NotificationsPanel />
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
