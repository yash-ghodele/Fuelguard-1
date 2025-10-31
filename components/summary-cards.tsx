import { Car, Droplet, ShieldAlert, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="flex flex-row items-center justify-between p-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Vehicles</p>
            <p className="text-2xl font-bold">42</p>
          </div>
          <div className="rounded-full bg-primary/10 p-3">
            <Car className="h-6 w-6 text-primary" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-row items-center justify-between p-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Avg. Fuel Level</p>
            <p className="text-2xl font-bold">67%</p>
          </div>
          <div className="rounded-full bg-blue-500/10 p-3">
            <Droplet className="h-6 w-6 text-blue-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-row items-center justify-between p-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Active Alerts</p>
            <p className="text-2xl font-bold">3</p>
          </div>
          <div className="rounded-full bg-red-500/10 p-3">
            <ShieldAlert className="h-6 w-6 text-red-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-row items-center justify-between p-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Recent Activity</p>
            <p className="text-md font-bold">VEH-789</p>
          </div>
          <div className="rounded-full bg-green-500/10 p-3">
            <Clock className="h-6 w-6 text-green-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
