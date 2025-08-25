import React, { useState } from 'react'
import { toast } from 'sonner'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { DynamicForm } from '@/components/forms/dynamic-form'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'

function FormDialog({ 
  // Form configuration
  formConfig,
  
  // Data and callbacks
  initialData = null,
  onSubmit,
  onCancel,
  
  // Dialog customization
  title,
  description,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  
  // Trigger customization
  trigger = null,
  defaultTriggerLabel = "Open Form",
  defaultTriggerIcon: DefaultIcon = PlusIcon,
  
  // Layout options
  size = "default", // "sm", "default", "lg", "xl"
  showActions = true,
  
  // Additional props
  ...props 
}) {
  const [isOpen, setIsOpen] = useState(false)
  const isEditMode = !!initialData

  // Size configuration
  const sizeClasses = {
    sm: "min-w-[30rem] max-w-[40rem]",
    default: "min-w-[40rem] max-w-[60rem]",
    lg: "min-w-[50rem] max-w-[80rem]",
    xl: "min-w-[60rem] max-w-[90rem]"
  }

  const handleSubmit = (formData) => {
    if (onSubmit) {
      onSubmit(formData, isEditMode)
    }
    
    // Close the dialog
    setIsOpen(false)
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
    setIsOpen(false)
  }

  // Custom trigger button if none provided
  const defaultTrigger = (
    <Button size="sm" className="form-dialog-trigger">
      <DefaultIcon className="size-4 mr-2" />
      {defaultTriggerLabel}
    </Button>
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className={`form-dialog-content ${sizeClasses[size]} max-h-[90vh] flex flex-col`} {...props}>
        <DialogHeader className="form-dialog-header flex-shrink-0 p-0">
          <DialogTitle className="form-dialog-title text-2xl font-bold">
            {title || (isEditMode ? 'Edit Item' : 'Add New Item')}
          </DialogTitle>
          <DialogDescription className="form-dialog-description text-muted-foreground">
            {description || (isEditMode 
              ? 'Update the information below. Fields marked with * are required.'
              : 'Fill in the information below. Fields marked with * are required.'
            )}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto px-3">
          <DynamicForm 
            config={formConfig}
            onSubmit={handleSubmit}
            onCancel={undefined}
            submitLabel={submitLabel}
            initialData={initialData}
            showActions={false}
          />
        </div>
        
        {showActions && (
          <DialogFooter className="flex-shrink-0 px-0 pt-3 border-t bg-muted/30">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end w-full">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCancel}
              >
                {cancelLabel}
              </Button>
              <Button 
                type="submit" 
                onClick={() => {
                  // Trigger form submission
                  const form = document.querySelector('form');
                  if (form) {
                    form.requestSubmit();
                  }
                }}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {submitLabel}
              </Button>
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

export { FormDialog }
