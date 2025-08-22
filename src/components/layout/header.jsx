import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  HomeIcon,
  UsersIcon
} from 'lucide-react'

const navigationItems = [
  { icon: HomeIcon, label: 'Dashboard', href: '/', active: false },
  { icon: UsersIcon, label: 'Customers', href: '/customers', active: true },
]

function Header({ className, ...props }) {
  // Simple navigation function (you can replace this with React Router later)
  const handleNavigation = (href) => {
    if (href === '/') {
      window.location.href = '/'
    } else if (href === '/customers') {
      // For now, we'll just show an alert. In a real app, you'd use React Router
      alert('Navigate to Customers page - This would use React Router in a real application')
    } else {
      alert(`Navigate to ${href} - This would use React Router in a real application`)
    }
  }

  return (
    <header 
      className={cn(
        "border-b border-border bg-background",
        className
      )}
      {...props}
    >
      {/* Navigation Menu with Logo and Navigation Items */}
      <nav className="px-6 py-3">
        <div className="flex items-center">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <button 
              onClick={() => handleNavigation('/')}
              className="text-xl font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer mr-8"
            >
              CRM System
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.label}
                  variant={item.active ? "secondary" : "ghost"}
                  size="sm"
                  className={cn(
                    "gap-2",
                    item.active && "bg-secondary text-secondary-foreground"
                  )}
                  onClick={() => handleNavigation(item.href)}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Button>
              )
            })}
          </div>
        </div>
      </nav>
    </header>
  )
}

export { Header }
