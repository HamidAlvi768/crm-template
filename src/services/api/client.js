// Unified API client with integrated authentication methods
import axios from 'axios'
import { formatErrorMessage } from '../utils/apiUtils'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/php-crud/api'
const API_TIMEOUT = 30000 // 30 seconds

// Authentication endpoints
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

// Get auth token from localStorage
const getAuthToken = () => {
  try {
    const authStorage = localStorage.getItem('auth-storage')
    if (!authStorage) {
      console.debug('No auth storage found in localStorage')
      return null
    }
    
    const authData = JSON.parse(authStorage)
    console.debug('Auth storage data:', authData)
    
    // Check if token exists in the persisted state
    if (authData.token) {
      console.debug('Token found in authData.token:', authData.token.substring(0, 10) + '...')
      return authData.token
    }
    
    // Fallback for old structure (if any)
    if (authData.state?.token) {
      console.debug('Token found in authData.state.token:', authData.state.token.substring(0, 10) + '...')
      return authData.state.token
    }
    
    console.debug('No token found in auth storage')
    return null
  } catch (error) {
    console.warn('Failed to parse auth token:', error)
    return null
  }
}

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
})

// Request interceptor - automatically add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken()
  if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('Request interceptor error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor - handle errors and format responses
axiosInstance.interceptors.response.use(
  (response) => {
    // Return the response data directly (axios wraps it in .data)
    return response.data
  },
  (error) => {
    // Handle authentication errors
    if (error.response?.status === 401) {
      console.warn('Authentication failed for endpoint:', error.config?.url)
      console.warn('Current token:', getAuthToken() ? 'Present' : 'Missing')
      
      // Clear auth storage and redirect to login
      localStorage.removeItem('auth-storage')
      window.location.href = '/login'
      
      const authError = new Error('Authentication required. Please login again.')
      authError.status = 401
      return Promise.reject(authError)
    }
    
    // Handle network errors
    if (!error.response) {
      const networkError = new Error('Network error: Unable to connect to server')
      networkError.status = 0
      networkError.originalError = error
      return Promise.reject(networkError)
    }
    
    // Format other errors with user-friendly messages
    const formattedError = new Error(formatErrorMessage(error))
    formattedError.originalError = error
    formattedError.status = error.response?.status
    formattedError.statusText = error.response?.statusText
    return Promise.reject(formattedError)
  }
)

// Unified API client with integrated authentication methods
const apiClient = {
  // Core HTTP methods
  get: (endpoint, params = {}) => axiosInstance.get(endpoint, { params }),
  post: (endpoint, data = {}) => axiosInstance.post(endpoint, data),
  put: (endpoint, data = {}) => axiosInstance.put(endpoint, data),
  patch: (endpoint, data = {}) => axiosInstance.patch(endpoint, data),
  delete: (endpoint) => axiosInstance.delete(endpoint),

  // Authentication methods
  auth: {
    // Login user
    login: (credentials) => axiosInstance.post(AUTH_ENDPOINTS.LOGIN, credentials),
    
    // Register new user
    register: (userData) => axiosInstance.post(AUTH_ENDPOINTS.REGISTER, userData),
    
    // Logout user
    logout: async () => {
      try {
        return await axiosInstance.post(AUTH_ENDPOINTS.LOGOUT)
    } catch (error) {
        // Even if logout fails on server, we should clear local state
        console.warn('Logout API call failed:', error)
        return { success: true }
      }
    },
    
    // Refresh access token
    refreshToken: () => axiosInstance.post(AUTH_ENDPOINTS.REFRESH),
    
    // Get user profile
    getProfile: () => axiosInstance.get(AUTH_ENDPOINTS.PROFILE),
    
    // Update user profile
    updateProfile: (profileData) => axiosInstance.put(AUTH_ENDPOINTS.PROFILE, profileData),
    
    // Change password
    changePassword: (passwordData) => axiosInstance.post(AUTH_ENDPOINTS.CHANGE_PASSWORD, passwordData),
    
    // Forgot password
    forgotPassword: (email) => axiosInstance.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, { email }),
    
    // Reset password
    resetPassword: (token, newPassword) => axiosInstance.post(AUTH_ENDPOINTS.RESET_PASSWORD, {
      token,
      password: newPassword
    }),
    
    // Verify email
    verifyEmail: (token) => axiosInstance.post(AUTH_ENDPOINTS.VERIFY_EMAIL, { token }),
    
    // Check if user is authenticated
    checkAuth: async () => {
      try {
        const response = await axiosInstance.get(AUTH_ENDPOINTS.PROFILE)
        return { isAuthenticated: true, user: response }
      } catch (error) {
        return { isAuthenticated: false, user: null }
      }
    }
  },
  
  // File upload
  upload: (endpoint, file, onProgress) => {
    const formData = new FormData()
    formData.append('file', file)
    
    return axiosInstance.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: onProgress
    })
  },

  // Utility methods
  setBaseURL: (baseURL) => {
    axiosInstance.defaults.baseURL = baseURL
  },
  
  getBaseURL: () => axiosInstance.defaults.baseURL
}

// Export both the unified client and the raw axios instance
export default apiClient
export { axiosInstance }
