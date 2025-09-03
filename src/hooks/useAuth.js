import { useEffect, useCallback } from 'react'
import { useAuthStore } from '@/store/authStore'

/**
 * Custom hook for authentication logic
 * Provides authentication state and methods with centralized logic
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
    checkAuth,
    getProfile,
    updateProfile,
    changePassword,
    forgotPassword,
    clearError,
    updateActivity
  } = useAuthStore()

  // Auto-refresh token when needed
  useEffect(() => {
    if (isAuthenticated && token) {
      const checkTokenExpiry = () => {
        const now = Date.now()
        const tokenAge = now - lastActivity
        
        // Refresh token if it's older than 25 minutes (5 minutes before expiry)
        if (tokenAge > 25 * 60 * 1000) {
          // For now, just update activity - implement refresh logic later
          updateActivity()
        }
      }

      // Check every 5 minutes
      const interval = setInterval(checkTokenExpiry, 5 * 60 * 1000)
      
      // Initial check
      checkTokenExpiry()
      
      return () => clearInterval(interval)
    }
  }, [isAuthenticated, token, lastActivity, updateActivity])

  // Check session on mount and user activity
  useEffect(() => {
    if (isAuthenticated) {
      // Set up activity listeners
      const handleActivity = () => {
        updateActivity()
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
  }, [isAuthenticated, updateActivity])

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

  // Get user's display name
  const getUserDisplayName = useCallback(() => {
    if (!user) return ''
    return user.username || user.email || 'User'
  }, [user])

  // Get user's initials
  const getUserInitials = useCallback(() => {
    if (!user) return ''
    const username = user.username || user.email || ''
    if (username) {
      // For username, take first two characters
      return username.substring(0, 2).toUpperCase()
    }
    return 'U' // Default fallback
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
    userDisplayName: getUserDisplayName(),
    userInitials: getUserInitials(),
    
    // Methods
    login,
    logout,
    checkAuth,
    getProfile,
    updateProfile,
    changePassword,
    forgotPassword,
    clearError,
    updateActivity,
    
    // Permission checks
    hasPermission,
    hasRole,
    hasAnyRole,
    
    // Utility methods
    getUserDisplayName,
    getUserInitials
  }
}

export default useAuth
