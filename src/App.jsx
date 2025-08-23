import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout, PageLayout } from './components/layout'
import { Button } from './components/ui/button'
import { 
  UsersIcon, 
  BuildingIcon, 
  FileTextIcon, 
  TrendingUpIcon,
  BellIcon
} from 'lucide-react'
import CustomersPage from './pages/customers'
import FormsDemoPage from './pages/forms-demo'
import { Toaster } from 'sonner'
import { toast } from 'sonner'

// Dashboard Component
function DashboardPage() {
  const showToastDemo = () => {
    toast('Event has been created', {
      description: 'Sunday, December 03, 2023 at 9:00 AM',
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo clicked'),
      },
    })
  }

  const showSuccessToast = () => {
    toast.success('Success!', {
      description: 'Your action was completed successfully.',
    })
  }

  const showErrorToast = () => {
    toast.error('Error occurred', {
      description: 'Something went wrong. Please try again.',
    })
  }

  const showInfoToast = () => {
    toast.info('Information', {
      description: 'Here is some important information for you.',
    })
  }

  return (
    <AppLayout>
      <PageLayout title="Dashboard">
        {/* Dashboard Content */}
        <div className="space-y-6">
          {/* Toast Demo Section */}
          <div className="p-6 bg-card border border-border rounded-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BellIcon className="size-5" />
              Toast Notifications Demo
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Click the buttons below to see different types of toast notifications in action.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={showToastDemo}>
                Show Toast
              </Button>
              <Button variant="outline" size="sm" onClick={showSuccessToast}>
                Success Toast
              </Button>
              <Button variant="outline" size="sm" onClick={showErrorToast}>
                Error Toast
              </Button>
              <Button variant="outline" size="sm" onClick={showInfoToast}>
                Info Toast
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
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
        </div>
      </PageLayout>
    </AppLayout>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/forms-demo" element={<FormsDemoPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App
