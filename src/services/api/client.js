// API client configuration and setup
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
const API_TIMEOUT = 30000 // 30 seconds

// Default headers
const getDefaultHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
  
  // Add auth token if available
  const token = localStorage.getItem('auth-storage')
  if (token) {
    try {
      const authData = JSON.parse(token)
      if (authData.state?.token) {
        headers['Authorization'] = `Bearer ${authData.state.token}`
      }
    } catch (error) {
      console.warn('Failed to parse auth token:', error)
    }
  }
  
  return headers
}

// Request timeout utility
const timeoutPromise = (ms) => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Request timeout')), ms)
  })
}

// Main API client
class ApiClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL
  }
  
  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: getDefaultHeaders(),
      ...options,
    }
    
    try {
      // Add timeout to fetch
      const fetchPromise = fetch(url, config)
      const response = await Promise.race([
        fetchPromise,
        timeoutPromise(API_TIMEOUT)
      ])
      
      // Handle HTTP errors
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`)
      }
      
      // Parse response
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        return await response.json()
      }
      
      return await response.text()
    } catch (error) {
      // Handle network errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to server')
      }
      
      // Re-throw other errors
      throw error
    }
  }
  
  // GET request
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const url = queryString ? `${endpoint}?${queryString}` : endpoint
    
    return this.request(url, {
      method: 'GET',
    })
  }
  
  // POST request
  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
  
  // PUT request
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }
  
  // PATCH request
  async patch(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }
  
  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    })
  }
  
  // File upload
  async upload(endpoint, file, onProgress) {
    const formData = new FormData()
    formData.append('file', file)
    
    const headers = getDefaultHeaders()
    delete headers['Content-Type'] // Let browser set content-type for FormData
    
    return this.request(endpoint, {
      method: 'POST',
      headers,
      body: formData,
    })
  }
  
  // Set base URL
  setBaseURL(baseURL) {
    this.baseURL = baseURL
  }
  
  // Get base URL
  getBaseURL() {
    return this.baseURL
  }
}

// Create and export default instance
const apiClient = new ApiClient()

// Export both the class and instance
export { ApiClient, apiClient as default }
