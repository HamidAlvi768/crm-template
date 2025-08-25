// Validation utility functions and schemas

import * as z from 'zod'

// Common validation patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\+]?[1-9][\d]{0,15}$/,
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  USERNAME: /^[a-zA-Z0-9_-]{3,20}$/,
  ZIP_CODE: /^\d{5}(-\d{4})?$/,
  CREDIT_CARD: /^\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$/,
  SSN: /^\d{3}-?\d{2}-?\d{4}$/,
  IP_ADDRESS: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
}

// Common validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  INVALID_URL: 'Please enter a valid URL',
  INVALID_PASSWORD: 'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character',
  INVALID_USERNAME: 'Username must be 3-20 characters and contain only letters, numbers, underscores, and hyphens',
  INVALID_ZIP: 'Please enter a valid ZIP code',
  INVALID_CREDIT_CARD: 'Please enter a valid credit card number',
  INVALID_SSN: 'Please enter a valid Social Security Number',
  INVALID_IP: 'Please enter a valid IP address',
  MIN_LENGTH: (field, min) => `${field} must be at least ${min} characters`,
  MAX_LENGTH: (field, max) => `${field} cannot exceed ${max} characters`,
  MIN_VALUE: (field, min) => `${field} must be at least ${min}`,
  MAX_VALUE: (field, max) => `${field} cannot exceed ${max}`,
  INVALID_FORMAT: (field) => `Please enter a valid ${field}`,
  PASSWORDS_DONT_MATCH: 'Passwords do not match',
  FUTURE_DATE: 'Date cannot be in the future',
  PAST_DATE: 'Date cannot be in the past',
  INVALID_DATE_RANGE: 'Start date must be before end date',
}

// Common validation schemas
export const commonSchemas = {
  // Required string
  requiredString: (fieldName = 'Field') => 
    z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  
  // Email validation
  email: z.string()
    .min(1, VALIDATION_MESSAGES.REQUIRED)
    .email(VALIDATION_MESSAGES.INVALID_EMAIL),
  
  // Phone validation
  phone: z.string()
    .min(1, VALIDATION_MESSAGES.REQUIRED)
    .regex(VALIDATION_PATTERNS.PHONE, VALIDATION_MESSAGES.INVALID_PHONE),
  
  // URL validation
  url: z.string()
    .min(1, VALIDATION_MESSAGES.REQUIRED)
    .regex(VALIDATION_PATTERNS.URL, VALIDATION_MESSAGES.INVALID_URL),
  
  // Password validation
  password: z.string()
    .min(8, VALIDATION_MESSAGES.MIN_LENGTH('Password', 8))
    .regex(VALIDATION_PATTERNS.PASSWORD, VALIDATION_MESSAGES.INVALID_PASSWORD),
  
  // Username validation
  username: z.string()
    .min(3, VALIDATION_MESSAGES.MIN_LENGTH('Username', 3))
    .max(20, VALIDATION_MESSAGES.MAX_LENGTH('Username', 20))
    .regex(VALIDATION_PATTERNS.USERNAME, VALIDATION_MESSAGES.INVALID_USERNAME),
  
  // ZIP code validation
  zipCode: z.string()
    .min(1, VALIDATION_MESSAGES.REQUIRED)
    .regex(VALIDATION_PATTERNS.ZIP_CODE, VALIDATION_MESSAGES.INVALID_ZIP),
  
  // Credit card validation
  creditCard: z.string()
    .min(1, VALIDATION_MESSAGES.REQUIRED)
    .regex(VALIDATION_PATTERNS.CREDIT_CARD, VALIDATION_MESSAGES.INVALID_CREDIT_CARD),
  
  // SSN validation
  ssn: z.string()
    .min(1, VALIDATION_MESSAGES.REQUIRED)
    .regex(VALIDATION_PATTERNS.SSN, VALIDATION_MESSAGES.INVALID_SSN),
  
  // IP address validation
  ipAddress: z.string()
    .min(1, VALIDATION_MESSAGES.REQUIRED)
    .regex(VALIDATION_PATTERNS.IP_ADDRESS, VALIDATION_MESSAGES.INVALID_IP),
  
  // Date validation
  date: z.date({
    required_error: VALIDATION_MESSAGES.REQUIRED,
    invalid_type_error: VALIDATION_MESSAGES.INVALID_FORMAT('date'),
  }),
  
  // Future date validation
  futureDate: z.date({
    required_error: VALIDATION_MESSAGES.REQUIRED,
    invalid_type_error: VALIDATION_MESSAGES.INVALID_FORMAT('date'),
  }).refine((date) => date > new Date(), {
    message: VALIDATION_MESSAGES.FUTURE_DATE,
  }),
  
  // Past date validation
  pastDate: z.date({
    required_error: VALIDATION_MESSAGES.REQUIRED,
    invalid_type_error: VALIDATION_MESSAGES.INVALID_FORMAT('date'),
  }).refine((date) => date < new Date(), {
    message: VALIDATION_MESSAGES.PAST_DATE,
  }),
  
  // Number validation
  number: z.number({
    required_error: VALIDATION_MESSAGES.REQUIRED,
    invalid_type_error: VALIDATION_MESSAGES.INVALID_FORMAT('number'),
  }),
  
  // Positive number validation
  positiveNumber: z.number({
    required_error: VALIDATION_MESSAGES.REQUIRED,
    invalid_type_error: VALIDATION_MESSAGES.INVALID_FORMAT('number'),
  }).positive('Value must be positive'),
  
  // Integer validation
  integer: z.number({
    required_error: VALIDATION_MESSAGES.REQUIRED,
    invalid_type_error: VALIDATION_MESSAGES.INVALID_FORMAT('number'),
  }).int('Value must be an integer'),
  
  // Boolean validation
  boolean: z.boolean({
    required_error: VALIDATION_MESSAGES.REQUIRED,
    invalid_type_error: VALIDATION_MESSAGES.INVALID_FORMAT('boolean'),
  }),
}

