# CRM Layout System

This layout system provides a consistent, professional structure for all CRM application pages while reducing code duplication and ensuring maintainability.

## Components Overview

### 1. `AppLayout` - Main Application Wrapper
The primary layout component that provides the complete application structure.

**Features:**
- Horizontal navigation header with search and user actions
- Clean, modern top navigation design
- Responsive layout without sidebar
- Mobile-friendly navigation

**Props:**
- `showHeader` (boolean): Toggle header visibility
- `className`: Additional CSS classes

**Usage:**
```jsx
import { AppLayout } from '@/components/layout'

function MyPage() {
  return (
    <AppLayout>
      {/* Your page content */}
    </AppLayout>
  )
}
```

### 2. `PageLayout` - Page Content Structure
Provides consistent page structure with headers, breadcrumbs, and actions.

**Features:**
- Page title and description
- Breadcrumb navigation
- Action buttons area
- Consistent content spacing

**Props:**
- `title` (string): Page title
- `description` (string): Page description
- `breadcrumbs` (array): Navigation breadcrumbs
- `actions` (ReactNode): Page action buttons
- `className`: Additional CSS classes

**Usage:**
```jsx
import { PageLayout } from '@/components/layout'

function MyPage() {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/' },
    { label: 'Customers', href: '/customers' },
    { label: 'Active Customers' }
  ]

  const actions = (
    <>
      <Button>Add New</Button>
      <Button variant="outline">Export</Button>
    </>
  )

  return (
    <PageLayout
      title="Active Customers"
      description="Manage your customer relationships"
      breadcrumbs={breadcrumbs}
      actions={actions}
    >
      {/* Page content */}
    </PageLayout>
  )
}
```

### 3. `Header` - Top Navigation Bar
Provides horizontal navigation, search, and user actions.

**Features:**
- Logo/brand display
- Global search functionality
- Horizontal navigation menu
- Notification system
- Quick action buttons
- User profile access

**Navigation Items:**
- Dashboard
- Customers
- Companies
- Deals
- Reports
- Settings

### 4. `RootLayout` - Base Layout Wrapper
Minimal wrapper for the entire application.

## Complete Page Example

```jsx
import React from 'react'
import { Button } from '@/components/ui/button'
import { AppLayout, PageLayout } from '@/components/layout'
import { PlusIcon, DownloadIcon } from 'lucide-react'

function CustomersPage() {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/' },
    { label: 'Customers' }
  ]

  const actions = (
    <>
      <Button variant="outline" size="sm">
        <DownloadIcon className="size-4 mr-2" />
        Export
      </Button>
      <Button size="sm">
        <PlusIcon className="size-4 mr-2" />
        Add Customer
      </Button>
    </>
  )

  return (
    <AppLayout>
      <PageLayout
        title="Customers"
        description="Manage your customer database"
        breadcrumbs={breadcrumbs}
        actions={actions}
      >
        {/* Your page content here */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Customer List</h3>
            {/* Customer table or grid */}
          </div>
        </div>
      </PageLayout>
    </AppLayout>
  )
}

export default CustomersPage
```

## Layout Variations

### Full Layout (Default)
```jsx
<AppLayout>
  <PageLayout title="Page Title">
    {/* Content */}
  </PageLayout>
</AppLayout>
```

### Without Header
```jsx
<AppLayout showHeader={false}>
  <PageLayout title="Page Title">
    {/* Content */}
  </PageLayout>
</AppLayout>
```

## Styling and Customization

The layout system uses your existing Tailwind CSS configuration and CSS variables:

- **Colors**: Uses your custom CSS variables (--background, --foreground, --card, etc.)
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Borders**: Uses --border color variable for consistent borders
- **Responsive**: Mobile-first responsive design

## Best Practices

1. **Always wrap pages with AppLayout** for consistent navigation
2. **Use PageLayout for content structure** with proper titles and breadcrumbs
3. **Provide meaningful page actions** in the actions prop
4. **Use consistent breadcrumb navigation** for better UX
5. **Leverage the existing button variants** for consistent styling
6. **Follow the spacing patterns** established by the layout system

## Accessibility Features

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly structure
- Focus management
- Semantic HTML structure

## Mobile Responsiveness

- Responsive horizontal navigation
- Touch-friendly navigation
- Adaptive content layout
- Mobile-first design approach
