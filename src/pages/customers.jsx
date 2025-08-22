import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@/components/ui/table'
import { AppLayout, PageLayout } from '@/components/layout'
import { CustomerDialog } from '@/components/dialogs/customer-dialog'
import { 
  DownloadIcon, 
  FilterIcon,
  SearchIcon,
  MoreHorizontalIcon,
  MailIcon,
  PhoneIcon,
  BuildingIcon,
  CalendarIcon,
  DollarSignIcon,
  UsersIcon
} from 'lucide-react'

// Mock customer data
const mockCustomers = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@acme.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Corporation',
    status: 'active',
    lastContact: '2024-01-15',
    deals: 3,
    value: '$45,000'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@techstart.com',
    phone: '+1 (555) 234-5678',
    company: 'TechStart Inc',
    status: 'active',
    lastContact: '2024-01-12',
    deals: 2,
    value: '$28,000'
  },
  {
    id: 3,
    name: 'Michael Chen',
    email: 'm.chen@globaltech.com',
    phone: '+1 (555) 345-6789',
    company: 'GlobalTech Solutions',
    status: 'inactive',
    lastContact: '2023-12-20',
    deals: 1,
    value: '$15,000'
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@innovatecorp.com',
    phone: '+1 (555) 456-7890',
    company: 'InnovateCorp',
    status: 'active',
    lastContact: '2024-01-18',
    deals: 4,
    value: '$67,000'
  },
  {
    id: 5,
    name: 'David Wilson',
    email: 'd.wilson@megacorp.com',
    phone: '+1 (555) 567-8901',
    company: 'MegaCorp Industries',
    status: 'prospect',
    lastContact: '2024-01-10',
    deals: 0,
    value: '$0'
  }
]

function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [customers, setCustomers] = useState(mockCustomers)

  // Filter customers based on search and status
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.company.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  // Handle new customer added
  const handleCustomerAdded = (newCustomer) => {
    // Create a new customer object with the form data
    const customerToAdd = {
      id: customers.length + 1,
      name: `${newCustomer.firstName} ${newCustomer.lastName}`,
      email: newCustomer.email,
      phone: newCustomer.phone,
      company: newCustomer.company,
      status: newCustomer.status,
      lastContact: new Date().toISOString().split('T')[0],
      deals: 0,
      value: '$0'
    }
    
    // Add to the customers list
    setCustomers(prev => [customerToAdd, ...prev])
    
    // Show success message (you could use a toast notification here)
    alert(`Customer ${customerToAdd.name} added successfully!`)
  }

  // Get status badge styling
  const getStatusBadge = (status) => {
    const statusStyles = {
      active: 'bg-green-100 text-green-800 border-green-200',
      inactive: 'bg-gray-100 text-gray-800 border-gray-200',
      prospect: 'bg-blue-100 text-blue-800 border-blue-200'
    }
    
    return `px-2 py-1 rounded-full text-xs font-medium border ${statusStyles[status] || statusStyles.inactive}`
  }

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Breadcrumbs
  const breadcrumbs = [
    { label: 'Dashboard', href: '/' },
    { label: 'Customers' }
  ]

  // Page actions
  const pageActions = (
    <>
      <Button variant="outline" size="sm" className="customers-page-filter-btn">
        <FilterIcon className="size-4 mr-2" />
        Filter
      </Button>
      <Button variant="outline" size="sm" className="customers-page-export-btn">
        <DownloadIcon className="size-4 mr-2" />
        Export
      </Button>
      <CustomerDialog 
        onCustomerAdded={handleCustomerAdded}
        trigger={
          <Button size="sm" className="customers-page-add-btn">
            <UsersIcon className="size-4 mr-2" />
            Add Customer
          </Button>
        }
      />
    </>
  )

  return (
    <AppLayout>
      <PageLayout
        title="Customers"
        description="Manage your customer database and relationships"
        breadcrumbs={breadcrumbs}
        actions={pageActions}
      >
        {/* Search and Filters */}
        <div className="customers-search-section mb-6 space-y-4">
          {/* Search Bar */}
          <div className="customers-search-container flex gap-4">
            <div className="customers-search-input flex-1 max-w-md">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search customers by name, email, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="customers-status-filter px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="prospect">Prospect</option>
            </select>
          </div>

          {/* Results Summary */}
          <div className="customers-results-summary text-sm text-muted-foreground">
            Showing {filteredCustomers.length} of {customers.length} customers
          </div>
        </div>

        {/* Customers Table */}
        <div className="customers-table-container bg-card border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Customer
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Company
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Last Contact
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Deals
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Value
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="px-6 py-4">
                    <div className="customer-info flex items-center">
                      <div className="customer-avatar size-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-primary">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="customer-details">
                        <div className="customer-name font-medium text-foreground">{customer.name}</div>
                        <div className="customer-email text-sm text-muted-foreground">{customer.email}</div>
                        <div className="customer-phone text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <PhoneIcon className="size-3" />
                          {customer.phone}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="company-info flex items-center gap-2">
                      <BuildingIcon className="size-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{customer.company}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span className={getStatusBadge(customer.status)}>
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="last-contact flex items-center gap-2">
                      <CalendarIcon className="size-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{formatDate(customer.lastContact)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span className="deals-count text-sm text-foreground">{customer.deals}</span>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="deal-value flex items-center gap-2">
                      <DollarSignIcon className="size-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{customer.value}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="customer-actions flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="customer-email-btn">
                        <MailIcon className="size-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="customer-more-btn">
                        <MoreHorizontalIcon className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Empty State */}
          {filteredCustomers.length === 0 && (
            <div className="customers-empty-state text-center py-12">
              <div className="empty-state-icon size-16 mx-auto bg-muted/50 rounded-full flex items-center justify-center mb-4">
                <UsersIcon className="size-8 text-muted-foreground" />
              </div>
              <h3 className="empty-state-title text-lg font-medium text-foreground mb-2">No customers found</h3>
              <p className="empty-state-description text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button 
                onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}
                className="empty-state-action-btn"
              >
                <UsersIcon className="size-4 mr-2" />
                Add Your First Customer
              </Button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredCustomers.length > 0 && (
          <div className="customers-pagination mt-6 flex items-center justify-between">
            <div className="pagination-info text-sm text-muted-foreground">
              Showing 1 to {filteredCustomers.length} of {customers.length} results
            </div>
            <div className="pagination-controls flex items-center gap-2">
              <Button variant="outline" size="sm" disabled className="pagination-prev-btn">
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled className="pagination-next-btn">
                Next
              </Button>
            </div>
          </div>
        )}
      </PageLayout>
    </AppLayout>
  )
}

export default CustomersPage
