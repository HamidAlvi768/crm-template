// Helper utility functions for common operations

/**
 * Generate a unique ID
 * @param {string} prefix - Optional prefix for the ID
 * @returns {string} - Unique ID
 */
export const generateId = (prefix = 'id') => {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substr(2, 5)
  return `${prefix}_${timestamp}_${randomStr}`
}

/**
 * Generate a UUID v4
 * @returns {string} - UUID v4 string
 */
export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * Deep clone an object
 * @param {any} obj - Object to clone
 * @returns {any} - Cloned object
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime())
  if (obj instanceof Array) return obj.map(item => deepClone(item))
  if (typeof obj === 'object') {
    const clonedObj = {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
}

/**
 * Merge multiple objects deeply
 * @param {...Object} objects - Objects to merge
 * @returns {Object} - Merged object
 */
export const deepMerge = (...objects) => {
  const result = {}
  
  objects.forEach(obj => {
    if (obj && typeof obj === 'object') {
      Object.keys(obj).forEach(key => {
        if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
          result[key] = deepMerge(result[key] || {}, obj[key])
        } else {
          result[key] = obj[key]
        }
      })
    }
  })
  
  return result
}

/**
 * Check if two objects are deeply equal
 * @param {any} obj1 - First object
 * @param {any} obj2 - Second object
 * @returns {boolean} - True if objects are equal
 */
export const deepEqual = (obj1, obj2) => {
  if (obj1 === obj2) return true
  
  if (obj1 == null || obj2 == null) return false
  if (obj1.constructor !== obj2.constructor) return false
  
  if (obj1 instanceof Date && obj2 instanceof Date) {
    return obj1.getTime() === obj2.getTime()
  }
  
  if (obj1 instanceof Array && obj2 instanceof Array) {
    if (obj1.length !== obj2.length) return false
    for (let i = 0; i < obj1.length; i++) {
      if (!deepEqual(obj1[i], obj2[i])) return false
    }
    return true
  }
  
  if (typeof obj1 === 'object' && typeof obj2 === 'object') {
    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)
    
    if (keys1.length !== keys2.length) return false
    
    for (const key of keys1) {
      if (!keys2.includes(key)) return false
      if (!deepEqual(obj1[key], obj2[key])) return false
    }
    
    return true
  }
  
  return false
}

/**
 * Pick specific properties from an object
 * @param {Object} obj - Source object
 * @param {string[]} keys - Keys to pick
 * @returns {Object} - Object with picked properties
 */
export const pick = (obj, keys) => {
  const result = {}
  keys.forEach(key => {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key]
    }
  })
  return result
}

/**
 * Omit specific properties from an object
 * @param {Object} obj - Source object
 * @param {string[]} keys - Keys to omit
 * @returns {Object} - Object without omitted properties
 */
export const omit = (obj, keys) => {
  const result = {}
  Object.keys(obj).forEach(key => {
    if (!keys.includes(key)) {
      result[key] = obj[key]
    }
  })
  return result
}

/**
 * Flatten a nested object
 * @param {Object} obj - Object to flatten
 * @param {string} separator - Separator for nested keys
 * @returns {Object} - Flattened object
 */
export const flattenObject = (obj, separator = '.') => {
  const result = {}
  
  const flatten = (current, prefix = '') => {
    Object.keys(current).forEach(key => {
      const newKey = prefix ? `${prefix}${separator}${key}` : key
      
      if (current[key] && typeof current[key] === 'object' && !Array.isArray(current[key])) {
        flatten(current[key], newKey)
      } else {
        result[newKey] = current[key]
      }
    })
  }
  
  flatten(obj)
  return result
}

/**
 * Unflatten a flattened object
 * @param {Object} obj - Flattened object
 * @param {string} separator - Separator used for flattening
 * @returns {Object} - Unflattened object
 */
export const unflattenObject = (obj, separator = '.') => {
  const result = {}
  
  Object.keys(obj).forEach(key => {
    const keys = key.split(separator)
    let current = result
    
    keys.forEach((k, index) => {
      if (index === keys.length - 1) {
        current[k] = obj[key]
      } else {
        current[k] = current[k] || {}
        current = current[k]
      }
    })
  })
  
  return result
}

/**
 * Convert object keys to camelCase
 * @param {Object} obj - Object to convert
 * @returns {Object} - Object with camelCase keys
 */
export const toCamelCase = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(item => toCamelCase(item))
  }
  
  if (obj && typeof obj === 'object') {
    const result = {}
    Object.keys(obj).forEach(key => {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
      result[camelKey] = toCamelCase(obj[key])
    })
    return result
  }
  
  return obj
}

