# Layout Components

This directory contains the core layout components that provide the structure and navigation for the CRM application.

## Components

### AppLayout
The main application wrapper that provides the overall structure.

**Props:**
- `children`: Content to render inside the layout
- `className`: Additional CSS classes
- `showHeader`: Whether to show the header (default: true)

**Features:**
- Responsive design
- Header integration
- Content area management

### Header
The main navigation header with logo and navigation items.

**Features:**
- Logo/brand display
- Navigation menu
- Active state management
- Responsive design

### PageLayout
Provides consistent page structure with headers and actions.

**Props:**
- `children`: Page content
- `className`: Additional CSS classes
- `title`: Page title
- `description`: Page description
- `actions`: Page action buttons

**Features:**
- Consistent page header styling
- Title and description display
- Action button placement
- Responsive layout

### RootLayout
Base layout wrapper for the entire application.

## Usage Examples

### Basic Page Layout
```jsx
import { AppLayout, PageLayout } from '@/components/layout'

function MyPage() {
  const pageActions = (
    <Button>Action</Button>
  )

  return (
    <AppLayout>
      <PageLayout
        title="My Page"
        description="This is a description of my page"
        actions={pageActions}
      >
        {/* Page content goes here */}
        <div>Content</div>
      </PageLayout>
    </AppLayout>
  )
}
```

### Page with Actions Only
```jsx
<PageLayout
  title="Customers"
  actions={<Button>Add Customer</Button>}
>
  {/* Content */}
</PageLayout>
```

### Simple Page
```jsx
<PageLayout title="Dashboard">
  {/* Content */}
</PageLayout>
```

## Best Practices

1. **Always wrap pages with AppLayout** for consistent structure
2. **Use PageLayout for content structure** with proper titles
3. **Place action buttons in the actions prop** for consistent positioning
4. **Use consistent spacing and typography** as defined in the design system
5. **Ensure responsive behavior** across different screen sizes

## Design System Integration

The layout components integrate with the design system through:
- Consistent spacing (`px-6 py-6` for headers, `p-2` for content)
- Color variables (`bg-background`, `border-border`, etc.)
- Typography scales (text-3xl for titles, text-lg for descriptions)
- Responsive breakpoints (mobile-first approach)
