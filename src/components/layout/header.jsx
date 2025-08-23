import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  HomeIcon,
  UsersIcon,
  FileTextIcon
} from 'lucide-react'

const navigationItems = [
  { icon: HomeIcon, label: 'Dashboard', href: '/' },
  { icon: UsersIcon, label: 'Customers', href: '/customers' },
  { icon: FileTextIcon, label: 'Forms Demo', href: '/forms-demo' },
]

function Header({ className, ...props }) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavigation = (href) => {
    navigate(href)
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
              const isActive = location.pathname === item.href
              return (
                <Button
                  key={item.label}
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className={cn(
                    "gap-2",
                    isActive && "bg-secondary text-secondary-foreground"
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
