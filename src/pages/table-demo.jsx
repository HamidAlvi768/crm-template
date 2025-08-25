import React, { useState } from 'react'
import { DataTable } from '@/components/ui'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

export default function TableDemo() {
  const [selectedRow, setSelectedRow] = useState(null)

  // Example 1: Basic Employee Table
  const employeeColumns = [
    { key: 'id', header: 'ID', headerClassName: 'w-16' },
    { key: 'name', header: 'Name', headerClassName: 'font-semibold' },
    {
      key: 'email',
      header: 'Email',
      render: (value) => (
        <a
          href={`mailto:${value}`}
          className="text-blue-600 hover:underline"
        >
          {value}
        </a>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      render: (value) => (
        <Badge variant="secondary" className="capitalize">
          {value}
        </Badge>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (value) => (
        <Badge 
          variant={value === 'active' ? 'default' : 'destructive'}
          className="capitalize"
        >
          {value}
        </Badge>
      ),
    },
  ]

  const employeeData = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Developer',
      status: 'active',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Designer',
      status: 'active',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'Manager',
      status: 'inactive',
    },
    {
      id: 4,
      name: 'Alice Brown',
      email: 'alice@example.com',
      role: 'Developer',
      status: 'active',
    },
  ]

  // Example 2: Customer Table with Actions
  const customerColumns = [
    { key: 'id', header: 'ID', headerClassName: 'w-16' },
    { key: 'name', header: 'Customer Name' },
    { key: 'company', header: 'Company' },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Phone' },
    {
      key: 'status',
      header: 'Status',
      render: (value) => (
        <Badge 
          variant={
            value === 'active' ? 'default' : 
            value === 'prospect' ? 'secondary' : 'destructive'
          }
        >
          {value}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline">Edit</Button>
          <Button size="sm" variant="destructive">Delete</Button>
        </div>
      ),
    },
  ]

  const customerData = [
    {
      id: 1,
      name: 'John Smith',
      company: 'Acme Corp',
      email: 'john@acme.com',
      phone: '+1-555-0123',
      status: 'active',
    },
    {
      id: 2,
      name: 'Jane Doe',
      company: 'Tech Solutions',
      email: 'jane@techsolutions.com',
      phone: '+1-555-0124',
      status: 'prospect',
    },
    {
      id: 3,
      name: 'Bob Wilson',
      company: 'Global Industries',
      email: 'bob@global.com',
      phone: '+1-555-0125',
      status: 'inactive',
    },
  ]

  // Example 3: Product Table with Striped Rows
  const productColumns = [
    { key: 'id', header: 'ID', headerClassName: 'w-16' },
    { key: 'name', header: 'Product Name' },
    { key: 'category', header: 'Category' },
    {
      key: 'price',
      header: 'Price',
      render: (value) => `$${value.toFixed(2)}`,
      cellClassName: 'text-right font-mono',
    },
    {
      key: 'stock',
      header: 'Stock',
      render: (value) => (
        <span className={value > 10 ? 'text-green-600' : 'text-red-600'}>
          {value} units
        </span>
      ),
      cellClassName: 'text-center',
    },
  ]

  const productData = [
    { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1299.99, stock: 15 },
    { id: 2, name: 'Wireless Mouse', category: 'Accessories', price: 29.99, stock: 45 },
    { id: 3, name: 'Gaming Keyboard', category: 'Accessories', price: 89.99, stock: 8 },
    { id: 4, name: 'Monitor 4K', category: 'Electronics', price: 399.99, stock: 12 },
    { id: 5, name: 'USB Cable', category: 'Accessories', price: 9.99, stock: 100 },
  ]

  const handleRowClick = (row) => {
    setSelectedRow(row)
    toast.success(`Selected: ${row.name || row.id}`)
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">DataTable Component Demo</h1>
        <p className="text-muted-foreground mt-2">
          A reusable table component built on top of shadcn components with advanced features
        </p>
      </div>

      {/* Basic Employee Table */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Employee Table</CardTitle>
          <CardDescription>
            Simple table with custom cell rendering and hover effects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable 
            data={employeeData} 
            columns={employeeColumns}
            hover={true}
          />
        </CardContent>
      </Card>

      {/* Customer Table with Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Table with Actions</CardTitle>
          <CardDescription>
            Table with action buttons and row click handling
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable 
            data={customerData} 
            columns={customerColumns}
            hover={true}
            onRowClick={handleRowClick}
          />
          {selectedRow && (
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-sm">
                <strong>Selected Row:</strong> {JSON.stringify(selectedRow, null, 2)}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Product Table with Striped Rows */}
      <Card>
        <CardHeader>
          <CardTitle>Product Table with Striped Rows</CardTitle>
          <CardDescription>
            Table with alternating row colors and custom cell styling
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable 
            data={productData} 
            columns={productColumns}
            striped={true}
            hover={true}
          />
        </CardContent>
      </Card>

      {/* Empty State Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Empty State Demo</CardTitle>
          <CardDescription>
            How the table looks when there's no data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable 
            data={[]} 
            columns={employeeColumns}
            emptyMessage="No employees found. Try adjusting your search criteria."
          />
        </CardContent>
      </Card>

      {/* Usage Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Instructions</CardTitle>
          <CardDescription>
            How to implement the DataTable component in your projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Basic Implementation:</h4>
              <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`import { DataTable } from '@/components/ui'

const columns = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
]

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
]

<DataTable data={data} columns={columns} />`}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Advanced Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li><strong>Custom Rendering:</strong> Use the <code>render</code> prop for custom cell content</li>
                <li><strong>Styling:</strong> Apply custom classes with <code>headerClassName</code> and <code>cellClassName</code></li>
                <li><strong>Interactivity:</strong> Enable hover effects and row click handlers</li>
                <li><strong>Striped Rows:</strong> Use <code>striped={true}</code> for alternating row colors</li>
                <li><strong>Empty States:</strong> Customize the message when no data is available</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
