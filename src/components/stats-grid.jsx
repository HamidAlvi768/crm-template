import React from 'react'
import { 
  UsersIcon, 
  BuildingIcon, 
  FileTextIcon, 
  TrendingUpIcon
} from 'lucide-react'

export default function StatsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className="p-6 bg-card border border-border rounded-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <UsersIcon className="size-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
            <p className="text-3xl font-bold">1,234</p>
          </div>
        </div>
        <p className="text-sm text-green-600 mt-2">+12% from last month</p>
      </div>

      <div className="p-6 bg-card border border-border rounded-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <BuildingIcon className="size-5 text-blue-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Active Companies</p>
            <p className="text-3xl font-bold">89</p>
          </div>
        </div>
        <p className="text-sm text-green-600 mt-2">+5% from last month</p>
      </div>

      <div className="p-6 bg-card border border-border rounded-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500/10 rounded-lg">
            <FileTextIcon className="size-5 text-green-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Open Deals</p>
            <p className="text-3xl font-bold">156</p>
          </div>
        </div>
        <p className="text-sm text-green-600 mt-2">+8% from last month</p>
      </div>

      <div className="p-6 bg-card border border-border rounded-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <TrendingUpIcon className="size-5 text-purple-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Revenue</p>
            <p className="text-3xl font-bold">$45.2K</p>
          </div>
        </div>
        <p className="text-sm text-green-600 mt-2">+15% from last month</p>
      </div>
    </div>
  )
}
