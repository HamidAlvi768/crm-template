import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Custom hook for debouncing values
 * Useful for search inputs, API calls, and other operations that should be delayed
 */
export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  const timeoutRef = useRef(null)

  useEffect(() => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [value, delay])

  // Function to immediately update the debounced value
  const flush = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setDebouncedValue(value)
  }, [value])

  // Function to cancel the current debounce
  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return {
    debouncedValue,
    flush,
    cancel,
    isPending: debouncedValue !== value
  }
}

/**
 * Hook for debouncing function calls
 * Useful when you want to debounce the execution of a function
 */
export const useDebouncedCallback = (callback, delay = 500) => {
  const timeoutRef = useRef(null)
  const callbackRef = useRef(callback)

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const debouncedCallback = useCallback((...args) => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      callbackRef.current(...args)
    }, delay)
  }, [delay])

  // Function to immediately execute the callback
  const flush = useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    callbackRef.current(...args)
  }, [])

  // Function to cancel the current debounce
  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {
    debouncedCallback,
    flush,
    cancel
  }
}

/**
 * Hook for debouncing async function calls
 * Useful when you want to debounce API calls or other async operations
 */
export const useDebouncedAsyncCallback = (asyncCallback, delay = 500) => {
  const timeoutRef = useRef(null)
  const callbackRef = useRef(asyncCallback)
  const [isPending, setIsPending] = useState(false)

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = asyncCallback
  }, [asyncCallback])

  const debouncedCallback = useCallback(async (...args) => {
    return new Promise((resolve, reject) => {
      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // Set new timeout
      timeoutRef.current = setTimeout(async () => {
        try {
          setIsPending(true)
          const result = await callbackRef.current(...args)
          resolve(result)
        } catch (error) {
          reject(error)
        } finally {
          setIsPending(false)
        }
      }, delay)
    })
  }, [delay])

  // Function to immediately execute the callback
  const flush = useCallback(async (...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    try {
      setIsPending(true)
      const result = await callbackRef.current(...args)
      return result
    } finally {
      setIsPending(false)
    }
  }, [])

  // Function to cancel the current debounce
  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {
    debouncedCallback,
    flush,
    cancel,
    isPending
  }
}

/**
 * Hook for debouncing multiple values
 * Useful when you need to debounce multiple related values
 */
export const useDebouncedValues = (values, delay = 500) => {
  const [debouncedValues, setDebouncedValues] = useState(values)
  const timeoutRef = useRef(null)

  useEffect(() => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      setDebouncedValues(values)
    }, delay)

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [values, delay])

  // Function to immediately update the debounced values
  const flush = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setDebouncedValues(values)
  }, [values])

  // Function to cancel the current debounce
  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return {
    debouncedValues,
    flush,
    cancel,
    isPending: JSON.stringify(debouncedValues) !== JSON.stringify(values)
  }
}

export default useDebounce
