import * as z from 'zod'
import { Badge } from '@/components/ui/badge'

// Detail field types and their display configurations
export const FIELD_TYPES = {
  TEXT: 'text',
  EMAIL: 'email',
  PHONE: 'phone',
  URL: 'url',
  DATE: 'date',
  CURRENCY: 'currency',
  PERCENTAGE: 'percentage',
  BADGE: 'badge',
  LINK: 'link',
  CUSTOM: 'custom'
}

// Badge variants for status fields
export const BADGE_VARIANTS = {
  STATUS: 'status', // Maps to appropriate variant based on value
  ROLE: 'role',     // Maps to appropriate variant based on value
  PRIORITY: 'priority',
  DEFAULT: 'default',
  SECONDARY: 'secondary',
  DESTRUCTIVE: 'destructive',
  OUTLINE: 'outline'
}

// Customer Detail Configuration
export const customerDetailConfig = {
  itemType: "Customer",
  title: "Customer Details",
  description: "View detailed customer information",
  size: "default",
  sections: [
    {
      title: "Personal Information",
      className: "bg-card p-4 rounded-lg border border-border",
      titleClassName: "text-primary font-semibold mb-3",
      fields: [
        {
          name: 'firstName',
          label: 'First Name',
          type: FIELD_TYPES.TEXT,
          display: 'value',
          className: "col-span-1"
        },
        {
          name: 'lastName',
          label: 'Last Name',
          type: FIELD_TYPES.TEXT,
          display: 'value',
          className: "col-span-1"
        },
        {
          name: 'email',
          label: 'Email',
          type: FIELD_TYPES.EMAIL,
          display: 'link',
          className: "col-span-1"
        },
        {
          name: 'phone',
          label: 'Phone',
          type: FIELD_TYPES.PHONE,
          display: 'link',
          className: "col-span-1"
        }
      ],
      layout: "grid-cols-2"
    },
    {
      title: "Account & Preferences",
      className: "bg-card p-4 rounded-lg border border-border",
      titleClassName: "text-primary font-semibold mb-3",
      fields: [
        {
          name: 'password',
          label: 'Password',
          type: FIELD_TYPES.TEXT,
          display: 'value',
          className: "col-span-1"
        },
        {
          name: 'age',
          label: 'Age',
          type: FIELD_TYPES.TEXT,
          display: 'value',
          className: "col-span-1"
        },
        {
          name: 'birthDate',
          label: 'Birth Date',
          type: FIELD_TYPES.DATE,
          display: 'date',
          className: "col-span-1"
        },
        {
          name: 'favoriteColor',
          label: 'Favorite Color',
          type: FIELD_TYPES.COLOR,
          display: 'custom',
          render: (value) => (
            <div className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded border border-border" 
                style={{ backgroundColor: value }}
              />
              <span>{value}</span>
            </div>
          ),
          className: "col-span-1"
        }
      ],
      layout: "grid-cols-2"
    },
    {
      title: "Company Information",
      className: "bg-card p-4 rounded-lg border border-border",
      titleClassName: "text-primary font-semibold mb-3",
      fields: [
        {
          name: 'company',
          label: 'Company Name',
          type: FIELD_TYPES.TEXT,
          display: 'value',
          className: "col-span-1"
        },
        {
          name: 'jobTitle',
          label: 'Job Title',
          type: FIELD_TYPES.TEXT,
          display: 'value',
          className: "col-span-1"
        },
        {
          name: 'industry',
          label: 'Industry',
          type: FIELD_TYPES.TEXT,
          display: 'value',
          className: "col-span-1"
        },
        {
          name: 'website',
          label: 'Website',
          type: FIELD_TYPES.URL,
          display: 'link',
          external: true,
          className: "col-span-1"
        }
      ],
      layout: "grid-cols-2"
    },
    {
      title: "Preferences & Settings",
      className: "bg-card p-4 rounded-lg border border-border",
      titleClassName: "text-primary font-semibold mb-3",
      fields: [
        {
          name: 'status',
          label: 'Status',
          type: FIELD_TYPES.BADGE,
          display: 'badge',
          badgeVariant: BADGE_VARIANTS.STATUS,
          className: "col-span-1",
          badgeMapping: {
            'active': { variant: 'default', label: 'Active' },
            'prospect': { variant: 'secondary', label: 'Prospect' },
            'inactive': { variant: 'destructive', label: 'Inactive' }
          }
        },
        {
          name: 'priority',
          label: 'Priority Level',
          type: FIELD_TYPES.TEXT,
          display: 'value',
          className: "col-span-1"
        },
        {
          name: 'satisfaction',
          label: 'Satisfaction Level',
          type: FIELD_TYPES.TEXT,
          display: 'value',
          className: "col-span-1"
        },
        {
          name: 'profilePicture',
          label: 'Profile Picture',
          type: FIELD_TYPES.TEXT,
          display: 'custom',
          render: (value) => (
            <div className="flex items-center gap-2">
              {value ? (
                <img src={value} alt="Profile" className="w-12 h-12 rounded-full object-cover" />
              ) : (
                <span className="text-muted-foreground">No image uploaded</span>
              )}
            </div>
          ),
          className: "col-span-1"
        }
      ],
      layout: "grid-cols-2"
    },
    {
      title: "Additional Options",
      className: "bg-card p-4 rounded-lg border border-border",
      titleClassName: "text-primary font-semibold mb-3",
      fields: [
        {
          name: 'newsletter',
          label: 'Newsletter Subscription',
          type: FIELD_TYPES.TEXT,
          display: 'custom',
          render: (value) => (
            <Badge variant={value ? 'default' : 'secondary'}>
              {value ? 'Subscribed' : 'Not Subscribed'}
            </Badge>
          ),
          className: "col-span-1"
        },
        {
          name: 'termsAccepted',
          label: 'Terms Accepted',
          type: FIELD_TYPES.TEXT,
          display: 'custom',
          render: (value) => (
            <Badge variant={value ? 'default' : 'destructive'}>
              {value ? 'Accepted' : 'Not Accepted'}
            </Badge>
          ),
          className: "col-span-1"
        }
      ],
      layout: "grid-cols-2"
    }
  ]
}

