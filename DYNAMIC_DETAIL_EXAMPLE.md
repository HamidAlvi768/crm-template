# Dynamic Detail Dialog - Configuration-Based System

## 🎯 Overview

The `DynamicDetailDialog` component automatically generates detail views from configuration objects, similar to how `DynamicForm` works. This provides:

- ✅ **Consistent layouts** across all modules
- ✅ **Easy configuration** - just define fields and their display types
- ✅ **Automatic rendering** - no need to write JSX for each field
- ✅ **Flexible styling** - customizable sections and field layouts
- ✅ **Smart field types** - automatic handling of emails, phones, URLs, badges, etc.

## 🚀 How It Works

### 1. **Configuration Structure**
```javascript
// src/lib/detail-configs.js
export const customerDetailConfig = {
  itemType: "Customer",
  title: "Customer Details",
  description: "View detailed customer information",
  size: "default", // sm, default, lg, xl
  sections: [
    {
      title: "Personal Information",
      className: "bg-card p-4 rounded-lg border border-border",
      titleClassName: "text-primary font-semibold mb-3",
      fields: [
        {
          name: 'firstName',        // Field name in data object
          label: 'First Name',      // Display label
          type: FIELD_TYPES.TEXT,   // Data type
          display: 'value',         // How to render
          className: "col-span-1"   // Grid layout class
        }
      ],
      layout: "grid-cols-2"        // CSS Grid layout
    }
  ]
}
```

### 2. **Usage in Component**
```jsx
// Before (manual JSX) - 45 lines
function CustomerDetail({ customer, trigger = null }) {
  return (
    <DetailDialog itemType="Customer" itemName={customer.name}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div><strong>Company:</strong> {customer.company}</div>
          <div><strong>Job Title:</strong> {customer.jobTitle}</div>
          {/* ... more fields manually written */}
        </div>
      </div>
    </DetailDialog>
  )
}

// After (configuration-based) - 15 lines
function CustomerDetail({ customer, trigger = null }) {
  return (
    <DynamicDetailDialog
      config={customerDetailConfig}
      data={customer}
      itemName={`${customer.firstName} ${customer.lastName}`}
      trigger={trigger}
    />
  )
}
```

## 🔧 Field Types & Display Options

### **Field Types**
```javascript
export const FIELD_TYPES = {
  TEXT: 'text',           // Plain text
  EMAIL: 'email',         // Email address
  PHONE: 'phone',         // Phone number
  URL: 'url',             // Website URL
  DATE: 'date',           // Date value
  CURRENCY: 'currency',   // Money amount
  PERCENTAGE: 'percentage', // Percentage value
  BADGE: 'badge',         // Status badge
  LINK: 'link',           // Clickable link
  CUSTOM: 'custom'        // Custom render function
}
```

### **Display Options**
```javascript
// 1. Simple Value Display
{
  name: 'firstName',
  label: 'First Name',
  type: FIELD_TYPES.TEXT,
  display: 'value'
}

// 2. Badge Display with Mapping
{
  name: 'status',
  label: 'Status',
  type: FIELD_TYPES.BADGE,
  display: 'badge',
  badgeVariant: BADGE_VARIANTS.STATUS,
  badgeMapping: {
    'active': { variant: 'default', label: 'Active' },
    'prospect': { variant: 'secondary', label: 'Prospect' },
    'inactive': { variant: 'destructive', label: 'Inactive' }
  }
}

// 3. Link Display (automatic email/phone/URL handling)
{
  name: 'email',
  label: 'Email',
  type: FIELD_TYPES.EMAIL,
  display: 'link'  // Renders as mailto: link
}

// 4. Currency Display
{
  name: 'price',
  label: 'Price',
  type: FIELD_TYPES.CURRENCY,
  display: 'currency'  // Renders as $123.45
}

// 5. Custom Render Function
{
  name: 'avatar',
  label: 'Profile Picture',
  type: FIELD_TYPES.CUSTOM,
  display: 'custom',
  render: (value, data) => (
    <img src={value} alt={data.name} className="w-16 h-16 rounded-full" />
  )
}
```

## 📱 Layout & Styling

### **Section Layouts**
```javascript
// Grid layouts using Tailwind CSS classes
layout: "grid-cols-1"     // Single column
layout: "grid-cols-2"     // Two columns
layout: "grid-cols-3"     // Three columns
layout: "grid-cols-4"     // Four columns

// Custom field spans
{
  name: 'description',
  className: "col-span-2"  // Spans 2 columns
}
```