/**
 * Convert object keys to snake_case
 * @param {Object} obj - Object to convert
 * @returns {Object} - Object with snake_case keys
 */
export const toSnakeCase = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(item => toSnakeCase(item))
  }
  
  if (obj && typeof obj === 'object') {
    const result = {}
    Object.keys(obj).forEach(key => {
      const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
      result[snakeKey] = toSnakeCase(obj[key])
    })
    return result
  }
  
  return obj
}

/**
 * Group array items by a key
 * @param {Array} array - Array to group
 * @param {string|Function} key - Key or function to group by
 * @returns {Object} - Grouped object
 */
export const groupBy = (array, key) => {
  return array.reduce((groups, item) => {
    const groupKey = typeof key === 'function' ? key(item) : item[key]
    if (!groups[groupKey]) {
      groups[groupKey] = []
    }
    groups[groupKey].push(item)
    return groups
  }, {})
}

/**
 * Sort array by multiple criteria
 * @param {Array} array - Array to sort
 * @param {Array} criteria - Array of sort criteria
 * @returns {Array} - Sorted array
 */
export const sortByMultiple = (array, criteria) => {
  return array.sort((a, b) => {
    for (const criterion of criteria) {
      const { key, order = 'asc' } = criterion
      const aVal = a[key]
      const bVal = b[key]
      
      if (aVal < bVal) return order === 'asc' ? -1 : 1
      if (aVal > bVal) return order === 'asc' ? 1 : -1
    }
    return 0
  })
}

/**
 * Remove duplicate items from array
 * @param {Array} array - Array to deduplicate
 * @param {string|Function} key - Key or function to identify duplicates
 * @returns {Array} - Deduplicated array
 */
export const uniqueBy = (array, key) => {
  const seen = new Set()
  return array.filter(item => {
    const identifier = typeof key === 'function' ? key(item) : item[key]
    if (seen.has(identifier)) {
      return false
    }
    seen.add(identifier)
    return true
  })
}

/**
 * Chunk array into smaller arrays
 * @param {Array} array - Array to chunk
 * @param {number} size - Size of each chunk
 * @returns {Array} - Array of chunks
 */
export const chunk = (array, size) => {
  const chunks = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

/**
 * Debounce function execution
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
 * Throttle function execution
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
 * Sleep for a specified time
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} - Promise that resolves after sleep
 */
export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

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
      
      const delay = baseDelay * Math.pow(2, attempt - 1)
      await sleep(delay)
    }
  }
}

/**
 * Format bytes to human readable format
 * @param {number} bytes - Number of bytes
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted string
 */
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

/**
 * Check if value is empty (null, undefined, empty string, empty array, empty object)
 * @param {any} value - Value to check
 * @returns {boolean} - True if value is empty
 */
export const isEmpty = (value) => {
  if (value == null) return true
  if (typeof value === 'string') return value.trim().length === 0
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/**
 * Check if value is not empty
 * @param {any} value - Value to check
 * @returns {boolean} - True if value is not empty
 */
export const isNotEmpty = (value) => !isEmpty(value)

/**
 * Get nested object property safely
 * @param {Object} obj - Object to get property from
 * @param {string|Array} path - Property path
 * @param {any} defaultValue - Default value if property doesn't exist
 * @returns {any} - Property value or default value
 */
export const get = (obj, path, defaultValue = undefined) => {
  const keys = Array.isArray(path) ? path : path.split('.')
  let result = obj
  
  for (const key of keys) {
    if (result == null || typeof result !== 'object') {
      return defaultValue
    }
    result = result[key]
  }
  
  return result !== undefined ? result : defaultValue
}

/**
 * Set nested object property safely
 * @param {Object} obj - Object to set property on
 * @param {string|Array} path - Property path
 * @param {any} value - Value to set
 * @returns {Object} - Modified object
 */
export const set = (obj, path, value) => {
  const keys = Array.isArray(path) ? path : path.split('.')
  const result = { ...obj }
  let current = result
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {}
    }
    current = current[key]
  }
  
  current[keys[keys.length - 1]] = value
  return result
}

export default {
  generateId,
  generateUUID,
  deepClone,
  deepMerge,
  deepEqual,
  pick,
  omit,
  flattenObject,
  unflattenObject,
  toCamelCase,
  toSnakeCase,
  groupBy,
  sortByMultiple,
  uniqueBy,
  chunk,
  debounce,
  throttle,
  sleep,
  retryWithBackoff,
  formatBytes,
  isEmpty,
  isNotEmpty,
  get,
  set,
}
