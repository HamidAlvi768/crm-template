import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout, PageLayout } from './shared/layout'
import CustomersPage from './pages/customer/list'
import LoginPage from './pages/login'
import ForgotPasswordPage from './pages/forgot-password'
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
      <Routes basename="/react-theme/">
        <Route path="/" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App
