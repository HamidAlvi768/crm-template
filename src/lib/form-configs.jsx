import * as z from 'zod';
import React from 'react';

// Customer Form Configuration
export const customerFormConfig = {
  // Form-level classes
  className: "",
  formClassName: "bg-background",
  actionsClassName: "pt-6 border-t border-border",
  submitButtonClassName: "bg-primary hover:bg-primary/90",
  cancelButtonClassName: "hover:bg-muted",
  
  sections: [
    {
      title: 'Personal Information',
      className: "space-y-4",
      titleClassName: "text-primary border-primary/20",
      fields: [
        { 
          name: 'firstName', 
          label: 'First Name', 
          type: 'text', 
          validation: z.string().min(2, 'First name must be at least 2 characters'),
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
        { 
          name: 'lastName', 
          label: 'Last Name', 
          type: 'text', 
          validation: z.string().min(2, 'Last name must be at least 2 characters'),
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
        { 
          name: 'email', 
          label: 'Email', 
          type: 'email', 
          validation: z.string().email('Please enter a valid email address'),
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
        { 
          name: 'phone', 
          label: 'Phone', 
          type: 'tel', 
          validation: z.string().min(10, 'Phone number must be at least 10 characters'),
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
      ],
      fieldsContainerClassName: "bs-row",
    },
    {
      title: 'Account & Preferences',
      className: "space-y-4",
      titleClassName: "text-primary border-primary/20",
      fields: [
        { 
          name: 'password', 
          label: 'Password', 
          type: 'password',
          validation: z.string().min(8, 'Password must be at least 8 characters'),
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
        { 
          name: 'age', 
          label: 'Age', 
          type: 'number',
          validation: z.number().min(18, 'Must be at least 18 years old').max(120, 'Invalid age'),
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
        { 
          name: 'birthDate', 
          label: 'Birth Date', 
          type: 'date',
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
        { 
          name: 'favoriteColor', 
          label: 'Favorite Color', 
          type: 'color',
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
      ],
      fieldsContainerClassName: "bs-row",
    },
    {
      title: 'Company Information',
      className: "space-y-4",
      titleClassName: "text-primary border-primary/20",
      fields: [
        { 
          name: 'company', 
          label: 'Company', 
          type: 'text',
          validation: z.string().min(2, 'Company name must be at least 2 characters'),
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
        { 
          name: 'jobTitle', 
          label: 'Job Title', 
          type: 'text',
          validation: z.string().min(2, 'Job title must be at least 2 characters'),
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
        { 
          name: 'industry', 
          label: 'Industry', 
          type: 'select',
          options: [
            { value: 'technology', label: 'Technology' },
            { value: 'healthcare', label: 'Healthcare' },
            { value: 'finance', label: 'Finance' },
            { value: 'education', label: 'Education' },
            { value: 'retail', label: 'Retail' },
            { value: 'manufacturing', label: 'Manufacturing' },
            { value: 'marketing', label: 'Marketing' },
            { value: 'consulting', label: 'Consulting' },
            { value: 'other', label: 'Other' },
          ],
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
        { 
          name: 'website', 
          label: 'Website', 
          type: 'url',
          validation: z.string().url('Please enter a valid URL').optional(),
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
      ],
      fieldsContainerClassName: "bs-row",
    },
    {
      title: 'Preferences & Settings',
      className: "space-y-4",
      titleClassName: "text-primary border-primary/20",
      fields: [
        { 
          name: 'status', 
          label: 'Status', 
          type: 'select',
          options: [
            { value: 'active', label: 'Active' },
            { value: 'prospect', label: 'Prospect' },
            { value: 'inactive', label: 'Inactive' },
          ],
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
        { 
          name: 'priority', 
          label: 'Priority', 
          type: 'select',
          options: [
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
          ],
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
        { 
          name: 'satisfaction', 
          label: 'Satisfaction Level', 
          type: 'select',
          options: [
            { value: 1, label: '1 - Very Dissatisfied' },
            { value: 2, label: '2 - Dissatisfied' },
            { value: 3, label: '3 - Neutral' },
            { value: 4, label: '4 - Satisfied' },
            { value: 5, label: '5 - Very Satisfied' },
            { value: 6, label: '6 - Satisfied' },
            { value: 7, label: '7 - Very Satisfied' },
            { value: 8, label: '8 - Extremely Satisfied' },
            { value: 9, label: '9 - Outstanding' },
            { value: 10, label: '10 - Exceptional' },
          ],
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
        { 
          name: 'newsletter', 
          label: 'Subscribe to Newsletter', 
          type: 'checkbox',
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
        { 
          name: 'termsAccepted', 
          label: 'I accept the terms and conditions', 
          type: 'checkbox',
          validation: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
          itemClassName: "bs-col-12",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
      ],
      fieldsContainerClassName: "bs-row",
    },
  ],
};

// Company Form Configuration
export const companyFormConfig = {
  className: "",
  formClassName: "bg-background",
  actionsClassName: "pt-6 border-t border-border",
  submitButtonClassName: "bg-primary hover:bg-primary/90",
  cancelButtonClassName: "hover:bg-muted",
  
  sections: [
    {
      title: 'Company Information',
      className: "space-y-4",
      titleClassName: "text-primary border-primary/20",
      fields: [
        { 
          name: 'name', 
          label: 'Company Name', 
          type: 'text',
          validation: z.string().min(2, 'Company name must be at least 2 characters'),
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
        { 
          name: 'industry', 
          label: 'Industry', 
          type: 'select',
          options: [
            { value: 'technology', label: 'Technology' },
            { value: 'healthcare', label: 'Healthcare' },
            { value: 'finance', label: 'Finance' },
            { value: 'education', label: 'Education' },
            { value: 'retail', label: 'Retail' },
            { value: 'manufacturing', label: 'Manufacturing' },
            { value: 'marketing', label: 'Marketing' },
            { value: 'consulting', label: 'Consulting' },
            { value: 'other', label: 'Other' },
          ],
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
        { 
          name: 'website', 
          label: 'Website', 
          type: 'url',
          validation: z.string().url('Please enter a valid URL').optional(),
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
        { 
          name: 'phone', 
          label: 'Phone', 
          type: 'tel',
          validation: z.string().min(10, 'Phone number must be at least 10 characters'),
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
        { 
          name: 'email', 
          label: 'Email', 
          type: 'email',
          validation: z.string().email('Please enter a valid email address'),
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
        { 
          name: 'address', 
          label: 'Address', 
          type: 'textarea',
          itemClassName: "bs-col-12",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
      ],
      fieldsContainerClassName: "bs-row",
    },
    {
      title: 'Company Details',
      className: "space-y-4",
      titleClassName: "text-primary border-primary/20",
      fields: [
        { 
          name: 'size', 
          label: 'Company Size', 
          type: 'select',
          options: [
            { value: '1-10', label: '1-10 employees' },
            { value: '11-50', label: '11-50 employees' },
            { value: '51-200', label: '51-200 employees' },
            { value: '201-500', label: '201-500 employees' },
            { value: '501-1000', label: '501-1000 employees' },
            { value: '1000+', label: '1000+ employees' },
          ],
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
        { 
          name: 'founded', 
          label: 'Founded Year', 
          type: 'number',
          validation: z.number().min(1800, 'Invalid year').max(new Date().getFullYear(), 'Year cannot be in the future'),
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
        { 
          name: 'revenue', 
          label: 'Annual Revenue', 
          type: 'select',
          options: [
            { value: 'under-1m', label: 'Under $1M' },
            { value: '1m-10m', label: '$1M - $10M' },
            { value: '10m-50m', label: '$10M - $50M' },
            { value: '50m-100m', label: '$50M - $100M' },
            { value: '100m-500m', label: '$100M - $500M' },
            { value: '500m+', label: '$500M+' },
          ],
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
        { 
          name: 'description', 
          label: 'Company Description', 
          type: 'textarea',
          itemClassName: "bs-col-12",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
      ],
      fieldsContainerClassName: "bs-row",
    },
  ],
};

// Deal Form Configuration
export const dealFormConfig = {
  className: "",
  formClassName: "bg-background",
  actionsClassName: "pt-6 border-t border-border",
  submitButtonClassName: "bg-primary hover:bg-primary/90",
  cancelButtonClassName: "hover:bg-muted",
  
  sections: [
    {
      title: 'Deal Information',
      className: "space-y-4",
      titleClassName: "text-primary border-primary/20",
      fields: [
        { 
          name: 'title', 
          label: 'Deal Title', 
          type: 'text',
          validation: z.string().min(2, 'Deal title must be at least 2 characters'),
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
        { 
          name: 'value', 
          label: 'Deal Value', 
          type: 'number',
          validation: z.number().min(0, 'Deal value must be positive'),
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
        { 
          name: 'stage', 
          label: 'Deal Stage', 
          type: 'select',
          options: [
            { value: 'prospecting', label: 'Prospecting' },
            { value: 'qualification', label: 'Qualification' },
            { value: 'proposal', label: 'Proposal' },
            { value: 'negotiation', label: 'Negotiation' },
            { value: 'closed-won', label: 'Closed Won' },
            { value: 'closed-lost', label: 'Closed Lost' },
          ],
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
        { 
          name: 'expectedCloseDate', 
          label: 'Expected Close Date', 
          type: 'date',
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
      ],
      fieldsContainerClassName: "bs-row",
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

// Lead Form Configuration
export const leadFormConfig = {
  className: "",
  formClassName: "bg-background",
  actionsClassName: "pt-6 border-t border-border",
  submitButtonClassName: "bg-primary hover:bg-primary/90",
  cancelButtonClassName: "hover:bg-muted",
  
  sections: [
    {
      title: 'Lead Information',
      className: "space-y-4",
      titleClassName: "text-primary border-primary/20",
      fields: [
        { 
          name: 'firstName', 
          label: 'First Name', 
          type: 'text',
          validation: z.string().min(2, 'First name must be at least 2 characters'),
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
        { 
          name: 'lastName', 
          label: 'Last Name', 
          type: 'text',
          validation: z.string().min(2, 'Last name must be at least 2 characters'),
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
        { 
          name: 'email', 
          label: 'Email', 
          type: 'email',
          validation: z.string().email('Please enter a valid email address'),
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
        { 
          name: 'phone', 
          label: 'Phone', 
          type: 'tel',
          validation: z.string().min(10, 'Phone number must be at least 10 characters'),
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
        { 
          name: 'company', 
          label: 'Company', 
          type: 'text',
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
        { 
          name: 'jobTitle', 
          label: 'Job Title', 
          type: 'text',
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
      ],
      fieldsContainerClassName: "bs-row",
    },
    {
      title: 'Lead Details',
      className: "space-y-4",
      titleClassName: "text-primary border-primary/20",
      fields: [
        { 
          name: 'source', 
          label: 'Lead Source', 
          type: 'select',
          options: [
            { value: 'website', label: 'Website' },
            { value: 'referral', label: 'Referral' },
            { value: 'social-media', label: 'Social Media' },
            { value: 'email-campaign', label: 'Email Campaign' },
            { value: 'cold-call', label: 'Cold Call' },
            { value: 'other', label: 'Other' },
          ],
          itemClassName: "bs-col-12 bs-col-md-6",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
        { 
          name: 'status', 
          label: 'Lead Status', 
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

// Login Form Configuration
export const loginFormConfig = {
  // Form-level classes
  className: "",
  formClassName: "bg-background",
  actionsClassName: "pt-6",
  submitButtonClassName: "bg-primary hover:bg-primary/90 w-full",
  
  sections: [
    {
      title: 'Login Credentials',
      className: "",
      titleClassName: "text-primary border-primary/20",
      fields: [
        { 
          name: 'email', 
          label: 'Email', 
          type: 'email', 
          validation: z.string().email('Please enter a valid email address'),
          itemClassName: "bs-col-12",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
        { 
          name: 'password', 
          label: 'Password', 
          type: 'password',
          validation: z.string().min(1, 'Password is required'),
          itemClassName: "bs-col-12",
          labelClassName: "font-medium text-foreground",
          controlClassName: "mt-1"
        },
      ],
      fieldsContainerClassName: "bs-row",
    },
  ],
  
  // Custom footer content
  footer: (
    <div className="mt-4 text-center text-sm">
      Don&apos;t have an account?{" "}
      <a href="#" className="underline underline-offset-4">
        Sign up
      </a>
    </div>
  ),
  
  // Custom actions (like forgot password link)
  customActions: (
    <div className="flex items-center justify-between my-4">
      <span></span>
      <a
        href="/forgot-password"
        className="text-sm underline-offset-4 hover:underline">
        Forgot your password?
      </a>
    </div>
  ),
};

// Export all configurations
export const formConfigs = {
  customer: customerFormConfig,
  company: companyFormConfig,
  deal: dealFormConfig,
  lead: leadFormConfig,
};
