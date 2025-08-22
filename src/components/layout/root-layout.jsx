import React from 'react'
import { cn } from '@/lib/utils'

function RootLayout({ 
  children, 
  className,
  ...props 
}) {
  return (
    <div 
      className={cn(
        "min-h-screen bg-background text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { RootLayout }