// Product Detail Configuration (example for future use)
export const productDetailConfig = {
  itemType: "Product",
  title: "Product Details",
  description: "View detailed product information",
  size: "lg",
  sections: [
    {
      title: "Basic Information",
      className: "bg-card p-4 rounded-lg border border-border",
      titleClassName: "text-primary font-semibold mb-3",
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
        },
        {
          name: 'category',
          label: 'Category',
          type: FIELD_TYPES.TEXT,
          display: 'value',
          className: "col-span-1"
        }
      ],
      layout: "grid-cols-2"
    },
    {
      title: "Details",
      className: "bg-card p-4 rounded-lg border border-border",
      titleClassName: "text-primary font-semibold mb-3",
      fields: [
        {
          name: 'description',
          label: 'Description',
          type: FIELD_TYPES.TEXT,
          display: 'value',
          className: "col-span-2"
        },
        {
          name: 'status',
          label: 'Status',
          type: FIELD_TYPES.BADGE,
          display: 'badge',
          badgeVariant: BADGE_VARIANTS.STATUS,
          className: "col-span-1",
          badgeMapping: {
            'active': { variant: 'default', label: 'Active' },
            'draft': { variant: 'secondary', label: 'Draft' },
            'archived': { variant: 'outline', label: 'Archived' }
          }
        }
      ],
      layout: "grid-cols-2"
    }
  ]
}

// Order Detail Configuration (example for future use)
export const orderDetailConfig = {
  itemType: "Order",
  title: "Order Details",
  description: "View detailed order information",
  size: "xl",
  sections: [
    {
      title: "Order Information",
      className: "bg-card p-4 rounded-lg border border-border",
      titleClassName: "text-primary font-semibold mb-3",
      fields: [
        {
          name: 'id',
          label: 'Order ID',
          type: FIELD_TYPES.TEXT,
          display: 'value',
          className: "col-span-1"
        },
        {
          name: 'total',
          label: 'Total Amount',
          type: FIELD_TYPES.CURRENCY,
          display: 'value',
          className: "col-span-1"
        },
        {
          name: 'status',
          label: 'Order Status',
          type: FIELD_TYPES.BADGE,
          display: 'badge',
          badgeVariant: BADGE_VARIANTS.STATUS,
          className: "col-span-1",
          badgeMapping: {
            'pending': { variant: 'secondary', label: 'Pending' },
            'processing': { variant: 'default', label: 'Processing' },
            'shipped': { variant: 'default', label: 'Shipped' },
            'delivered': { variant: 'default', label: 'Delivered' },
            'cancelled': { variant: 'destructive', label: 'Cancelled' }
          }
        }
      ],
      layout: "grid-cols-3"
    }
  ]
}
