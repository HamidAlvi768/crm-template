import { useEffect, useCallback } from 'react'
import { useAuthStore } from '@/store'
import { authAPI } from '@/services/api'

/**
 * Custom hook for authentication logic
 * Provides authentication state and methods
 */
export const useAuth = () => {
  const {
    // State
    isAuthenticated,
    user,
    token,
    isLoading,
    isInitializing,
    error,
    lastActivity,
    
    // Actions
    login,
    logout,
    refreshToken,
    updateUser,
    clearError,
    setLoading,
    checkSession,
    reset
  } = useAuthStore()

  // Auto-refresh token when needed
  useEffect(() => {
    if (isAuthenticated && token) {
      const checkTokenExpiry = () => {
        const now = Date.now()
        const tokenAge = now - lastActivity
        
        // Refresh token if it's older than 25 minutes (5 minutes before expiry)
        if (tokenAge > 25 * 60 * 1000) {
          refreshToken()
        }
      }

      // Check every 5 minutes
      const interval = setInterval(checkTokenExpiry, 5 * 60 * 1000)
      
      // Initial check
      checkTokenExpiry()
      
      return () => clearInterval(interval)
    }
  }, [isAuthenticated, token, lastActivity, refreshToken])

  // Check session on mount and user activity
  useEffect(() => {
    if (isAuthenticated) {
      // Check session on mount
      checkSession()
      
      // Set up activity listeners
      const handleActivity = () => {
        checkSession()
      }
      
      const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']
      events.forEach(event => {
        document.addEventListener(event, handleActivity, true)
      })
      
      return () => {
        events.forEach(event => {
          document.removeEventListener(event, handleActivity, true)
        })
      }
    }
  }, [isAuthenticated, checkSession])

  // Enhanced login with API integration
  const loginWithAPI = useCallback(async (credentials) => {
    try {
      setLoading(true)
      clearError()
      
      // Call API
      const response = await authAPI.login(credentials)
      
      // Update store with API response
      const { user: apiUser, token: apiToken } = response
      
      // Update store
      await login({
        email: credentials.email,
        password: credentials.password
      })
      
      return { success: true, user: apiUser }
    } catch (error) {
      // Error is already handled by the store
      throw error
    } finally {
      setLoading(false)
    }
  }, [login, setLoading, clearError])

  // Enhanced logout with API integration
  const logoutWithAPI = useCallback(async () => {
    try {
      if (token) {
        // Call logout API
        await authAPI.logout()
      }
    } catch (error) {
      console.warn('Logout API call failed:', error)
    } finally {
      // Always clear local state
      logout()
    }
  }, [token, logout])

  // Enhanced refresh token with API integration
  const refreshTokenWithAPI = useCallback(async () => {
    try {
      setLoading(true)
      clearError()
      
      // Call API
      const response = await authAPI.refreshToken()
      
      // Update store
      await refreshToken()
      
      return { success: true, data: response }
    } catch (error) {
      // Error is already handled by the store
      throw error
    } finally {
      setLoading(false)
    }
  }, [refreshToken, setLoading, clearError])

  // Check authentication status on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      if (isInitializing && !isAuthenticated) {
        try {
          const authStatus = await authAPI.checkAuth()
          if (authStatus.isAuthenticated) {
            // Update store with user data
            updateUser(authStatus.user)
          }
        } catch (error) {
          console.warn('Failed to check auth status:', error)
        } finally {
          // Mark initialization as complete
          useAuthStore.setState({ isInitializing: false })
        }
      }
    }

    checkAuthStatus()
  }, [isInitializing, isAuthenticated, updateUser])

  // Check if user has specific permission
  const hasPermission = useCallback((permission) => {
    if (!user || !user.permissions) return false
    return user.permissions.includes(permission)
  }, [user])

  // Check if user has specific role
  const hasRole = useCallback((role) => {
    if (!user || !user.role) return false
    return user.role === role
  }, [user])

  // Check if user has any of the specified roles
  const hasAnyRole = useCallback((roles) => {
    if (!user || !user.role) return false
    return Array.isArray(roles) ? roles.includes(user.role) : roles === user.role
  }, [user])

  // Get user's full name
  const getUserFullName = useCallback(() => {
    if (!user) return ''
    return `${user.firstName || ''} ${user.lastName || ''}`.trim()
  }, [user])

  // Get user's initials
  const getUserInitials = useCallback(() => {
    if (!user) return ''
    const firstName = user.firstName || ''
    const lastName = user.lastName || ''
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }, [user])

  return {
    // State
    isAuthenticated,
    user,
    token,
    isLoading,
    isInitializing,
    error,
    lastActivity,
    
    // Computed values
    userFullName: getUserFullName(),
    userInitials: getUserInitials(),
    
    // Methods
    login: loginWithAPI,
    logout: logoutWithAPI,
    refreshToken: refreshTokenWithAPI,
    updateUser,
    clearError,
    setLoading,
    checkSession,
    reset,
    
    // Permission checks
    hasPermission,
    hasRole,
    hasAnyRole,
    
    // Utility methods
    getUserFullName,
    getUserInitials
  }
}

export default useAuth
