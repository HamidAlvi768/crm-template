# React CRM Template - Developer Guide

A modern, scalable React CRM system built with best practices and a robust infrastructure.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── forms/          # Form-related components
│   ├── dialogs/        # Dialog and modal components
│   └── [module]/       # Module-specific components
├── pages/               # Page components
│   └── [module]/       # Module pages
├── shared/              # Shared components and layouts
│   └── layout/         # Layout components
├── store/               # Zustand state stores
├── services/            # API and external services
│   ├── api/            # API endpoints and client
│   └── utils/          # Service utilities
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── lib/                 # Library configurations
└── assets/              # Static assets
```

## 🏗️ Creating a New Module

This guide will walk you through creating a new module (e.g., "Products") that perfectly fits the project's infrastructure.

### Step 1: Define the Module Structure

First, identify what your module needs:

- **Data Model**: What fields does your entity have?
- **CRUD Operations**: Create, Read, Update, Delete?
- **Business Logic**: Any specific validation or processing?
- **UI Requirements**: List view, forms, dialogs?

### Step 2: Create the Data Model and Validation

Create a Zod schema in `src/lib/form-configs.js`:

```javascript
// Add to src/lib/form-configs.js
export const productFormConfig = {
  // Form-level classes
  className: "",
  formClassName: "bg-background",
  actionsClassName: "pt-6 border-t border-border",
  submitButtonClassName: "bg-primary hover:bg-primary/90",
  cancelButtonClassName: "hover:bg-muted",
  
  sections: [
    {
      title: 'Product Information',
      className: "bg-card p-6 rounded-lg border border-border",
      titleClassName: "text-primary border-primary/20",
      fields: [
        {
          name: 'name',
          label: 'Product Name',
          type: 'text',
          validation: z.string().min(2, 'Product name must be at least 2 characters'),
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
        {
          name: 'price',
          label: 'Price',
          type: 'number',
          validation: z.number().min(0, 'Price must be positive'),
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
        // Add more fields as needed
      ],
      fieldsContainerClassName: "bs-row",
    }
  ]
}
```

### Step 3: Create the Store

Create a new store file in `src/store/`:

```javascript
// src/store/productStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const initialState = {
  products: [],
  isLoading: false,
  error: null,
  selectedProduct: null,
}

export const useProductStore = create(
  persist(
    (set, get) => ({
      ...initialState,
      
      // Actions
      setProducts: (products) => set({ products }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setSelectedProduct: (product) => set({ selectedProduct: product }),
      
      addProduct: (product) => {
        const { products } = get()
        const newProduct = { ...product, id: Date.now() }
        set({ products: [...products, newProduct] })
        return newProduct
      },
      
      updateProduct: (id, updates) => {
        const { products } = get()
        const updatedProducts = products.map(p => 
          p.id === id ? { ...p, ...updates } : p
        )
        set({ products: updatedProducts })
      },
      
      deleteProduct: (id) => {
        const { products } = get()
        set({ products: products.filter(p => p.id !== id) })
      },
      
      clearError: () => set({ error: null }),
      reset: () => set(initialState),
    }),
    {
      name: 'product-storage',
    }
  )
)
```

Update `src/store/index.js`:

```javascript
// Add to src/store/index.js
export { useProductStore } from './productStore'
```

### Step 4: Create API Service

Create a new API service in `src/services/api/`:

```javascript
// src/services/api/products.js
import { apiClient } from './client'

export const productAPI = {
  // Get all products
  getProducts: async (params = {}) => {
    return apiClient.get('/products', params)
  },
  
  // Get single product
  getProduct: async (id) => {
    return apiClient.get(`/products/${id}`)
  },
  
  // Create product
  createProduct: async (data) => {
    return apiClient.post('/products', data)
  },
  
  // Update product
  updateProduct: async (id, data) => {
    return apiClient.put(`/products/${id}`, data)
  },
  
  // Delete product
  deleteProduct: async (id) => {
    return apiClient.delete(`/products/${id}`)
  },
}
```

Update `src/services/api/index.js`:

```javascript
// Add to src/services/api/index.js
export { productAPI } from './products'
```

### Step 5: Create Page Components

Create the module directory structure:

```bash
mkdir -p src/pages/product
touch src/pages/product/list.jsx
touch src/pages/product/create.jsx
touch src/pages/product/update.jsx
touch src/pages/product/delete.jsx
touch src/pages/product/detail.jsx
```

#### Main List Page (`src/pages/product/list.jsx`):

```javascript
import React, { useState } from 'react'
import { toast } from 'sonner'
import { AppLayout, PageLayout } from '@/shared/layout'
import { DataTable } from '@/components/ui'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import CreateProduct from './create'
import UpdateProduct from './update'
import DeleteProduct from './delete'
import ProductDetail from './detail'
import { useProductStore } from '@/store'

function ProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore()
  
  // Define table columns
  const productColumns = [
    {
      key: 'id',
      header: 'ID',
      headerClassName: 'w-16',
      cellClassName: 'font-mono text-sm'
    },
    {
      key: 'name',
      header: 'Product Name',
      render: (value) => (
        <div className="font-medium">{value}</div>
      )
    },
    {
      key: 'price',
      header: 'Price',
      render: (value) => (
        <div className="font-medium">${value}</div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (value) => (
        <Badge 
          variant={value === 'active' ? 'default' : 'secondary'}
          className="capitalize"
        >
          {value}
        </Badge>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (value, row) => (
        <div className="flex gap-2">
          <ProductDetail product={row} />
          <UpdateProduct 
            product={row}
            onEdit={handleEditProduct}
          />
          <DeleteProduct 
            product={row}
            onDelete={handleDeleteProduct}
          />
        </div>
      ),
      cellClassName: 'w-32'
    },
  ]

  // Handle actions
  const handleEditProduct = (updatedProduct) => {
    updateProduct(updatedProduct.id, updatedProduct)
    toast.success('Product updated successfully!')
  }

  const handleDeleteProduct = (product) => {
    deleteProduct(product.id)
    toast.success('Product deleted successfully!')
  }

  const handleProductAdded = (newProduct) => {
    addProduct(newProduct)
    toast.success('Product added successfully!')
  }

  // Page actions
  const pageActions = (
    <CreateProduct onProductAdded={handleProductAdded} />
  )

  return (
    <AppLayout>
      <PageLayout
        title="Products"
        actions={pageActions}
      >
        <div className="space-y-6">
          <div className="bg-card rounded-lg border">
            <div className="p-6">
              <DataTable 
                data={products}
                columns={productColumns}
                striped={true}
                hover={true}
                emptyMessage="No products found. Add your first product to get started!"
              />
            </div>
          </div>
        </div>
      </PageLayout>
    </AppLayout>
  )
}

export default ProductsPage
```

#### Create Component (`src/pages/product/create.jsx`):

```javascript
import React from 'react'
import { FormDialog } from '@/components/dialogs/form-dialog'
import { productFormConfig } from '@/lib/form-configs'
import { Button } from '@/components/ui/button'
import { PackageIcon } from 'lucide-react'

function CreateProduct({ onProductAdded }) {
  return (
    <FormDialog 
      formConfig={productFormConfig}
      onSubmit={(formData) => onProductAdded(formData)}
      title="Add New Product"
      description="Fill in the product information below. Fields marked with * are required."
      submitLabel="Save"
      cancelLabel="Cancel"
      size="lg"
      trigger={
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <PackageIcon className="size-4 mr-2" />
          Add Product
        </Button>
      }
    />
  )
}

export default CreateProduct
```

#### Update Component (`src/pages/product/update.jsx`):

```javascript
import React from 'react'
import { FormDialog } from '@/components/dialogs/form-dialog'
import { productFormConfig } from '@/lib/form-configs'
import { Button } from '@/components/ui/button'
import { EditIcon } from 'lucide-react'

function UpdateProduct({ product, onEdit }) {
  return (
    <FormDialog 
      formConfig={productFormConfig}
      initialData={product}
      onSubmit={(formData) => onEdit({ ...product, ...formData })}
      title="Edit Product"
      description="Update the product information below. Fields marked with * are required."
      submitLabel="Update"
      cancelLabel="Cancel"
      size="lg"
      trigger={
        <Button variant="outline" size="sm">
          <EditIcon className="size-4" />
        </Button>
      }
    />
  )
}

export default UpdateProduct
```

#### Delete Component (`src/pages/product/delete.jsx`):

```javascript
import React from 'react'
import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

function DeleteProduct({ product, onDelete }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
          <TrashIcon className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Product</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{product.name}"? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={() => onDelete(product)}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteProduct
```

#### Detail Component (`src/pages/product/detail.jsx`):

```javascript
import React from 'react'
import { Button } from '@/components/ui/button'
import { EyeIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

function ProductDetail({ product }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <EyeIcon className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[50rem] max-w-[80rem] max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0 p-6">
          <DialogTitle className="text-2xl font-bold">
            Product Details
          </DialogTitle>
          <DialogDescription>
            View detailed information about {product.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Name</label>
                <p className="mt-1 text-sm">{product.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Price</label>
                <p className="mt-1 text-sm">${product.price}</p>
              </div>
              {/* Add more fields as needed */}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProductDetail
```

### Step 6: Update Navigation

Add the new module to the header navigation in `src/shared/layout/header.jsx`:

```javascript
// Add to navigationItems array
const navigationItems = [
  { icon: HomeIcon, label: 'Dashboard', href: '/' },
  { icon: UsersIcon, label: 'Customers', href: '/customers' },
  { icon: PackageIcon, label: 'Products', href: '/products' }, // Add this line
]
```

### Step 7: Add Route

Update `src/App.jsx` to include the new route:

```javascript
// Add import
import ProductsPage from './pages/product/list'

// Add route in the Routes component
<Route path="/products" element={<ProductsPage />} />
```

### Step 8: Update Constants (Optional)

If your module has specific constants, add them to `src/utils/constants.js`:

```javascript
// Add to src/utils/constants.js
export const PRODUCT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DRAFT: 'draft',
  ARCHIVED: 'archived',
}

export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Garden',
  // Add more as needed
]
```

## 🔧 Key Infrastructure Patterns

### 1. Component Structure
- **Layout Components**: Use `AppLayout` and `PageLayout` for consistent structure
- **Dialog Components**: Use `FormDialog` for forms, `AlertDialog` for confirmations
- **Table Components**: Use `DataTable` with column configuration

### 2. State Management
- **Zustand Stores**: One store per module with CRUD operations
- **Persistence**: Use `persist` middleware for local storage
- **Error Handling**: Centralized error state management

### 3. Form Handling
- **Dynamic Forms**: Configuration-driven forms with `DynamicForm` component
- **Validation**: Zod schemas for type safety and validation
- **Styling**: Bootstrap grid classes with Tailwind utilities

### 4. API Integration
- **API Client**: Centralized HTTP client with authentication
- **Service Layer**: Module-specific API functions
- **Error Handling**: Consistent error handling across all API calls

### 5. Styling
- **Tailwind CSS**: Utility-first CSS framework
- **CSS Variables**: Custom properties for theming
- **Bootstrap Grid**: Conflict-free grid system for layouts

## 📝 Best Practices

1. **Naming Conventions**: Use PascalCase for components, camelCase for functions
2. **File Organization**: Keep related files in module-specific directories
3. **Component Composition**: Break down complex components into smaller, reusable pieces
4. **Error Boundaries**: Implement proper error handling and user feedback
5. **Performance**: Use React.memo and useCallback for expensive operations
6. **Accessibility**: Follow ARIA guidelines and keyboard navigation
7. **Testing**: Write tests for critical business logic

## 🚨 Common Pitfalls

1. **Forgetting to Export**: Always export components and functions
2. **Missing Dependencies**: Ensure all imports are properly configured
3. **State Mutations**: Never mutate Zustand state directly
4. **Form Validation**: Always validate form data before submission
5. **Error Handling**: Don't forget to handle API errors gracefully

## 🔍 Debugging Tips

1. **Console Logs**: Use strategic console.logs for debugging
2. **React DevTools**: Inspect component state and props
3. **Network Tab**: Check API requests and responses
4. **State Inspection**: Use Zustand devtools for state debugging

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Zod Validation](https://zod.dev/)

---

This guide should help you create new modules that seamlessly integrate with the existing infrastructure. Remember to follow the established patterns and conventions for consistency across the codebase.
