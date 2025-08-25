import * as z from 'zod'

// Common validation schemas
export const commonSchemas = {
  // ID validation
  id: z.union([
    z.string().min(1, 'ID is required'),
    z.number().positive('ID must be a positive number')
  ]),
  
  // Pagination validation
  pagination: z.object({
    page: z.number().min(1, 'Page must be at least 1').default(1),
    limit: z.number().min(1, 'Limit must be at least 1').max(100, 'Limit cannot exceed 100').default(10),
    sortBy: z.string().optional(),
    sortOrder: z.enum(['asc', 'desc']).default('asc')
  }),
  
  // Search validation
  search: z.object({
    q: z.string().min(1, 'Search query is required').max(100, 'Search query too long'),
    filters: z.record(z.any()).optional()
  }),
  
  // Date range validation
  dateRange: z.object({
    startDate: z.string().datetime('Invalid start date').optional(),
    endDate: z.string().datetime('Invalid end date').optional()
  }).refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return new Date(data.startDate) <= new Date(data.endDate)
      }
      return true
    },
    {
      message: 'Start date must be before or equal to end date',
      path: ['endDate']
    }
  )
}

// User validation schemas
export const userSchemas = {
  // User creation
  createUser: z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters').max(50, 'First name too long'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50, 'Last name too long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    role: z.enum(['admin', 'manager', 'user']).default('user'),
    department: z.string().optional(),
    phone: z.string().optional(),
    avatar: z.string().url('Invalid avatar URL').optional()
  }),
  
  // User update
  updateUser: z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters').max(50, 'First name too long').optional(),
    lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50, 'Last name too long').optional(),
    email: z.string().email('Invalid email address').optional(),
    role: z.enum(['admin', 'manager', 'user']).optional(),
    department: z.string().optional(),
    phone: z.string().optional(),
    avatar: z.string().url('Invalid avatar URL').optional(),
    status: z.enum(['active', 'inactive', 'suspended']).optional()
  }),
  
  // User profile update
  updateProfile: z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters').max(50, 'First name too long').optional(),
    lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50, 'Last name too long').optional(),
    phone: z.string().optional(),
    avatar: z.string().url('Invalid avatar URL').optional(),
    bio: z.string().max(500, 'Bio too long').optional()
  }),
  
  // Change password
  changePassword: z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your new password')
  }).refine(
    (data) => data.newPassword === data.confirmPassword,
    {
      message: 'Passwords do not match',
      path: ['confirmPassword']
    }
  ),
  
  // User filters
  userFilters: z.object({
    search: z.string().optional(),
    role: z.enum(['admin', 'manager', 'user']).optional(),
    status: z.enum(['active', 'inactive', 'suspended']).optional(),
    department: z.string().optional(),
    ...commonSchemas.dateRange.shape
  })
}

// Product validation schemas
export const productSchemas = {
  // Product creation
  createProduct: z.object({
    name: z.string().min(2, 'Product name must be at least 2 characters').max(100, 'Product name too long'),
    description: z.string().min(10, 'Description must be at least 10 characters').max(1000, 'Description too long'),
    price: z.number().positive('Price must be positive').max(999999.99, 'Price too high'),
    category: z.string().min(1, 'Category is required'),
    brand: z.string().min(1, 'Brand is required'),
    sku: z.string().min(1, 'SKU is required').max(50, 'SKU too long'),
    stockQuantity: z.number().int('Stock quantity must be an integer').min(0, 'Stock quantity cannot be negative'),
    inStock: z.boolean().default(true),
    tags: z.array(z.string()).optional(),
    images: z.array(z.string().url('Invalid image URL')).optional(),
    featured: z.boolean().default(false),
    active: z.boolean().default(true)
  }),
  
  // Product update
  updateProduct: z.object({
    name: z.string().min(2, 'Product name must be at least 2 characters').max(100, 'Product name too long').optional(),
    description: z.string().min(10, 'Description must be at least 10 characters').max(1000, 'Description too long').optional(),
    price: z.number().positive('Price must be positive').max(999999.99, 'Price too high').optional(),
    category: z.string().min(1, 'Category is required').optional(),
    brand: z.string().min(1, 'Brand is required').optional(),
    sku: z.string().min(1, 'SKU is required').max(50, 'SKU too long').optional(),
    stockQuantity: z.number().int('Stock quantity must be an integer').min(0, 'Stock quantity cannot be negative').optional(),
    inStock: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    images: z.array(z.string().url('Invalid image URL')).optional(),
    featured: z.boolean().optional(),
    active: z.boolean().optional()
  }),
  
  // Product filters
  productFilters: z.object({
    search: z.string().optional(),
    category: z.string().optional(),
    brand: z.string().optional(),
    priceRange: z.object({
      min: z.number().min(0, 'Minimum price cannot be negative').optional(),
      max: z.number().min(0, 'Maximum price cannot be negative').optional()
    }).optional(),
    inStock: z.boolean().optional(),
    featured: z.boolean().optional(),
    active: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    ...commonSchemas.dateRange.shape
  }),
  
  // Product review
  productReview: z.object({
    rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5'),
    title: z.string().min(5, 'Review title must be at least 5 characters').max(100, 'Review title too long'),
    comment: z.string().min(10, 'Review comment must be at least 10 characters').max(500, 'Review comment too long'),
    anonymous: z.boolean().default(false)
  })
}

// Authentication validation schemas
export const authSchemas = {
  // Login
  login: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
    rememberMe: z.boolean().default(false)
  }),
  
  // Registration
  register: z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters').max(50, 'First name too long'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50, 'Last name too long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    acceptTerms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions')
  }).refine(
    (data) => data.password === data.confirmPassword,
    {
      message: 'Passwords do not match',
      path: ['confirmPassword']
    }
  ),
  
  // Forgot password
  forgotPassword: z.object({
    email: z.string().email('Invalid email address')
  }),
  
  // Reset password
  resetPassword: z.object({
    token: z.string().min(1, 'Reset token is required'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your new password')
  }).refine(
    (data) => data.password === data.confirmPassword,
    {
      message: 'Passwords do not match',
      path: ['confirmPassword']
    }
  )
}

// Bulk operation validation schemas
export const bulkSchemas = {
  // Bulk delete
  bulkDelete: z.object({
    ids: z.array(commonSchemas.id).min(1, 'At least one ID is required'),
    confirm: z.boolean().refine(val => val === true, 'Please confirm this action')
  }),
  
  // Bulk update
  bulkUpdate: z.object({
    ids: z.array(commonSchemas.id).min(1, 'At least one ID is required'),
    updates: z.record(z.any()).min(1, 'At least one update field is required')
  }),
  
  // Bulk status change
  bulkStatusChange: z.object({
    ids: z.array(commonSchemas.id).min(1, 'At least one ID is required'),
    status: z.enum(['active', 'inactive', 'suspended']),
    reason: z.string().optional()
  })
}

// Export all schemas
export const schemas = {
  common: commonSchemas,
  user: userSchemas,
  product: productSchemas,
  auth: authSchemas,
  bulk: bulkSchemas
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
          message: err.message
        }))
      }
    }
    return {
      success: false,
      errors: [{ field: 'unknown', message: 'Validation failed' }]
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
          message: err.message
        }))
      }
    }
    return {
      success: false,
      errors: [{ field: 'unknown', message: 'Validation failed' }]
    }
  }
}

// Export default schemas object
export default schemas