// User validation schemas
export const userSchemas = {
  // User creation
  createUser: z.object({
    firstName: z.string()
      .min(2, VALIDATION_MESSAGES.MIN_LENGTH('First name', 2))
      .max(50, VALIDATION_MESSAGES.MAX_LENGTH('First name', 50)),
    lastName: z.string()
      .min(2, VALIDATION_MESSAGES.MIN_LENGTH('Last name', 2))
      .max(50, VALIDATION_MESSAGES.MAX_LENGTH('Last name', 50)),
    email: commonSchemas.email,
    password: commonSchemas.password,
    confirmPassword: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
    role: z.enum(['admin', 'manager', 'user']).default('user'),
    department: z.string().optional(),
    phone: commonSchemas.phone.optional(),
    avatar: commonSchemas.url.optional(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: VALIDATION_MESSAGES.PASSWORDS_DONT_MATCH,
    path: ['confirmPassword'],
  }),
  
  // User update
  updateUser: z.object({
    firstName: z.string()
      .min(2, VALIDATION_MESSAGES.MIN_LENGTH('First name', 2))
      .max(50, VALIDATION_MESSAGES.MAX_LENGTH('First name', 50))
      .optional(),
    lastName: z.string()
      .min(2, VALIDATION_MESSAGES.MIN_LENGTH('Last name', 2))
      .max(50, VALIDATION_MESSAGES.MAX_LENGTH('Last name', 50))
      .optional(),
    email: commonSchemas.email.optional(),
    role: z.enum(['admin', 'manager', 'user']).optional(),
    department: z.string().optional(),
    phone: commonSchemas.phone.optional(),
    avatar: commonSchemas.url.optional(),
    status: z.enum(['active', 'inactive', 'suspended']).optional(),
  }),
  
  // User profile update
  updateProfile: z.object({
    firstName: z.string()
      .min(2, VALIDATION_MESSAGES.MIN_LENGTH('First name', 2))
      .max(50, VALIDATION_MESSAGES.MAX_LENGTH('First name', 50))
      .optional(),
    lastName: z.string()
      .min(2, VALIDATION_MESSAGES.MIN_LENGTH('Last name', 2))
      .max(50, VALIDATION_MESSAGES.MAX_LENGTH('Last name', 50))
      .optional(),
    phone: commonSchemas.phone.optional(),
    avatar: commonSchemas.url.optional(),
    bio: z.string()
      .max(500, VALIDATION_MESSAGES.MAX_LENGTH('Bio', 500))
      .optional(),
  }),
  
  // Change password
  changePassword: z.object({
    currentPassword: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
    newPassword: commonSchemas.password,
    confirmPassword: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: VALIDATION_MESSAGES.PASSWORDS_DONT_MATCH,
    path: ['confirmPassword'],
  }),
  
  // User filters
  userFilters: z.object({
    search: z.string().optional(),
    role: z.enum(['admin', 'manager', 'user']).optional(),
    status: z.enum(['active', 'inactive', 'suspended']).optional(),
    department: z.string().optional(),
    startDate: commonSchemas.date.optional(),
    endDate: commonSchemas.date.optional(),
  }).refine((data) => {
    if (data.startDate && data.endDate) {
      return data.startDate <= data.endDate
    }
    return true
  }, {
    message: VALIDATION_MESSAGES.INVALID_DATE_RANGE,
    path: ['endDate'],
  }),
}

// Product validation schemas
export const productSchemas = {
  // Product creation
  createProduct: z.object({
    name: z.string()
      .min(2, VALIDATION_MESSAGES.MIN_LENGTH('Product name', 2))
      .max(100, VALIDATION_MESSAGES.MAX_LENGTH('Product name', 100)),
    description: z.string()
      .min(10, VALIDATION_MESSAGES.MIN_LENGTH('Description', 10))
      .max(1000, VALIDATION_MESSAGES.MAX_LENGTH('Description', 1000)),
    price: z.number()
      .positive(VALIDATION_MESSAGES.MIN_VALUE('Price', 0))
      .max(999999.99, VALIDATION_MESSAGES.MAX_VALUE('Price', 999999.99)),
    category: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
    brand: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
    sku: z.string()
      .min(1, VALIDATION_MESSAGES.REQUIRED)
      .max(50, VALIDATION_MESSAGES.MAX_LENGTH('SKU', 50)),
    stockQuantity: z.number()
      .int(VALIDATION_MESSAGES.INVALID_FORMAT('stock quantity'))
      .min(0, VALIDATION_MESSAGES.MIN_VALUE('Stock quantity', 0)),
    inStock: z.boolean().default(true),
    tags: z.array(z.string()).optional(),
    images: z.array(commonSchemas.url).optional(),
    featured: z.boolean().default(false),
    active: z.boolean().default(true),
  }),
  
  // Product update
  updateProduct: z.object({
    name: z.string()
      .min(2, VALIDATION_MESSAGES.MIN_LENGTH('Product name', 2))
      .max(100, VALIDATION_MESSAGES.MAX_LENGTH('Product name', 100))
      .optional(),
    description: z.string()
      .min(10, VALIDATION_MESSAGES.MIN_LENGTH('Description', 10))
      .max(1000, VALIDATION_MESSAGES.MAX_LENGTH('Description', 1000))
      .optional(),
    price: z.number()
      .positive(VALIDATION_MESSAGES.MIN_VALUE('Price', 0))
      .max(999999.99, VALIDATION_MESSAGES.MAX_VALUE('Price', 999999.99))
      .optional(),
    category: z.string().min(1, VALIDATION_MESSAGES.REQUIRED).optional(),
    brand: z.string().min(1, VALIDATION_MESSAGES.REQUIRED).optional(),
    sku: z.string()
      .min(1, VALIDATION_MESSAGES.REQUIRED)
      .max(50, VALIDATION_MESSAGES.MAX_LENGTH('SKU', 50))
      .optional(),
    stockQuantity: z.number()
      .int(VALIDATION_MESSAGES.INVALID_FORMAT('stock quantity'))
      .min(0, VALIDATION_MESSAGES.MIN_VALUE('Stock quantity', 0))
      .optional(),
    inStock: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    images: z.array(commonSchemas.url).optional(),
    featured: z.boolean().optional(),
    active: z.boolean().optional(),
  }),
  
  // Product filters
  productFilters: z.object({
    search: z.string().optional(),
    category: z.string().optional(),
    brand: z.string().optional(),
    priceRange: z.object({
      min: z.number().min(0, VALIDATION_MESSAGES.MIN_VALUE('Minimum price', 0)).optional(),
      max: z.number().min(0, VALIDATION_MESSAGES.MIN_VALUE('Maximum price', 0)).optional(),
    }).optional(),
    inStock: z.boolean().optional(),
    featured: z.boolean().optional(),
    active: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    startDate: commonSchemas.date.optional(),
    endDate: commonSchemas.date.optional(),
  }).refine((data) => {
    if (data.startDate && data.endDate) {
      return data.startDate <= data.endDate
    }
    return true
  }, {
    message: VALIDATION_MESSAGES.INVALID_DATE_RANGE,
    path: ['endDate'],
  }),
  
  // Product review
  productReview: z.object({
    rating: z.number()
      .min(1, VALIDATION_MESSAGES.MIN_VALUE('Rating', 1))
      .max(5, VALIDATION_MESSAGES.MAX_VALUE('Rating', 5)),
    title: z.string()
      .min(5, VALIDATION_MESSAGES.MIN_LENGTH('Review title', 5))
      .max(100, VALIDATION_MESSAGES.MAX_LENGTH('Review title', 100)),
    comment: z.string()
      .min(10, VALIDATION_MESSAGES.MIN_LENGTH('Review comment', 10))
      .max(500, VALIDATION_MESSAGES.MAX_LENGTH('Review comment', 500)),
    anonymous: z.boolean().default(false),
  }),
}

// Authentication validation schemas
export const authSchemas = {
  // Login
  login: z.object({
    email: commonSchemas.email,
    password: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
    rememberMe: z.boolean().default(false),
  }),
  
  // Registration
  register: z.object({
    firstName: z.string()
      .min(2, VALIDATION_MESSAGES.MIN_LENGTH('First name', 2))
      .max(50, VALIDATION_MESSAGES.MAX_LENGTH('First name', 50)),
    lastName: z.string()
      .min(2, VALIDATION_MESSAGES.MIN_LENGTH('Last name', 2))
      .max(50, VALIDATION_MESSAGES.MAX_LENGTH('Last name', 50)),
    email: commonSchemas.email,
    password: commonSchemas.password,
    confirmPassword: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: VALIDATION_MESSAGES.PASSWORDS_DONT_MATCH,
    path: ['confirmPassword'],
  }),
  
  // Forgot password
  forgotPassword: z.object({
    email: commonSchemas.email,
  }),
  
  // Reset password
  resetPassword: z.object({
    token: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
    password: commonSchemas.password,
    confirmPassword: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  }).refine((data) => data.password === data.confirmPassword, {
    message: VALIDATION_MESSAGES.PASSWORDS_DONT_MATCH,
    path: ['confirmPassword'],
  }),
}

// Bulk operation validation schemas
export const bulkSchemas = {
  // Bulk delete
  bulkDelete: z.object({
    ids: z.array(z.union([
      z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
      z.number().positive(VALIDATION_MESSAGES.MIN_VALUE('ID', 1)),
    ])).min(1, 'At least one ID is required'),
    confirm: z.boolean().refine((val) => val === true, {
      message: 'Please confirm this action',
    }),
  }),
  
  // Bulk update
  bulkUpdate: z.object({
    ids: z.array(z.union([
      z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
      z.number().positive(VALIDATION_MESSAGES.MIN_VALUE('ID', 1)),
    ])).min(1, 'At least one ID is required'),
    updates: z.record(z.any()).min(1, 'At least one update field is required'),
  }),
  
  // Bulk status change
  bulkStatusChange: z.object({
    ids: z.array(z.union([
      z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
      z.number().positive(VALIDATION_MESSAGES.MIN_VALUE('ID', 1)),
    ])).min(1, 'At least one ID is required'),
    status: z.enum(['active', 'inactive', 'suspended']),
    reason: z.string().optional(),
  }),
}

// Export all schemas
export const schemas = {
  common: commonSchemas,
  user: userSchemas,
  product: productSchemas,
  auth: authSchemas,
  bulk: bulkSchemas,
}

// Validation helper functions
export const validateData = (schema, data) => {
  try {
    return { success: true, data: schema.parse(data) }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code,
        }))
      }
    }
    return {
      success: false,
      errors: [{ field: 'unknown', message: 'Validation failed', code: 'unknown' }]
    }
  }
}

