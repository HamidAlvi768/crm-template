import React from 'react'
import { AppLayout, PageLayout } from '@/components/layout'
import { CustomerDialog } from '@/components/dialogs/customer-dialog'
import { UsersIcon } from 'lucide-react'

function CustomersPage() {
  // Breadcrumbs
  const breadcrumbs = [
    { label: 'Dashboard', href: '/' },
    { label: 'Customers' }
  ]

  // Page actions - only Add Customer button
  const pageActions = (
    <CustomerDialog 
      onCustomerAdded={(newCustomer) => {
        console.log('New customer added:', newCustomer)
        alert(`Customer ${newCustomer.firstName} ${newCustomer.lastName} added successfully!`)
      }}
      trigger={
        <button className="customers-page-add-btn bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2">
          <UsersIcon className="size-4" />
          Add Customer
        </button>
      }
    />
  )

  return (
    <AppLayout>
      <PageLayout
        title="Customers"
        breadcrumbs={breadcrumbs}
        actions={pageActions}
      >
        {/* Simple welcome message */}
        <div className="customers-welcome-section text-center py-12">
          <div className="customers-welcome-icon size-24 mx-auto bg-muted/50 rounded-full flex items-center justify-center mb-6">
            <UsersIcon className="size-12 text-muted-foreground" />
          </div>
          <h3 className="customers-welcome-title text-2xl font-medium text-foreground mb-4">
            Welcome to Customer Management
          </h3>
          <p className="customers-welcome-description text-muted-foreground mb-8 max-w-md mx-auto">
            Use the "Add Customer" button above to start building your customer database.
          </p>
        </div>
      </PageLayout>
    </AppLayout>
  )
}

export default CustomersPage
