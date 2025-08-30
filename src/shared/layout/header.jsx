import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  HomeIcon,
  UsersIcon,
  UserIcon,
  LogInIcon
} from 'lucide-react'

// IMPORTANT: All navigation items must be added here to ensure consistent styling
// This array is processed by the map function which applies uniform styling logic
// including variants, hover effects, and active states for all navigation elements
const leftNavigationItems = [
  { icon: HomeIcon, label: 'Dashboard', href: '/' },
  { icon: UsersIcon, label: 'Customers', href: '/customers' },
  { icon: UserIcon, label: 'Users', href: '/users' },
]

const rightNavigationItems = [
  { icon: LogInIcon, label: 'Login', href: '/login' },
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

          {/* Left Navigation Items */}
          <div className="flex items-center space-x-1">
            {leftNavigationItems.map((item) => {
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

          {/* Right Navigation Items */}
          <div className="ml-auto">
            {rightNavigationItems.map((item) => {
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
