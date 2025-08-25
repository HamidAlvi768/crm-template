import React from 'react'
import { Button } from './ui/button'
import { BellIcon } from 'lucide-react'
import { toast } from 'sonner'

export default function ToastDemo() {
  const showToastDemo = () => {
    toast('Event has been created', {
      description: 'Sunday, December 03, 2023 at 9:00 AM',
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo clicked'),
      },
    })
  }

  const showSuccessToast = () => {
    toast.success('Success!', {
      description: 'Your action was completed successfully.',
    })
  }

  const showErrorToast = () => {
    toast.error('Error occurred', {
      description: 'Something went wrong. Please try again.',
    })
  }

  const showInfoToast = () => {
    toast.info('Information', {
      description: 'Here is some important information for you.',
    })
  }

  return (
    <div className="p-6 bg-card border border-border rounded-lg">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <BellIcon className="size-5" />
        Toast Notifications Demo
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Click the buttons below to see different types of toast notifications in action.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={showToastDemo}>
          Show Toast
        </Button>
        <Button variant="outline" size="sm" onClick={showSuccessToast}>
          Success Toast
        </Button>
        <Button variant="outline" size="sm" onClick={showErrorToast}>
          Error Toast
        </Button>
        <Button variant="outline" size="sm" onClick={showInfoToast}>
          Info Toast
        </Button>
      </div>
    </div>
  )
}
