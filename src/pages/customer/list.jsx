import React, { useState } from 'react'
import { toast } from 'sonner'
import { AppLayout, PageLayout } from '@/shared/layout'
import { DataTable } from '@/components/ui'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import CreateCustomer from './create'
import UpdateCustomer from './update'
import DeleteCustomer from './delete'
import CustomerDetail from './detail'

function CustomersPage() {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@acme.com',
      phone: '+1-555-0123',
      password: '********',
      age: 32,
      birthDate: '1992-05-15',
      favoriteColor: '#3B82F6',
      company: 'Acme Corporation',
      jobTitle: 'Senior Developer',
      status: 'active',
      industry: 'Technology',
      website: 'https://acme.com',
      priority: 'high',
      satisfaction: 9,
      profilePicture: null,
      newsletter: true,
      termsAccepted: true
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@techsolutions.com',
      phone: '+1-555-0124',
      password: '********',
      age: 28,
      birthDate: '1996-08-22',
      favoriteColor: '#10B981',
      company: 'Tech Solutions Inc',
      jobTitle: 'Product Manager',
      status: 'prospect',
      industry: 'Software',
      website: 'https://techsolutions.com',
      priority: 'medium',
      satisfaction: 7,
      profilePicture: null,
      newsletter: false,
      termsAccepted: true
    },
    {
      id: 3,
      firstName: 'Bob',
      lastName: 'Wilson',
      email: 'bob.wilson@globalindustries.com',
      phone: '+1-555-0125',
      password: '********',
      age: 45,
      birthDate: '1979-12-03',
      favoriteColor: '#F59E0B',
      company: 'Global Industries',
      jobTitle: 'Sales Director',
      status: 'inactive',
      industry: 'Manufacturing',
      website: 'https://globalindustries.com',
      priority: 'low',
      satisfaction: 4,
      profilePicture: null,
      newsletter: true,
      termsAccepted: false
    },
    {
      id: 4,
      firstName: 'Alice',
      lastName: 'Brown',
      email: 'alice.brown@innovatecorp.com',
      phone: '+1-555-0126',
      password: '********',
      age: 35,
      birthDate: '1989-03-18',
      favoriteColor: '#8B5CF6',
      company: 'Innovate Corp',
      jobTitle: 'Marketing Manager',
      status: 'active',
      industry: 'Marketing',
      website: 'https://innovatecorp.com',
      priority: 'high',
      satisfaction: 8,
      profilePicture: null,
      newsletter: true,
      termsAccepted: true
    }
  ])



  // Customer table columns configuration
  const customerColumns = [
    { 
      key: 'id', 
      header: 'ID', 
      headerClassName: 'w-16',
      cellClassName: 'font-mono text-sm'
    },
    { 
      key: 'name', 
      header: 'Customer Name',
      render: (value, row) => (
        <div>
          <div className="font-medium">{`${row.firstName} ${row.lastName}`}</div>
          <div className="text-sm text-muted-foreground">{row.jobTitle}</div>
        </div>
      ),
      cellClassName: 'min-w-[200px]'
    },
    { 
      key: 'company', 
      header: 'Company',
      render: (value) => (
        <div className="font-medium">{value}</div>
      )
    },
    { 
      key: 'contact', 
      header: 'Contact Info',
      render: (value, row) => (
        <div className="space-y-1">
          <div className="text-sm">
            <a href={`mailto:${row.email}`} className="text-blue-600 hover:underline">
              {row.email}
            </a>
          </div>
          <div className="text-sm text-muted-foreground">{row.phone}</div>
        </div>
      ),
      cellClassName: 'min-w-[200px]'
    },
    { 
      key: 'industry', 
      header: 'Industry',
      render: (value) => (
        <Badge variant="outline" className="capitalize">
          {value}
        </Badge>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (value) => (
        <Badge 
          variant={
            value === 'active' ? 'default' : 
            value === 'prospect' ? 'secondary' : 'destructive'
          }
          className="capitalize"
        >
          {value}
        </Badge>
      ),
      cellClassName: 'text-center'
    },
    {
      key: 'website',
      header: 'Website',
      render: (value) => (
        <a 
          href={value} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm"
        >
          Visit Site
        </a>
      ),
      cellClassName: 'text-center'
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (value, row) => (
        <div className="flex gap-2">
          <CustomerDetail 
            customer={row}
          />
          <UpdateCustomer 
            customer={row}
            onEdit={handleEditCustomer}
          />
          <DeleteCustomer 
            customer={row}
            onDelete={handleDeleteCustomer}
          />
        </div>
      ),
      cellClassName: 'w-32'
    },
  ]

  // Handle customer actions
  const handleEditCustomer = (updatedCustomer) => {
    // Update the customer in the list
    setCustomers(customers.map(c => 
      c.id === updatedCustomer.id ? updatedCustomer : c
    ))
    
    toast.success('Customer updated successfully!', {
      description: `${updatedCustomer.firstName} ${updatedCustomer.lastName} has been updated.`,
    })
  }

  const handleDeleteCustomer = (customer) => {
    setCustomers(customers.filter(c => c.id !== customer.id))
    toast.success('Customer deleted successfully!', {
      description: `${customer.firstName} ${customer.lastName} has been removed from your database.`,
    })
  }

  const handleCustomerAdded = (newCustomer) => {
    // Generate a new ID for the customer
    const newId = Math.max(...customers.map(c => c.id)) + 1
    
    // Add default values for new fields if they're not provided
    const customerWithDefaults = {
      password: '********',
      age: 25,
      birthDate: new Date().toISOString().split('T')[0],
      favoriteColor: '#6B7280',
      priority: 'medium',
      satisfaction: 5,
      profilePicture: null,
      newsletter: false,
      termsAccepted: false,
      ...newCustomer,
      id: newId
    }
    
    setCustomers([...customers, customerWithDefaults])
    
    toast.success('Customer added successfully!', {
      description: `${newCustomer.firstName} ${newCustomer.lastName} has been added to your customer database.`,
    })
  }



  // Page actions - Add Customer button
  const pageActions = (
    <CreateCustomer onCustomerAdded={handleCustomerAdded} />
  )

  return (
    <AppLayout>
      <PageLayout
        title="Customers"
        actions={pageActions}
      >
        <div className="space-y-6">
          {/* Customer Table */}
          <div className="bg-card rounded-lg border">
            <div className="p-6">
              <DataTable 
                data={customers}
                columns={customerColumns}
                striped={true}
                hover={true}
                emptyMessage="No customers found. Add your first customer to get started!"
              />
            </div>
          </div>


        </div>
      </PageLayout>
    </AppLayout>
  )
}

export default CustomersPage
