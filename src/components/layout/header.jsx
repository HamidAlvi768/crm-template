import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  SearchIcon, 
  BellIcon, 
  PlusIcon,
  HomeIcon,
  UsersIcon,
  BuildingIcon,
  FileTextIcon,
  BarChart3Icon,
  SettingsIcon
} from 'lucide-react'

const navigationItems = [
  { icon: HomeIcon, label: 'Dashboard', href: '/', active: true },
  { icon: UsersIcon, label: 'Customers', href: '/customers' },
  { icon: BuildingIcon, label: 'Companies', href: '/companies' },
  { icon: FileTextIcon, label: 'Deals', href: '/deals' },
  { icon: BarChart3Icon, label: 'Reports', href: '/reports' },
  { icon: SettingsIcon, label: 'Settings', href: '/settings' },
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
      {/* Top Bar with Search and User Actions */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-border">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <button 
            onClick={() => handleNavigation('/')}
            className="text-xl font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer"
          >
            CRM System
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search customers, deals, companies..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Actions */}
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <PlusIcon className="size-4 mr-2" />
            New Deal
          </Button>
          
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <BellIcon className="size-5" />
            <span className="absolute top-1 right-1 size-2 bg-destructive rounded-full"></span>
          </Button>

          {/* User Menu */}
          <Button variant="ghost" size="icon">
            <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">JD</span>
            </div>
          </Button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="px-6 py-3">
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
      </nav>
    </header>
  )
}

export { Header }
