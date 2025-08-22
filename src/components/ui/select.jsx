import React from 'react'
import { cn } from '@/lib/utils'
import { ChevronDownIcon } from 'lucide-react'

function Select({
  children,
  value,
  onValueChange,
  defaultValue,
  ...props
}) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState(defaultValue || value || '')
  const [options, setOptions] = React.useState([])

  React.useEffect(() => {
    if (children && React.Children.count(children) > 0) {
      const selectContent = React.Children.toArray(children).find(
        child => child.type === SelectContent
      )
      if (selectContent) {
        const selectItems = React.Children.toArray(selectContent.props.children).filter(
          child => child.type === SelectItem
        )
        setOptions(selectItems.map(item => ({
          value: item.props.value,
          label: item.props.children
        })))
      }
    }
  }, [children])

  const handleSelect = (value) => {
    setSelectedValue(value)
    setIsOpen(false)
    onValueChange?.(value)
  }

  const selectedOption = options.find(option => option.value === selectedValue)

  return (
    <div className="select-container relative" {...props}>
      <button
        type="button"
        className="select-trigger flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="select-value">
          {selectedOption ? selectedOption.label : 'Select an option'}
        </span>
        <ChevronDownIcon className="select-chevron size-4 opacity-50" />
      </button>

      {isOpen && (
        <>
          <div 
            className="select-overlay fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="select-content absolute top-full left-0 z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className="select-item relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function SelectContent({ children, ...props }) {
  return <div {...props}>{children}</div>
}

function SelectItem({ value, children, ...props }) {
  return <div data-value={value} {...props}>{children}</div>
}

function SelectTrigger({ children, ...props }) {
  return <div {...props}>{children}</div>
}

function SelectValue({ placeholder, ...props }) {
  return <span {...props}>{placeholder}</span>
}

export {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
}
