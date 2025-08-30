import { useState, useEffect, useCallback } from 'react'

/**
 * Custom hook for managing localStorage
 * Provides type-safe localStorage operations with error handling
 */
export const useLocalStorage = (key, initialValue) => {
  // Get initial value from localStorage or use provided initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback((value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      
      // Save state
      setStoredValue(valueToStore)
      
      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  // Remove item from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)
      window.localStorage.removeItem(key)
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  // Clear all localStorage
  const clearAll = useCallback(() => {
    try {
      window.localStorage.clear()
      setStoredValue(initialValue)
    } catch (error) {
      console.warn('Error clearing localStorage:', error)
    }
  }, [initialValue])

  // Get all localStorage keys
  const getAllKeys = useCallback(() => {
    try {
      return Object.keys(window.localStorage)
    } catch (error) {
      console.warn('Error getting localStorage keys:', error)
      return []
    }
  }, [])

  // Check if a key exists
  const hasKey = useCallback((checkKey) => {
    try {
      return window.localStorage.hasOwnProperty(checkKey)
    } catch (error) {
      console.warn(`Error checking localStorage key "${checkKey}":`, error)
      return false
    }
  }, [])

  // Get item size in bytes
  const getItemSize = useCallback((checkKey) => {
    try {
      const item = window.localStorage.getItem(checkKey)
      return item ? new Blob([item]).size : 0
    } catch (error) {
      console.warn(`Error getting localStorage item size for "${checkKey}":`, error)
      return 0
    }
  }, [])

  // Get total localStorage size
  const getTotalSize = useCallback(() => {
    try {
      let totalSize = 0
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i)
        if (key) {
          totalSize += getItemSize(key)
        }
      }
      return totalSize
    } catch (error) {
      console.warn('Error calculating total localStorage size:', error)
      return 0
    }
  }, [getItemSize])

  // Listen for storage changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue))
        } catch (error) {
          console.warn(`Error parsing localStorage value for key "${key}":`, error)
        }
      } else if (e.key === key && e.newValue === null) {
        // Key was removed
        setStoredValue(initialValue)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key, initialValue])

  // Cleanup on unmount (optional)
  useEffect(() => {
    return () => {
      // Any cleanup logic can go here
    }
  }, [])

  return {
    value: storedValue,
    setValue,
    removeValue,
    clearAll,
    getAllKeys,
    hasKey,
    getItemSize,
    getTotalSize
  }
}

/**
 * Hook for managing multiple localStorage values
 * Useful when you need to manage related localStorage items
 */
export const useLocalStorageGroup = (keys, initialValues = {}) => {
  const [values, setValues] = useState(() => {
    const initial = {}
    keys.forEach(key => {
      try {
        const item = window.localStorage.getItem(key)
        initial[key] = item ? JSON.parse(item) : (initialValues[key] || null)
      } catch (error) {
        console.warn(`Error reading localStorage key "${key}":`, error)
        initial[key] = initialValues[key] || null
      }
    })
    return initial
  })

  const setValue = useCallback((key, value) => {
    if (!keys.includes(key)) {
      console.warn(`Key "${key}" is not part of this localStorage group`)
      return
    }

    try {
      const valueToStore = value instanceof Function ? value(values[key]) : value
      
      setValues(prev => ({ ...prev, [key]: valueToStore }))
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }, [keys, values])

  const setMultipleValues = useCallback((newValues) => {
    try {
      const updatedValues = { ...values }
      
      Object.entries(newValues).forEach(([key, value]) => {
        if (keys.includes(key)) {
          const valueToStore = value instanceof Function ? value(values[key]) : value
          updatedValues[key] = valueToStore
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
        }
      })
      
      setValues(updatedValues)
    } catch (error) {
      console.warn('Error setting multiple localStorage values:', error)
    }
  }, [keys, values])

  const removeValue = useCallback((key) => {
    if (!keys.includes(key)) {
      console.warn(`Key "${key}" is not part of this localStorage group`)
      return
    }

    try {
      setValues(prev => ({ ...prev, [key]: initialValues[key] || null }))
      window.localStorage.removeItem(key)
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error)
    }
  }, [keys, initialValues])

  const clearGroup = useCallback(() => {
    try {
      keys.forEach(key => {
        window.localStorage.removeItem(key)
      })
      setValues(initialValues)
    } catch (error) {
      console.warn('Error clearing localStorage group:', error)
    }
  }, [keys, initialValues])

  return {
    values,
    setValue,
    setMultipleValues,
    removeValue,
    clearGroup
  }
}

export default useLocalStorage