### **Styling Classes**
```javascript
// Section styling
{
  title: "Personal Information",
  className: "bg-card p-4 rounded-lg border border-border",
  titleClassName: "text-primary font-semibold mb-3"
}

// Field styling
{
  name: 'firstName',
  className: "col-span-1 p-3 bg-muted/30 rounded"
}
```

## 🆕 Creating New Modules

### **Step 1: Define Configuration**
```javascript
// src/lib/detail-configs.js
export const productDetailConfig = {
  itemType: "Product",
  title: "Product Details",
  description: "View detailed product information",
  size: "lg",
  sections: [
    {
      title: "Basic Information",
      className: "bg-card p-4 rounded-lg border border-border",
      fields: [
        {
          name: 'name',
          label: 'Product Name',
          type: FIELD_TYPES.TEXT,
          display: 'value',
          className: "col-span-2"
        },
        {
          name: 'price',
          label: 'Price',
          type: FIELD_TYPES.CURRENCY,
          display: 'value',
          className: "col-span-1"
        }
      ],
      layout: "grid-cols-2"
    }
  ]
}
```

### **Step 2: Create Component**
```jsx
// src/pages/product/detail.jsx
import React from 'react'
import { DynamicDetailDialog } from '@/components/dialogs'
import { productDetailConfig } from '@/lib/detail-configs'

function ProductDetail({ product, trigger = null }) {
  return (
    <DynamicDetailDialog
      config={productDetailConfig}
      data={product}
      itemName={product.name}
      trigger={trigger}
    />
  )
}

export default ProductDetail
```

### **Step 3: Use in List Page**
```jsx
// In your product list page
import ProductDetail from './detail'

// In table columns
{
  key: 'actions',
  header: 'Actions',
  render: (value, row) => (
    <div className="flex gap-2">
      <ProductDetail product={row} />
      {/* other actions */}
    </div>
  )
}
```

## 🎨 Advanced Features

### **Conditional Fields**
```javascript
{
  name: 'subscriptionEnd',
  label: 'Subscription Ends',
  type: FIELD_TYPES.DATE,
  display: 'date',
  show: (data) => data.hasSubscription // Only show if condition met
}
```

### **Field Groups**
```javascript
{
  title: "Contact Information",
  fields: [
    {
      name: 'email',
      label: 'Email',
      type: FIELD_TYPES.EMAIL,
      display: 'link'
    },
    {
      name: 'phone',
      label: 'Phone',
      type: FIELD_TYPES.PHONE,
      display: 'link'
    }
  ],
  layout: "grid-cols-2"
}
```

### **Custom Field Renderers**
```javascript
{
  name: 'lastLogin',
  label: 'Last Login',
  type: FIELD_TYPES.CUSTOM,
  display: 'custom',
  render: (value, data) => {
    if (!value) return <span className="text-muted-foreground">Never logged in</span>
    
    const date = new Date(value)
    const isRecent = Date.now() - date.getTime() < 24 * 60 * 60 * 1000 // 24 hours
    
    return (
      <div className="flex items-center gap-2">
        <span>{date.toLocaleDateString()}</span>
        {isRecent && <Badge variant="secondary" className="text-xs">Recent</Badge>}
      </div>
    )
  }
}
```

## 🔄 Migration from Static to Dynamic

### **Before (Static)**
```jsx
<DetailDialog itemType="Customer" itemName={customer.name}>
  <div className="space-y-6">
    <div className="grid grid-cols-2 gap-4">
      <div><strong>Company:</strong> {customer.company}</div>
      <div><strong>Job Title:</strong> {customer.jobTitle}</div>
      <div><strong>Email:</strong> {customer.email}</div>
      <div><strong>Phone:</strong> {customer.phone}</div>
    </div>
  </div>
</DetailDialog>
```

### **After (Dynamic)**
```jsx
<DynamicDetailDialog
  config={customerDetailConfig}
  data={customer}
  itemName={customer.name}
/>
```

## 📊 Benefits

1. **Consistency**: All detail views follow the same pattern
2. **Maintainability**: Changes happen in configuration, not components
3. **Scalability**: Easy to add new fields or modules
4. **Reusability**: Same configuration can be used in different contexts
5. **Performance**: Optimized rendering with proper key management
6. **Accessibility**: Built-in accessibility features for all field types

## 🚨 Best Practices

1. **Group related fields** into logical sections
2. **Use appropriate field types** for automatic formatting
3. **Provide meaningful labels** that users understand
4. **Test with real data** to ensure proper rendering
5. **Keep configurations DRY** - reuse common field patterns
6. **Use semantic field names** that match your data structure

---

This configuration-based approach makes it incredibly easy to create new modules and maintain consistency across your entire application!
