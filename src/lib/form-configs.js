import * as z from 'zod';

// Customer Form Configuration
export const customerFormConfig = {
  sections: [
    {
      title: 'Personal Information',
      fields: [
        { 
          name: 'firstName', 
          label: 'First Name', 
          type: 'text', 
          validation: z.string().min(2, 'First name must be at least 2 characters') 
        },
        { 
          name: 'lastName', 
          label: 'Last Name', 
          type: 'text', 
          validation: z.string().min(2, 'Last name must be at least 2 characters') 
        },
        { 
          name: 'email', 
          label: 'Email', 
          type: 'email', 
          validation: z.string().email('Please enter a valid email address') 
        },
        { 
          name: 'phone', 
          label: 'Phone', 
          type: 'phone', 
          validation: z.string().min(10, 'Phone number must be at least 10 characters') 
        },
      ],
    },
    {
      title: 'Company Information',
      fields: [
        { 
          name: 'company', 
          label: 'Company Name', 
          type: 'text', 
          validation: z.string().min(2, 'Company name must be at least 2 characters') 
        },
        { 
          name: 'jobTitle', 
          label: 'Job Title', 
          type: 'text' 
        },
        { 
          name: 'status', 
          label: 'Status', 
          type: 'select',
          options: [
            { value: 'prospect', label: 'Prospect' },
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
          ],
          validation: z.enum(['active', 'inactive', 'prospect'], {
            required_error: 'Please select a status',
          })
        },
        { 
          name: 'industry', 
          label: 'Industry', 
          type: 'text' 
        },
        { 
          name: 'website', 
          label: 'Website', 
          type: 'url' 
        },
      ],
    },
    {
      title: 'Additional Information',
      fields: [
        { 
          name: 'notes', 
          label: 'Notes', 
          type: 'textarea' 
        },
        { 
          name: 'isVIP', 
          label: 'VIP Customer', 
          type: 'checkbox' 
        },
      ],
    },
  ],
};

// Company Form Configuration
export const companyFormConfig = {
  sections: [
    {
      title: 'Company Details',
      fields: [
        { 
          name: 'name', 
          label: 'Company Name', 
          type: 'text', 
          validation: z.string().min(2, 'Company name must be at least 2 characters') 
        },
        { 
          name: 'industry', 
          label: 'Industry', 
          type: 'text', 
          validation: z.string().min(2, 'Industry must be at least 2 characters') 
        },
        { 
          name: 'website', 
          label: 'Website', 
          type: 'url' 
        },
        { 
          name: 'status', 
          label: 'Status', 
          type: 'select',
          options: [
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
            { value: 'prospect', label: 'Prospect' },
          ]
        },
      ],
    },
    {
      title: 'Contact Information',
      fields: [
        { 
          name: 'email', 
          label: 'Email', 
          type: 'email', 
          validation: z.string().email('Please enter a valid email address') 
        },
        { 
          name: 'phone', 
          label: 'Phone', 
          type: 'phone' 
        },
        { 
          name: 'address', 
          label: 'Address', 
          type: 'textarea' 
        },
      ],
    },
    {
      title: 'Company Metrics',
      fields: [
        { 
          name: 'employeeCount', 
          label: 'Number of Employees', 
          type: 'number', 
          validation: z.number().min(1, 'Must have at least 1 employee') 
        },
        { 
          name: 'annualRevenue', 
          label: 'Annual Revenue', 
          type: 'number', 
          validation: z.number().min(0, 'Revenue must be >= 0') 
        },
      ],
    },
  ],
};

