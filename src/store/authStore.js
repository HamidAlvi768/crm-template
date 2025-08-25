import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Authentication state interface
const initialState = {
  // User authentication state
  isAuthenticated: false,
  user: null,
  token: null,
  
  // Loading states
  isLoading: false,
  isInitializing: true,
  
  // Error handling
  error: null,
  
  // Session management
  lastActivity: null,
  sessionTimeout: 30 * 60 * 1000, // 30 minutes
}

// Authentication store
export const useAuthStore = create(
  persist(
    (set, get) => ({
      ...initialState,
      
      // Actions
      login: async (credentials) => {
        set({ isLoading: true, error: null })
        try {
          // TODO: Implement actual API call
          // const response = await authAPI.login(credentials)
          
          // Mock response for now
          const mockUser = {
            id: 1,
            email: credentials.email,
            firstName: 'John',
            lastName: 'Doe',
            role: 'admin',
            permissions: ['read', 'write', 'delete']
          }
          
          const mockToken = 'mock-jwt-token-' + Date.now()
          
          set({
            isAuthenticated: true,
            user: mockUser,
            token: mockToken,
            isLoading: false,
            lastActivity: Date.now(),
            error: null
          })
          
          return { success: true, user: mockUser }
        } catch (error) {
          set({
            isLoading: false,
            error: error.message || 'Login failed'
          })
          throw error
        }
      },
      
      logout: () => {
        set({
          ...initialState,
          isInitializing: false
        })
      },
      
      refreshToken: async () => {
        const { token } = get()
        if (!token) return false
        
        set({ isLoading: true })
        try {
          // TODO: Implement actual token refresh
          // const response = await authAPI.refreshToken(token)
          
          // Mock successful refresh
          set({
            isLoading: false,
            lastActivity: Date.now(),
            error: null
          })
          
          return true
        } catch (error) {
          set({
            isLoading: false,
            error: 'Token refresh failed'
          })
          // Auto logout on refresh failure
          get().logout()
          return false
        }
      },
      
      updateUser: (userData) => {
        set({ user: { ...get().user, ...userData } })
      },
      
      clearError: () => {
        set({ error: null })
      },
      
      setLoading: (loading) => {
        set({ isLoading: loading })
      },
      
      checkSession: () => {
        const { lastActivity, sessionTimeout, isAuthenticated } = get()
        
        if (!isAuthenticated) return false
        
        const now = Date.now()
        const timeSinceLastActivity = now - lastActivity
        
        if (timeSinceLastActivity > sessionTimeout) {
          // Session expired
          get().logout()
          return false
        }
        
        // Update last activity
        set({ lastActivity: now })
        return true
      },
      
      reset: () => {
        set(initialState)
      }
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({
        // Only persist these fields
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
        lastActivity: state.lastActivity
      })
    }
  )
)
