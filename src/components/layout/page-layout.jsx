import React from 'react'
import { cn } from '@/lib/utils'

function PageLayout({ 
  children, 
  className,
  title,
  description,
  actions,
  ...props 
}) {
  return (
    <div 
      className={cn(
        "flex-1 overflow-auto",
        className
      )}
      {...props}
    >
      {/* Page Header */}
      {(title || description || actions) && (
        <div className="border-b border-border bg-background">
          <div className="px-6 py-3">
            {/* Title and Description */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {title && (
                  <h1 className="text-2xl font-bold tracking-tight text-foreground">
                    {title}
                  </h1>
                )}
                {description && (
                  <p className="mt-2 text-lg text-muted-foreground">
                    {description}
                  </p>
                )}
              </div>
              
              {/* Page Actions */}
              {actions && (
                <div className="flex items-center gap-3">
                  {actions}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Page Content */}
      <div className="flex-1 p-2">
        {children}
      </div>
    </div>
  )
}

export { PageLayout }
