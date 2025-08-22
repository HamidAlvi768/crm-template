import React, { useState } from 'react'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { CustomerForm } from '@/components/forms/customer-form'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'

function CustomerDialog({ onCustomerAdded, trigger = null }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (customerData) => {
    // Here you would typically send the data to your API
    console.log('New customer data:', customerData)
    
    // Call the callback to update the parent component
    if (onCustomerAdded) {
      onCustomerAdded(customerData)
    }
    
    // Close the dialog
    setIsOpen(false)
  }

  const handleCancel = () => {
    setIsOpen(false)
  }

  // Custom trigger button if none provided
  const defaultTrigger = (
    <Button size="sm" className="customer-dialog-trigger">
      <PlusIcon className="size-4 mr-2" />
      Add Customer
    </Button>
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="customer-dialog-content max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="customer-dialog-header">
          <DialogTitle className="customer-dialog-title text-2xl font-bold">
            Add New Customer
          </DialogTitle>
          <DialogDescription className="customer-dialog-description text-muted-foreground">
            Fill in the customer information below. Fields marked with * are required.
          </DialogDescription>
        </DialogHeader>
        
        <CustomerForm 
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  )
}

export { CustomerDialog }
