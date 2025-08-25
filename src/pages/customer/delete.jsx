import React, { useState } from 'react'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { TrashIcon, AlertTriangleIcon } from 'lucide-react'

function DeleteCustomer({ customer, onDelete }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = () => {
    onDelete(customer)
    setIsOpen(false)
  }

  const handleCancel = () => {
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          size="sm" 
          variant="outline"
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <TrashIcon className="size-3 text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="delete-customer-dialog max-w-md">
        <DialogHeader className="delete-customer-header">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-100 rounded-full">
              <AlertTriangleIcon className="size-6 text-red-600" />
            </div>
            <DialogTitle className="delete-customer-title text-xl font-semibold text-red-800">
              Delete Customer
            </DialogTitle>
          </div>
          <DialogDescription className="delete-customer-description text-muted-foreground">
            Are you sure you want to delete <strong>{customer.firstName} {customer.lastName}</strong>? 
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-3 pt-4">
          
          <div className="flex gap-3 pt-2">
            <Button 
              variant="outline" 
              onClick={handleCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              className="flex-1"
            >
              Delete Customer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteCustomer
