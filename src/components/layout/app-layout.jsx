import React from 'react'
import { cn } from '@/lib/utils'
import { Header } from './header'
import { PageLayout } from './page-layout'

function AppLayout({ 
  children, 
  className,
  showHeader = true,
  ...props 
}) {
  return (
    <div 
      className={cn(
        "flex flex-col h-screen bg-background",
        className
      )}
      {...props}
    >
      {/* Header */}
      {showHeader && (
        <Header />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Page Content */}
        <PageLayout>
          {children}
        </PageLayout>
      </div>
    </div>
  )
}

export { AppLayout }
