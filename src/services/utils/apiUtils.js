// API utility functions for common operations

/**
 * Retry function with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxAttempts - Maximum number of retry attempts
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {Promise} - Promise that resolves with function result
 */
export const retryWithBackoff = async (fn, maxAttempts = 3, baseDelay = 1000) => {
  let lastError
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      
      if (attempt === maxAttempts) {
        throw lastError
      }
      
      // Calculate delay with exponential backoff
      const delay = baseDelay * Math.pow(2, attempt - 1)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
}

/**
 * Debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * Parse API response and handle common error cases
 * @param {Response} response - Fetch response object
 * @returns {Promise} - Parsed response data
 */
export const parseAPIResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`
    
    try {
      const errorData = await response.json()
      errorMessage = errorData.message || errorData.error || errorMessage
    } catch {
      // If we can't parse error response, use default message
    }
    
    const error = new Error(errorMessage)
    error.status = response.status
    error.statusText = response.statusText
    error.response = response
    throw error
  }
  
  const contentType = response.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    return response.json()
  }
  
  return response.text()
}

/**
 * Handle API errors consistently
 * @param {Error} error - Error object
 * @param {string} context - Context where error occurred
 * @returns {Object} - Formatted error object
 */
export const handleAPIError = (error, context = 'API request') => {
  const errorInfo = {
    message: error.message || 'An unexpected error occurred',
    context,
    timestamp: new Date().toISOString(),
    originalError: error,
  }
  
  // Add status code if available
  if (error.status) {
    errorInfo.status = error.status
    errorInfo.statusText = error.statusText
  }
  
  // Log error for debugging
  console.error(`[${context}] Error:`, errorInfo)
  
  return errorInfo
}

/**
 * Create query string from object
 * @param {Object} params - Query parameters
 * @returns {string} - Query string
 */
export const createQueryString = (params) => {
  if (!params || typeof params !== 'object') return ''
  
  const searchParams = new URLSearchParams()
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(item => searchParams.append(key, item))
      } else {
        searchParams.append(key, value)
      }
    }
  })
  
  return searchParams.toString()
}

/**
 * Build full URL with query parameters
 * @param {string} baseURL - Base URL
 * @param {string} endpoint - API endpoint
 * @param {Object} params - Query parameters
 * @returns {string} - Full URL
 */
export const buildURL = (baseURL, endpoint, params = {}) => {
  const url = new URL(endpoint, baseURL)
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(item => url.searchParams.append(key, item))
      } else {
        url.searchParams.append(key, value)
      }
    }
  })
  
  return url.toString()
}

/**
 * Check if response indicates authentication failure
 * @param {Response} response - Fetch response object
 * @returns {boolean} - True if authentication failed
 */
export const isAuthError = (response) => {
  return response.status === 401 || response.status === 403
}

/**
 * Check if response indicates server error
 * @param {Response} response - Fetch response object
 * @returns {boolean} - True if server error
 */
export const isServerError = (response) => {
  return response.status >= 500
}

/**
 * Check if response indicates client error
 * @param {Response} response - Fetch response object
 * @returns {boolean} - True if client error
 */
export const isClientError = (response) => {
  return response.status >= 400 && response.status < 500
}

/**
 * Format error message for user display
 * @param {Error} error - Error object
 * @returns {string} - User-friendly error message
 */
export const formatErrorMessage = (error) => {
  if (error.status === 404) {
    return 'The requested resource was not found.'
  }
  
  if (error.status === 401) {
    return 'You are not authorized to perform this action. Please log in.'
  }
  
  if (error.status === 403) {
    return 'You do not have permission to perform this action.'
  }
  
  if (error.status === 422) {
    return 'The provided data is invalid. Please check your input and try again.'
  }
  
  if (error.status >= 500) {
    return 'A server error occurred. Please try again later.'
  }
  
  if (error.message.includes('Network error')) {
    return 'Unable to connect to the server. Please check your internet connection.'
  }
  
  return error.message || 'An unexpected error occurred. Please try again.'
}