export const validatePartialData = (schema, data) => {
  try {
    return { success: true, data: schema.partial().parse(data) }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code,
        }))
      }
    }
    return {
      success: false,
      errors: [{ field: 'unknown', message: 'Validation failed', code: 'unknown' }]
    }
  }
}

// Field validation functions
export const validateField = (schema, value, fieldName) => {
  try {
    schema.parse(value)
    return { isValid: true, error: null }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldError = error.errors.find(err => err.path[0] === fieldName)
      return {
        isValid: false,
        error: fieldError ? fieldError.message : 'Invalid value',
      }
    }
    return {
      isValid: false,
      error: 'Validation failed',
    }
  }
}

// Async validation function
export const validateAsync = async (schema, data) => {
  try {
    const result = await schema.parseAsync(data)
    return { success: true, data: result }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code,
        }))
      }
    }
    return {
      success: false,
      errors: [{ field: 'unknown', message: 'Validation failed', code: 'unknown' }]
    }
  }
}

// Create custom validation schema
export const createCustomSchema = (baseSchema, customRules) => {
  return baseSchema.superRefine((data, ctx) => {
    customRules.forEach(rule => {
      if (!rule.condition(data)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: rule.message,
          path: rule.path || [],
        })
      }
    })
  })
}

// Export default schemas object
export default schemas