// Deal Form Configuration
export const dealFormConfig = {
  sections: [
    {
      title: 'Deal Information',
      fields: [
        { 
          name: 'title', 
          label: 'Deal Title', 
          type: 'text', 
          validation: z.string().min(2, 'Deal title must be at least 2 characters') 
        },
        { 
          name: 'value', 
          label: 'Deal Value', 
          type: 'number', 
          validation: z.number().min(0, 'Deal value must be >= 0') 
        },
        { 
          name: 'stage', 
          label: 'Stage', 
          type: 'select',
          options: [
            { value: 'prospecting', label: 'Prospecting' },
            { value: 'qualification', label: 'Qualification' },
            { value: 'proposal', label: 'Proposal' },
            { value: 'negotiation', label: 'Negotiation' },
            { value: 'closed-won', label: 'Closed Won' },
            { value: 'closed-lost', label: 'Closed Lost' },
          ]
        },
        { 
          name: 'probability', 
          label: 'Probability (%)', 
          type: 'number', 
          validation: z.number().min(0).max(100, 'Probability must be between 0 and 100') 
        },
      ],
    },
    {
      title: 'Related Entities',
      fields: [
        { 
          name: 'customerId', 
          label: 'Customer', 
          type: 'select',
          options: [
            { value: '1', label: 'John Smith - Acme Corp' },
            { value: '2', label: 'Jane Doe - Tech Solutions' },
          ]
        },
        { 
          name: 'companyId', 
          label: 'Company', 
          type: 'select',
          options: [
            { value: '1', label: 'Acme Corporation' },
            { value: '2', label: 'Tech Solutions Inc' },
          ]
        },
      ],
    },
    {
      title: 'Timeline',
      fields: [
        { 
          name: 'expectedCloseDate', 
          label: 'Expected Close Date', 
          type: 'text' 
        },
        { 
          name: 'actualCloseDate', 
          label: 'Actual Close Date', 
          type: 'text' 
        },
      ],
    },
    {
      title: 'Notes',
      fields: [
        { 
          name: 'description', 
          label: 'Description', 
          type: 'textarea' 
        },
        { 
          name: 'activities', 
          label: 'Activities', 
          type: 'array',
          itemFields: [
            { name: 'date', label: 'Date', type: 'text' },
            { name: 'activity', label: 'Activity', type: 'text' },
            { name: 'notes', label: 'Notes', type: 'textarea' },
          ]
        },
      ],
    },
  ],
};

// Lead Form Configuration
export const leadFormConfig = {
  sections: [
    {
      title: 'Lead Information',
      fields: [
        { 
          name: 'firstName', 
          label: 'First Name', 
          type: 'text', 
          validation: z.string().min(2, 'First name must be at least 2 characters') 
        },
        { 
          name: 'lastName', 
          label: 'Last Name', 
          type: 'text', 
          validation: z.string().min(2, 'Last name must be at least 2 characters') 
        },
        { 
          name: 'email', 
          label: 'Email', 
          type: 'email', 
          validation: z.string().email('Please enter a valid email address') 
        },
        { 
          name: 'phone', 
          label: 'Phone', 
          type: 'phone' 
        },
      ],
    },
    {
      title: 'Company & Source',
      fields: [
        { 
          name: 'company', 
          label: 'Company', 
          type: 'text' 
        },
        { 
          name: 'source', 
          label: 'Lead Source', 
          type: 'select',
          options: [
            { value: 'website', label: 'Website' },
            { value: 'referral', label: 'Referral' },
            { value: 'social-media', label: 'Social Media' },
            { value: 'cold-call', label: 'Cold Call' },
            { value: 'other', label: 'Other' },
          ]
        },
        { 
          name: 'status', 
          label: 'Status', 
          type: 'select',
          options: [
            { value: 'new', label: 'New' },
            { value: 'contacted', label: 'Contacted' },
            { value: 'qualified', label: 'Qualified' },
            { value: 'converted', label: 'Converted' },
            { value: 'lost', label: 'Lost' },
          ]
        },
      ],
    },
    {
      title: 'Additional Details',
      fields: [
        { 
          name: 'notes', 
          label: 'Notes', 
          type: 'textarea' 
        },
        { 
          name: 'priority', 
          label: 'Priority', 
          type: 'select',
          options: [
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
          ]
        },
      ],
    },
  ],
};

// Export all configurations
export const formConfigs = {
  customer: customerFormConfig,
  company: companyFormConfig,
  deal: dealFormConfig,
  lead: leadFormConfig,
};
