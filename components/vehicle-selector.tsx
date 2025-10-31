"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock vehicle data
const vehicles = [
  { value: "veh-123", label: "XYZ-123", status: "online" },
  { value: "veh-456", label: "ABC-456", status: "online" },
  { value: "veh-789", label: "MNO-789", status: "online" },
  { value: "veh-101", label: "PQR-101", status: "offline" },
  { value: "veh-112", label: "STU-112", status: "offline" },
]

interface VehicleSelectorProps {
  selectedVehicle: string | null
  setSelectedVehicle: (vehicleId: string | null) => void
}

export default function VehicleSelector({ selectedVehicle, setSelectedVehicle }: VehicleSelectorProps) {
  const [open, setOpen] = useState(false)

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Vehicle Selector</CardTitle>
      </CardHeader>
      <CardContent>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
              {selectedVehicle
                ? vehicles.find((vehicle) => vehicle.value === selectedVehicle)?.label
                : "Select vehicle..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search vehicle..." />
              <CommandList>
                <CommandEmpty>No vehicle found.</CommandEmpty>
                <CommandGroup>
                  {vehicles.map((vehicle) => (
                    <CommandItem
                      key={vehicle.value}
                      value={vehicle.value}
                      onSelect={(currentValue) => {
                        setSelectedVehicle(currentValue === selectedVehicle ? null : currentValue)
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn("mr-2 h-4 w-4", selectedVehicle === vehicle.value ? "opacity-100" : "opacity-0")}
                      />
                      <span className="flex-1">{vehicle.label}</span>
                      <span
                        className={cn(
                          "ml-auto h-2 w-2 rounded-full",
                          vehicle.status === "online" ? "bg-green-500" : "bg-red-500",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium">Vehicle Information</p>
          {selectedVehicle ? (
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID:</span>
                <span>{selectedVehicle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plate:</span>
                <span>{vehicles.find((v) => v.value === selectedVehicle)?.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="flex items-center">
                  <span
                    className={cn(
                      "mr-1.5 inline-block h-2 w-2 rounded-full",
                      vehicles.find((v) => v.value === selectedVehicle)?.status === "online"
                        ? "bg-green-500"
                        : "bg-red-500",
                    )}
                  />
                  {vehicles.find((v) => v.value === selectedVehicle)?.status === "online" ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Select a vehicle to view details</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
