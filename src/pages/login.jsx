import React from 'react'
import { AppLayout, PageLayout } from '@/shared/layout'
import { LoginForm } from '@/components/login-form'

function LoginPage() {
  return (
    <AppLayout>
      <PageLayout title="Login">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </PageLayout>
    </AppLayout>
  )
}

export default LoginPage
