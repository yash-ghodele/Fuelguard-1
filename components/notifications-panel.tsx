"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Droplet, Signal, Trash2, WifiOff } from "lucide-react"

// Mock notification data
const initialNotifications = [
  {
    id: "n1",
    type: "fuel-drop",
    vehicleId: "VEH-101",
    message: "Unusual fuel drop detected",
    timestamp: "10 min ago",
    isRead: false,
  },
  {
    id: "n2",
    type: "refill",
    vehicleId: "VEH-456",
    message: "Fuel refill detected",
    timestamp: "1 hr ago",
    isRead: true,
  },
  {
    id: "n3",
    type: "gps-loss",
    vehicleId: "VEH-789",
    message: "GPS signal lost",
    timestamp: "3 hrs ago",
    isRead: false,
  },
  {
    id: "n4",
    type: "sensor-disconnect",
    vehicleId: "VEH-123",
    message: "Sensor disconnected",
    timestamp: "5 hrs ago",
    isRead: false,
  },
]

export default function NotificationsPanel() {
  const [notifications, setNotifications] = useState(initialNotifications)

  const getIcon = (type: string) => {
    switch (type) {
      case "fuel-drop":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "refill":
        return <Droplet className="h-4 w-4 text-green-500" />
      case "gps-loss":
        return <Signal className="h-4 w-4 text-red-500" />
      case "sensor-disconnect":
        return <WifiOff className="h-4 w-4 text-red-500" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })))
  }

  const clearNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  return (
    <div className="flex h-[280px] flex-col">
      <div className="flex items-center justify-between pb-2">
        <span className="text-sm font-medium">{notifications.filter((n) => !n.isRead).length} Unread</span>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs"
            onClick={markAllAsRead}
            disabled={!notifications.some((n) => !n.isRead)}
          >
            Mark all read
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs"
            onClick={clearAllNotifications}
            disabled={notifications.length === 0}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <AnimatePresence>
          {notifications.length === 0 ? (
            <div className="flex h-32 flex-col items-center justify-center p-4">
              <p className="text-center text-sm text-muted-foreground">No notifications</p>
            </div>
          ) : (
            <div className="space-y-2">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`relative rounded-md border p-2 ${
                    !notification.isRead ? "border-primary/50 bg-primary/5" : ""
                  }`}
                >
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      {getIcon(notification.type)}
                      <span className="font-medium">{notification.vehicleId}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 rounded-full"
                      onClick={() => clearNotification(notification.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                  <p className="mt-1 text-sm">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </ScrollArea>
    </div>
  )
}
