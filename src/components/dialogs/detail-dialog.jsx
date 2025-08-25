import React, { useState } from 'react'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { EyeIcon } from 'lucide-react'

/**
 * General Detail Dialog Component
 * Can be used for any module to display item details
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.trigger - Custom trigger element (optional)
 * @param {string} props.title - Dialog title (defaults to "Item Details")
 * @param {string} props.description - Description text (defaults to generic message)
 * @param {string} props.itemName - Name of the item being viewed (for title and description)
 * @param {string} props.itemType - Type of item (e.g., "Customer", "Product", "Order")
 * @param {React.ReactNode} props.children - Content to display in the dialog body
 * @param {string} props.size - Dialog size ("sm", "default", "lg", "xl")
 * @param {string} props.triggerClassName - Additional classes for the default trigger button
 * @param {string} props.triggerVariant - Variant for the default trigger button
 * @param {string} props.triggerSize - Size for the default trigger button
 * @param {string} props.closeButtonText - Custom close button text (defaults to "Close")
 * @param {boolean} props.showFooter - Whether to show the footer with close button (defaults to true)
 * @param {Function} props.onClose - Callback function when dialog is closed
 */
function DetailDialog({ 
  trigger,
  title,
  description,
  itemName,
  itemType = "Item",
  children,
  size = "default",
  triggerClassName = "",
  triggerVariant = "outline",
  triggerSize = "sm",
  closeButtonText = "Close",
  showFooter = true,
  onClose,
  ...props 
}) {
  const [isOpen, setIsOpen] = useState(false)

  // Generate default title if not provided
  const dialogTitle = title || (
    itemName 
      ? `${itemType} Details: ${itemName}`
      : `${itemType} Details`
  )

  // Generate default description if not provided
  const dialogDescription = description || (
    `View detailed information about this ${itemType.toLowerCase()}`
  )

  // Size configuration
  const sizeClasses = {
    sm: "min-w-[30rem] max-w-[40rem]",
    default: "min-w-[40rem] max-w-[60rem]",
    lg: "min-w-[50rem] max-w-[80rem]",
    xl: "min-w-[60rem] max-w-[90rem]"
  }

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
    setIsOpen(false)
  }

  // Default trigger button if none provided
  const defaultTrigger = (
    <Button 
      size={triggerSize}
      variant={triggerVariant}
      className={`detail-dialog-trigger ${triggerClassName}`}
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <EyeIcon className="size-3" />
    </Button>
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent 
        className={`detail-dialog ${sizeClasses[size]} max-h-[90vh] flex flex-col`} 
        {...props}
      >
        <DialogHeader className="detail-dialog-header flex-shrink-0 p-6">
          <DialogTitle className="detail-dialog-title text-2xl font-bold">
            {dialogTitle}
          </DialogTitle>
          <DialogDescription className="detail-dialog-description text-muted-foreground">
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto px-6">
          <div className="detail-dialog-content">
            {children}
          </div>
        </div>
        
        {showFooter && (
          <DialogFooter className="flex-shrink-0 px-6 py-4 border-t bg-muted/30">
            <Button 
              variant="outline" 
              onClick={handleClose}
              className="w-full sm:w-auto"
            >
              {closeButtonText}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

export { DetailDialog }
