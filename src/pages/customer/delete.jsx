import React from 'react'
import { DeleteDialog } from '@/components/dialogs'

function DeleteCustomer({ customer, onDelete }) {
  const handleDelete = () => {
    onDelete(customer)
  }

  return (
    <DeleteDialog
      itemType="Customer"
      itemName={`${customer.firstName} ${customer.lastName}`}
      onDelete={handleDelete}
      size="sm"
    />
  )
}

export default DeleteCustomer
