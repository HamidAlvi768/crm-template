import React from 'react'
import { FormDialog } from '@/components/dialogs/form-dialog'
import { customerFormConfig } from '@/lib/form-configs.jsx'
import { Button } from '@/components/ui/button'
import { EditIcon } from 'lucide-react'

function UpdateCustomer({ customer, onEdit }) {
  return (
    <FormDialog 
      formConfig={customerFormConfig}
      initialData={customer}
      onSubmit={(formData) => onEdit(formData)}
      title="Edit Customer"
      description="Update the customer information below. Fields marked with * are required."
      submitLabel="Update Customer"
      cancelLabel="Cancel"
      size="lg"
      trigger={
        <Button 
          size="sm" 
          variant="outline"
        >
          <EditIcon className="size-3" />
        </Button>
      }
    />
  )
}

export default UpdateCustomer
