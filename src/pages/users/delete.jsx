import React from 'react'
import { DeleteDialog } from '@/components/dialogs'

function DeleteUser({ data: user, onDelete }) {
  const handleDelete = () => {
    onDelete(user)
  }

  return (
    <DeleteDialog
      itemType="User"
      itemName={user.username}
      onDelete={handleDelete}
      size="sm"
    />
  )
}

export default DeleteUser
