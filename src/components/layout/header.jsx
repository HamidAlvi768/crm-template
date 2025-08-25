import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  HomeIcon,
  UsersIcon
} from 'lucide-react'

const navigationItems = [
  { icon: HomeIcon, label: 'Dashboard', href: '/' },
  { icon: UsersIcon, label: 'Customers', href: '/customers' },
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
        "border-b border-border bg-header",
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
              className="text-xl font-bold text-white hover:text-white/80 transition-colors cursor-pointer mr-8"
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
                    "gap-2 text-white hover:text-white/90 hover:bg-white/20",
                    isActive && "bg-white/20 text-white"
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
