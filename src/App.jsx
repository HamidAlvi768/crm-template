import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout, PageLayout } from './components/layout'
import CustomersPage from './pages/customer/list'
import FormsDemoPage from './pages/forms-demo'
import TableDemoPage from './pages/table-demo'
import { Toaster } from 'sonner'
import StatsGrid from './components/stats-grid'

// Dashboard Component
function DashboardPage() {
  return (
    <AppLayout>
      <PageLayout title="Dashboard">
        {/* Dashboard Content */}
        <div className="space-y-6">
          <StatsGrid />
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
        <Route path="/table-demo" element={<TableDemoPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App
