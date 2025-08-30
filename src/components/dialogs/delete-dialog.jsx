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

/**
 * General Delete Dialog Component
 * Can be used for any module to confirm deletions
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.trigger - Custom trigger element (optional)
 * @param {string} props.title - Dialog title (defaults to "Delete Item")
 * @param {string} props.description - Description text (defaults to generic message)
 * @param {string} props.itemName - Name of the item being deleted (for description)
 * @param {string} props.itemType - Type of item (e.g., "Customer", "Product", "Order")
 * @param {Function} props.onDelete - Callback function when delete is confirmed
 * @param {React.ReactNode} props.children - Custom content (optional)
 * @param {string} props.deleteButtonText - Custom delete button text (defaults to "Delete")
 * @param {string} props.cancelButtonText - Custom cancel button text (defaults to "Cancel")
 * @param {string} props.size - Dialog size ("sm", "default", "lg", "xl")
 * @param {string} props.triggerClassName - Additional classes for the default trigger button
 * @param {string} props.triggerVariant - Variant for the default trigger button
 * @param {string} props.triggerSize - Size for the default trigger button
 */
function DeleteDialog({ 
  trigger,
  title,
  description,
  itemName,
  itemType = "Item",
  onDelete,
  children,
  deleteButtonText,
  cancelButtonText = "Cancel",
  size = "default",
  triggerClassName = "",
  triggerVariant = "outline",
  triggerSize = "sm",
  ...props 
}) {
  const [isOpen, setIsOpen] = useState(false)

  // Generate default title if not provided
  const dialogTitle = title || `Delete ${itemType}`

  // Generate default description if not provided
  const dialogDescription = description || (
    itemName 
      ? `Are you sure you want to delete ${itemName}? This action cannot be undone.`
      : `Are you sure you want to delete this ${itemType.toLowerCase()}? This action cannot be undone.`
  )

  // Generate default delete button text if not provided
  const finalDeleteButtonText = deleteButtonText || `Delete ${itemType}`

  // Size configuration
  const sizeClasses = {
    sm: "max-w-md",
    default: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl"
  }

  const handleDelete = () => {
    if (onDelete) {
      onDelete()
    }
    setIsOpen(false)
  }

  const handleCancel = () => {
    setIsOpen(false)
  }

  // Default trigger button if none provided
  const defaultTrigger = (
    <Button 
      size={triggerSize}
      variant={triggerVariant}
      className={`delete-dialog-trigger ${triggerClassName}`}
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <TrashIcon className="size-3 text-red-500" />
    </Button>
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className={`delete-dialog ${sizeClasses[size]}`} {...props}>
        <DialogHeader className="delete-dialog-header">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-100 rounded-full">
              <AlertTriangleIcon className="size-6 text-red-600" />
            </div>
            <DialogTitle className="delete-dialog-title text-xl font-semibold text-red-800">
              {dialogTitle}
            </DialogTitle>
          </div>
          <DialogDescription className="delete-dialog-description text-muted-foreground">
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>
        
        {/* Custom content if provided */}
        {children && (
          <div className="delete-dialog-content">
            {children}
          </div>
        )}
        
        <div className="flex flex-col gap-3 pt-4">
          <div className="flex gap-3 pt-2">
            <Button 
              variant="outline" 
              onClick={handleCancel}
              className="flex-1"
            >
              {cancelButtonText}
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              className="flex-1"
            >
              {finalDeleteButtonText}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { DeleteDialog }
