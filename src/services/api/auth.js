import apiClient from './client'

// Authentication API endpoints
const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
  CHANGE_PASSWORD: '/auth/change-password',
  PROFILE: '/auth/profile',
}

// Authentication service
export const authAPI = {
  // Login user
  async login(credentials) {
    try {
      const response = await apiClient.post(AUTH_ENDPOINTS.LOGIN, credentials)
      return response
    } catch (error) {
      throw new Error(error.message || 'Login failed')
    }
  },
  
  // Register new user
  async register(userData) {
    try {
      const response = await apiClient.post(AUTH_ENDPOINTS.REGISTER, userData)
      return response
    } catch (error) {
      throw new Error(error.message || 'Registration failed')
    }
  },
  
  // Logout user
  async logout() {
    try {
      const response = await apiClient.post(AUTH_ENDPOINTS.LOGOUT)
      return response
    } catch (error) {
      // Even if logout fails on server, we should clear local state
      console.warn('Logout API call failed:', error)
      return { success: true }
    }
  },
  
  // Refresh access token
  async refreshToken() {
    try {
      const response = await apiClient.post(AUTH_ENDPOINTS.REFRESH)
      return response
    } catch (error) {
      throw new Error(error.message || 'Token refresh failed')
    }
  },
  
  // Get user profile
  async getProfile() {
    try {
      const response = await apiClient.get(AUTH_ENDPOINTS.PROFILE)
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch profile')
    }
  },
  
  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await apiClient.put(AUTH_ENDPOINTS.PROFILE, profileData)
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to update profile')
    }
  },
  
  // Change password
  async changePassword(passwordData) {
    try {
      const response = await apiClient.post(AUTH_ENDPOINTS.CHANGE_PASSWORD, passwordData)
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to change password')
    }
  },
  
  // Forgot password
  async forgotPassword(email) {
    try {
      const response = await apiClient.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, { email })
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to send reset email')
    }
  },
  
  // Reset password
  async resetPassword(token, newPassword) {
    try {
      const response = await apiClient.post(AUTH_ENDPOINTS.RESET_PASSWORD, {
        token,
        password: newPassword
      })
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to reset password')
    }
  },
  
  // Verify email
  async verifyEmail(token) {
    try {
      const response = await apiClient.post(AUTH_ENDPOINTS.VERIFY_EMAIL, { token })
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to verify email')
    }
  },
  
  // Check if user is authenticated
  async checkAuth() {
    try {
      const response = await apiClient.get(AUTH_ENDPOINTS.PROFILE)
      return { isAuthenticated: true, user: response }
    } catch (error) {
      return { isAuthenticated: false, user: null }
    }
  }
}

export default authAPI
