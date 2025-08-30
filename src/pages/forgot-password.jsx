import React from 'react'
import { AppLayout, PageLayout } from '@/shared/layout'
import { ForgotPasswordForm } from '@/components/forgot-password-form'

function ForgotPasswordPage() {
  return (
    <AppLayout>
      <PageLayout title="Forgot Password">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-full max-w-md">
            <ForgotPasswordForm />
          </div>
        </div>
      </PageLayout>
    </AppLayout>
  )
}

export default ForgotPasswordPage

