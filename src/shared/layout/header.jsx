import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  HomeIcon,
  UsersIcon,
  UserIcon,
  LogInIcon,
  LogOutIcon,
  UserCircleIcon
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

// IMPORTANT: All navigation items must be added here to ensure consistent styling
// This array is processed by the map function which applies uniform styling logic
// including variants, hover effects, and active states for all navigation elements
const leftNavigationItems = [
  { icon: HomeIcon, label: 'Dashboard', href: '/' },
  { icon: UsersIcon, label: 'Customers', href: '/customers' },
  { icon: UserIcon, label: 'Users', href: '/users' },
]

function Header({ className, ...props }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuth()

  const handleNavigation = (href) => {
    navigate(href)
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
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
          <div className="ml-auto flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                {/* User Info */}
                <div className="flex items-center space-x-2 text-white">
                  <UserCircleIcon className="size-5" />
                  <span className="text-sm font-medium">
                    {user?.username || user?.email || 'User'}
                  </span>
                </div>
                
                {/* Logout Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-white hover:text-white/90 hover:bg-white/20"
                  onClick={handleLogout}
                >
                  <LogOutIcon className="size-4" />
                  Logout
                </Button>
              </>
            ) : (
              /* Login Button - only show when not authenticated */
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "gap-2 text-white hover:text-white/90 hover:bg-white/20",
                  location.pathname === '/login' && "bg-white/20 text-white"
                )}
                onClick={() => handleNavigation('/login')}
              >
                <LogInIcon className="size-4" />
                Login
              </Button>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export { Header }
