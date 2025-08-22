import React from 'react'
import { cn } from '@/lib/utils'

function PageLayout({ 
  children, 
  className,
  title,
  description,
  actions,
  breadcrumbs,
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
      {(title || description || actions || breadcrumbs) && (
        <div className="border-b border-border bg-background">
          <div className="px-6 py-6">
            {/* Breadcrumbs */}
            {breadcrumbs && (
              <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={crumb.href || index}>
                    {index > 0 && (
                      <span className="text-muted-foreground/50">/</span>
                    )}
                    {crumb.href ? (
                      <a 
                        href={crumb.href}
                        className="hover:text-foreground transition-colors"
                      >
                        {crumb.label}
                      </a>
                    ) : (
                      <span className="text-foreground font-medium">
                        {crumb.label}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </nav>
            )}

            {/* Title and Description */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {title && (
                  <h1 className="text-3xl font-bold tracking-tight text-foreground">
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
