"use client"

import { useState } from "react"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import DashboardContent from "@/components/dashboard-content"
import DashboardFooter from "@/components/dashboard-footer"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function Dashboard() {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null)

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col">
        <DashboardHeader />
        <div className="flex flex-1">
          <DashboardSidebar />
          <main className="flex-1 overflow-x-hidden">
            <DashboardContent selectedVehicle={selectedVehicle} setSelectedVehicle={setSelectedVehicle} />
          </main>
        </div>
        <DashboardFooter />
      </div>
    </SidebarProvider>
  )
}
