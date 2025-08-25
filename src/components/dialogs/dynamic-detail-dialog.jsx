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
import { Badge } from '@/components/ui/badge'
import { EyeIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Dynamic Detail Dialog Component
 * Automatically generates detail views from configuration objects
 * 
 * @param {Object} props
 * @param {Object} props.config - Configuration object for the detail view
 * @param {Object} props.data - Data object containing the values to display
 * @param {React.ReactNode} props.trigger - Custom trigger element (optional)
 * @param {string} props.itemName - Name of the item being viewed (for title and description)
 * @param {Function} props.onClose - Callback function when dialog is closed
 * @param {boolean} props.showFooter - Whether to show the footer with close button (defaults to true)
 * @param {string} props.closeButtonText - Custom close button text (defaults to "Close")
 */
function DynamicDetailDialog({ 
  config,
  data,
  trigger,
  itemName,
  onClose,
  showFooter = true,
  closeButtonText = "Close",
  ...props 
}) {
  const [isOpen, setIsOpen] = useState(false)

  if (!config || !data) {
    console.error('DynamicDetailDialog: config and data are required')
    return null
  }

  // Generate title and description from config
  const dialogTitle = config.title || `${config.itemType} Details`
  const dialogDescription = config.description || `View detailed information about this ${config.itemType.toLowerCase()}`

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
      size="sm"
      variant="outline"
      className="detail-dialog-trigger"
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <EyeIcon className="size-3" />
    </Button>
  )

  // Render field value based on type and display configuration
  const renderFieldValue = (field, value) => {
    if (value === null || value === undefined) {
      return <span className="text-muted-foreground italic">Not provided</span>
    }

    switch (field.display) {
      case 'badge':
        if (field.badgeMapping && field.badgeMapping[value]) {
          const badgeConfig = field.badgeMapping[value]
          return (
            <Badge 
              variant={badgeConfig.variant || 'default'}
              className="capitalize"
            >
              {badgeConfig.label || value}
            </Badge>
          )
        }
        return (
          <Badge variant="outline" className="capitalize">
            {value}
          </Badge>
        )

      case 'link':
        if (field.type === 'email') {
          return (
            <a 
              href={`mailto:${value}`}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {value}
            </a>
          )
        }
        if (field.type === 'phone') {
          return (
            <a 
              href={`tel:${value}`}
              className="text-blue-600 hover:underline"
            >
              {value}
            </a>
          )
        }
        if (field.type === 'url') {
          return (
            <a 
              href={value}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {field.external ? 'Visit Site' : value}
            </a>
          )
        }
        return value

      case 'currency':
        return `$${parseFloat(value).toFixed(2)}`

      case 'percentage':
        return `${value}%`

      case 'date':
        return new Date(value).toLocaleDateString()

      case 'custom':
        // Allow custom render function if provided
        return field.render ? field.render(value, data) : value

      case 'value':
      default:
        return value
    }
  }

  // Render a single field
  const renderField = (field) => {
    const value = data[field.name]
    
    return (
      <div key={field.name} className={cn("field-item", field.className)}>
        <div className="field-label font-medium text-sm text-muted-foreground mb-1">
          {field.label}
        </div>
        <div className="field-value text-sm">
          {renderFieldValue(field, value)}
        </div>
      </div>
    )
  }

  // Render a section
  const renderSection = (section, sectionIndex) => {
    return (
      <div key={sectionIndex} className={cn("detail-section", section.className)}>
        {section.title && (
          <h3 className={cn("section-title text-lg font-semibold mb-4", section.titleClassName)}>
            {section.title}
          </h3>
        )}
        <div className={cn("section-fields grid gap-4", section.layout)}>
          {section.fields.map((field, fieldIndex) => renderField(field))}
        </div>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent 
        className={cn(
          "dynamic-detail-dialog max-h-[90vh] flex flex-col",
          sizeClasses[config.size || 'default']
        )} 
        {...props}
      >
        <DialogHeader className="dynamic-detail-header flex-shrink-0 p-6">
          <DialogTitle className="dynamic-detail-title text-2xl font-bold">
            {itemName ? `${dialogTitle}: ${itemName}` : dialogTitle}
          </DialogTitle>
          <DialogDescription className="dynamic-detail-description text-muted-foreground">
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto px-6">
          <div className="dynamic-detail-content space-y-6">
            {config.sections.map((section, index) => renderSection(section, index))}
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

export { DynamicDetailDialog }
