import React, { useState } from 'react'
import { AppLayout, PageLayout } from './components/layout'
import { Button } from './components/ui/button'
import { 
  UsersIcon, 
  BuildingIcon, 
  FileTextIcon, 
  TrendingUpIcon,
  CalendarIcon,
  MailIcon,
  ExternalLinkIcon
} from 'lucide-react'

function App() {
  const [showCustomersDemo, setShowCustomersDemo] = useState(false)

  // Example breadcrumbs
  const breadcrumbs = [
    { label: 'Dashboard' }
  ]

  // Example page actions
  const pageActions = (
    <>
      <Button variant="outline" size="sm">
        <CalendarIcon className="size-4 mr-2" />
        Schedule Meeting
      </Button>
      <Button size="sm">
        <FileTextIcon className="size-4 mr-2" />
        Create Report
      </Button>
    </>
  )

  // If showing customers demo, render the customers page
  if (showCustomersDemo) {
    return (
      <div className="min-h-screen bg-background">
        <CustomersPage />
      </div>
    )
  }

  return (
    <AppLayout>
      <PageLayout
        title="Dashboard"
        description="Welcome back! Here's what's happening with your business today."
        breadcrumbs={breadcrumbs}
        actions={pageActions}
      >
        {/* Dashboard Content */}
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <UsersIcon className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                  <p className="text-2xl font-bold">1,234</p>
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
                  <p className="text-2xl font-bold">89</p>
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
                  <p className="text-2xl font-bold">156</p>
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
                  <p className="text-2xl font-bold">$45.2K</p>
                </div>
              </div>
              <p className="text-sm text-green-600 mt-2">+15% from last month</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2"
                onClick={() => setShowCustomersDemo(true)}
              >
                <UsersIcon className="size-6" />
                <span>View Customers</span>
                <ExternalLinkIcon className="size-4" />
              </Button>
              
              <Button variant="outline" className="h-20 flex-col gap-2">
                <BuildingIcon className="size-6" />
                <span>Manage Companies</span>
                <ExternalLinkIcon className="size-4" />
              </Button>
              
              <Button variant="outline" className="h-20 flex-col gap-2">
                <FileTextIcon className="size-6" />
                <span>Track Deals</span>
                <ExternalLinkIcon className="size-4" />
              </Button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-card border border-border rounded-lg">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold">Recent Activity</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <MailIcon className="size-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">New message from John Smith</p>
                    <p className="text-sm text-muted-foreground">Regarding project proposal</p>
                  </div>
                  <span className="text-sm text-muted-foreground">2 hours ago</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="size-10 bg-green-500/10 rounded-full flex items-center justify-center">
                    <FileTextIcon className="size-5 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Deal closed: TechCorp Project</p>
                    <p className="text-sm text-muted-foreground">$25,000 deal completed</p>
                  </div>
                  <span className="text-sm text-muted-foreground">1 day ago</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="size-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                    <UsersIcon className="size-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">New customer added: Acme Inc</p>
                    <p className="text-sm text-muted-foreground">Software company from San Francisco</p>
                  </div>
                  <span className="text-sm text-muted-foreground">2 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </AppLayout>
  )
}

// Import CustomersPage component
import CustomersPage from './pages/customers'

export default App
