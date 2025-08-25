// Export all API services
export { default as authAPI } from './auth'
export { default as userAPI } from './users'
export { default as productAPI } from './products'

// Export API client
export { default as apiClient, ApiClient } from './client'

// API configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
}

// API utility functions
export const createAPIEndpoint = (basePath) => {
  return {
    list: (params) => `${basePath}?${new URLSearchParams(params).toString()}`,
    detail: (id) => `${basePath}/${id}`,
    create: () => basePath,
    update: (id) => `${basePath}/${id}`,
    delete: (id) => `${basePath}/${id}`,
    bulk: () => `${basePath}/bulk`,
  }
}
