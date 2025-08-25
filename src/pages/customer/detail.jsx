import React from 'react'
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

function CustomerDetail({ customer, trigger = null }) {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleClose = () => {
    setIsOpen(false)
  }

  // Custom trigger button if none provided
  const defaultTrigger = (
    <Button size="sm" variant="outline">
      <EyeIcon className="size-3" />
    </Button>
  )

  if (!customer) return null

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="customer-detail-dialog min-w-[40rem] max-w-[60rem] max-h-[80vh] flex flex-col">
        <DialogHeader className="customer-detail-header flex-shrink-0 p-6">
          <DialogTitle className="customer-detail-title text-2xl font-bold">
            Customer Details: {customer.firstName} {customer.lastName}
          </DialogTitle>
          <DialogDescription className="customer-detail-description text-muted-foreground">
            View detailed information about this customer
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto px-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Company:</strong> {customer.company}
              </div>
              <div>
                <strong>Job Title:</strong> {customer.jobTitle}
              </div>
              <div>
                <strong>Email:</strong> {customer.email}
              </div>
              <div>
                <strong>Phone:</strong> {customer.phone}
              </div>
              <div>
                <strong>Industry:</strong> {customer.industry}
              </div>
              <div>
                <strong>Website:</strong> 
                <a 
                  href={customer.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline ml-2"
                >
                  {customer.website}
                </a>
              </div>
              <div>
                <strong>Status:</strong> 
                <Badge 
                  variant={
                    customer.status === 'active' ? 'default' : 
                    customer.status === 'prospect' ? 'secondary' : 'destructive'
                  }
                  className="ml-2 capitalize"
                >
                  {customer.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex-shrink-0 px-6 py-4 border-t bg-muted/30">
          <Button 
            variant="outline" 
            onClick={handleClose}
            className="w-full sm:w-auto"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CustomerDetail
