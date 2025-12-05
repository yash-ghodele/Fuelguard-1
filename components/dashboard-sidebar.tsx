"use client"

import { Car, Droplets, GaugeCircle, Home, Settings, ShieldAlert, Truck, User } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export default function DashboardSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-r bg-gradient-to-b from-slate-900/50 via-slate-800/50 to-slate-900/50">
      <SidebarHeader className="pb-4 border-b border-white/10">
        <div className="flex items-center justify-center py-4 group-data-[collapsible=icon]:py-2">
          <div className="flex items-center gap-3 text-xl font-bold">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 shrink-0 shadow-lg shadow-purple-500/50 animate-pulse"></div>
            <span className="group-data-[collapsible=icon]:hidden bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">FuelGuard</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground/70">Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive tooltip="Dashboard" className="hover-glow group">
                  <a href="/dashboard" className="flex items-center gap-3">
                    <Home className="h-5 w-5 transition-all group-hover:scale-110 group-hover:text-primary" />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Vehicle Tracking" className="hover-glow group">
                  <a href="/vehicles" className="flex items-center gap-3">
                    <Car className="h-5 w-5 transition-all group-hover:scale-110 group-hover:text-primary" />
                    <span>Vehicle Tracking</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Fuel Statistics" className="hover-glow group">
                  <a href="/fuel-statistics" className="flex items-center gap-3">
                    <Droplets className="h-5 w-5 transition-all group-hover:scale-110 group-hover:text-primary" />
                    <span>Fuel Statistics</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Theft Alerts" className="hover-glow group">
                  <a href="/alerts" className="flex items-center gap-3">
                    <ShieldAlert className="h-5 w-5 transition-all group-hover:scale-110 group-hover:text-primary" />
                    <span>Theft Alerts</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Fleet Management" className="hover-glow group">
                  <a href="/fleet" className="flex items-center gap-3">
                    <Truck className="h-5 w-5 transition-all group-hover:scale-110 group-hover:text-primary" />
                    <span>Fleet Management</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Admin Panel" className="hover-glow group">
                  <a href="/admin" className="flex items-center gap-3">
                    <ShieldAlert className="h-5 w-5 text-red-400 transition-all group-hover:scale-110 group-hover:text-red-300" />
                    <span>Admin Panel</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings" className="hover-glow group">
                  <a href="/settings" className="flex items-center gap-3">
                    <Settings className="h-5 w-5 transition-all group-hover:scale-110 group-hover:rotate-90 group-hover:text-primary" />
                    <span>Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden border-t border-white/10 mt-4 pt-4">
          <SidebarGroupLabel className="text-muted-foreground/70">System Stats</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-4 p-3 rounded-lg bg-white/5 backdrop-blur">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">System Uptime</span>
                  <span className="font-semibold text-green-400">99.8%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[99.8%] bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Sensor Status</span>
                  <span className="flex items-center gap-1.5">
                    <GaugeCircle className="h-3.5 w-3.5 text-green-500 animate-pulse" />
                    <span className="font-semibold text-green-400">Healthy</span>
                  </span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm pt-2 border-t border-white/10">
                <span className="text-muted-foreground">Last Update</span>
                <span className="font-semibold text-blue-400">2 mins ago</span>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
