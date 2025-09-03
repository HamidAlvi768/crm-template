# DataTable Action Buttons System

## Overview

The DataTable component now supports dynamic action buttons through a configuration-based system. This ensures consistent UI and behavior across all tables in the application.

## Features

- ✅ **Dynamic Action Configuration**: Define actions through configuration objects
- ✅ **Consistent UI**: All action buttons follow the same styling and behavior
- ✅ **Type-Safe Actions**: Support for view, edit, delete, and custom action types
- ✅ **Automatic Column Generation**: Actions column is automatically added when actions are provided
- ✅ **Flexible Component Integration**: Works with any action component

## Usage

### Basic Implementation

```javascript
import DataTable from '@/components/ui/data-table';
import { CustomerDetail, UpdateCustomer, DeleteCustomer } from './components';

// Define your action configuration
const customerActions = [
  {
    type: 'view',
    component: CustomerDetail,
  },
  {
    type: 'edit',
    component: UpdateCustomer,
    onEdit: handleEditCustomer,
  },
  {
    type: 'delete',
    component: DeleteCustomer,
    onDelete: handleDeleteCustomer,
  },
];

// Use in DataTable
<DataTable
  data={customers}
  columns={customerColumns}
  actions={customerActions}
  actionsColumnHeader="Actions"
  actionsColumnClassName="w-32"
/>
```

### Action Configuration Types

#### 1. View Action
```javascript
{
  type: 'view',
  component: DetailComponent,
  // Additional props will be passed to the component
}
```

#### 2. Edit Action
```javascript
{
  type: 'edit',
  component: UpdateComponent,
  onEdit: (updatedItem) => {
    // Handle edit callback
  },
}
```

#### 3. Delete Action
```javascript
{
  type: 'delete',
  component: DeleteComponent,
  onDelete: (item) => {
    // Handle delete callback
  },
}
```

#### 4. Custom Action
```javascript
{
  type: 'custom',
  component: CustomComponent,
  // Any additional props
}
```

## DataTable Props

### New Action-Related Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | `Array<ActionConfig>` | `[]` | Array of action button configurations |
| `actionsColumnHeader` | `string` | `"Actions"` | Header text for the actions column |
| `actionsColumnClassName` | `string` | `"w-32"` | CSS classes for the actions column |

### ActionConfig Type Definition

```typescript
interface ActionConfig {
  type: 'view' | 'edit' | 'delete' | 'custom';
  component: React.ComponentType;
  props?: Record<string, any>;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  [key: string]: any; // Additional props
}
```

## Component Requirements

### Action Components Must:

1. **Accept `data` prop**: The row data is passed as `data` prop
2. **Handle callbacks**: Edit/delete components should accept `onEdit`/`onDelete` callbacks
3. **Be self-contained**: Each action component should handle its own UI and logic

### Example Action Component

```javascript
// CustomerDetail.jsx
function CustomerDetail({ data: customer }) {
  return (
    <DetailDialog
      config={customerDetailConfig}
      data={customer}
      trigger={
        <Button variant="outline" size="sm">
          <EyeIcon className="size-3" />
        </Button>
      }
    />
  );
}

// UpdateCustomer.jsx
function UpdateCustomer({ data: customer, onEdit }) {
  const handleSubmit = async (formData) => {
    // Handle update logic
    if (onEdit) {
      onEdit(updatedCustomer);
    }
  };

  return (
    <FormDialog
      formConfig={customerFormConfig}
      initialData={customer}
      onSubmit={handleSubmit}
      trigger={
        <Button variant="outline" size="sm">
          <EditIcon className="size-3" />
        </Button>
      }
    />
  );
}
```

## Migration Guide

### Before (Manual Action Column)
```javascript
const customerColumns = [
  // ... other columns
  {
    key: 'actions',
    header: 'Actions',
    render: (value, row) => (
      <div className="flex gap-2">
        <CustomerDetail customer={row} />
        <UpdateCustomer customer={row} onEdit={handleEdit} />
        <DeleteCustomer customer={row} onDelete={handleDelete} />
      </div>
    ),
    cellClassName: 'w-32'
  },
];

<DataTable data={customers} columns={customerColumns} />
```

### After (Configuration-Based Actions)
```javascript
const customerColumns = [
  // ... other columns (no actions column needed)
];

const customerActions = [
  { type: 'view', component: CustomerDetail },
  { type: 'edit', component: UpdateCustomer, onEdit: handleEdit },
  { type: 'delete', component: DeleteCustomer, onDelete: handleDelete },
];

<DataTable 
  data={customers} 
  columns={customerColumns}
  actions={customerActions}
/>
```

## Benefits

### 1. **Consistency**
- All action buttons have identical styling and behavior
- Automatic spacing and alignment
- Consistent icon usage and button variants

### 2. **Maintainability**
- Centralized action button logic in DataTable component
- Easy to update styling or behavior across all tables
- Reduced code duplication

### 3. **Scalability**
- Easy to add new action types
- Simple to create new tables with consistent actions
- Flexible component integration

### 4. **Developer Experience**
- Clear configuration-based approach
- Type-safe action definitions
- Comprehensive documentation and examples

## Best Practices

### 1. **Action Component Design**
- Keep action components focused on single responsibility
- Use consistent button variants and sizes
- Include appropriate icons for each action type

### 2. **Configuration Structure**
- Group related actions together
- Use descriptive action types
- Provide clear callback functions

### 3. **Error Handling**
- Handle errors within action components
- Provide user feedback through toasts
- Gracefully handle loading states

### 4. **Performance**
- Use React.memo for action components if needed
- Avoid unnecessary re-renders in callbacks
- Optimize data passing to action components

## Future Enhancements

- **Conditional Actions**: Show/hide actions based on row data
- **Action Permissions**: Role-based action visibility
- **Bulk Actions**: Support for multi-row actions
- **Action Groups**: Group related actions with dropdowns
- **Custom Styling**: Per-action styling options

## Examples

### Complete Customer Table Implementation
```javascript
import React, { useState } from 'react';
import DataTable from '@/components/ui/data-table';
import { CustomerDetail, UpdateCustomer, DeleteCustomer } from './components';

function CustomersPage() {
  const [customers, setCustomers] = useState([]);

  const customerColumns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'company', header: 'Company' },
  ];

  const customerActions = [
    { type: 'view', component: CustomerDetail },
    { 
      type: 'edit', 
      component: UpdateCustomer, 
      onEdit: (updatedCustomer) => {
        setCustomers(customers.map(c => 
          c.id === updatedCustomer.id ? updatedCustomer : c
        ));
      }
    },
    { 
      type: 'delete', 
      component: DeleteCustomer, 
      onDelete: (customer) => {
        setCustomers(customers.filter(c => c.id !== customer.id));
      }
    },
  ];

  return (
    <DataTable
      data={customers}
      columns={customerColumns}
      actions={customerActions}
      filterableColumns={['name', 'email', 'company']}
      itemsPerPage={10}
    />
  );
}
```

This system ensures that all tables in the application have consistent, maintainable, and scalable action button implementations.
