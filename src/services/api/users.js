import apiClient from './client'

// Users API endpoints
const USER_ENDPOINTS = {
  USERS: '/users',
  USER_BY_ID: (id) => `/users/${id}`,
  USER_PROFILE: '/users/profile',
  USER_AVATAR: (id) => `/users/${id}/avatar`,
  USER_PERMISSIONS: (id) => `/users/${id}/permissions`,
  USER_ROLES: (id) => `/users/${id}/roles`,
  BULK_OPERATIONS: '/users/bulk',
}

// Users service
export const userAPI = {
  // Get all users with pagination and filters
  async getUsers(params = {}) {
    try {
      const response = await apiClient.get(USER_ENDPOINTS.USERS, params)
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch users')
    }
  },
  
  // Get user by ID
  async getUserById(userId) {
    try {
      const response = await apiClient.get(USER_ENDPOINTS.USER_BY_ID(userId))
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch user')
    }
  },
  
  // Create new user
  async createUser(userData) {
    try {
      const response = await apiClient.post(USER_ENDPOINTS.USERS, userData)
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to create user')
    }
  },
  
  // Update user
  async updateUser(userId, userData) {
    try {
      const response = await apiClient.put(USER_ENDPOINTS.USER_BY_ID(userId), userData)
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to update user')
    }
  },
  
  // Delete user
  async deleteUser(userId) {
    try {
      const response = await apiClient.delete(USER_ENDPOINTS.USER_BY_ID(userId))
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to delete user')
    }
  },
  
  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await apiClient.put(USER_ENDPOINTS.USER_PROFILE, profileData)
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to update profile')
    }
  },
  
  // Upload user avatar
  async uploadAvatar(userId, file) {
    try {
      const response = await apiClient.upload(USER_ENDPOINTS.USER_AVATAR(userId), file)
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to upload avatar')
    }
  },
  
  // Get user permissions
  async getUserPermissions(userId) {
    try {
      const response = await apiClient.get(USER_ENDPOINTS.USER_PERMISSIONS(userId))
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch user permissions')
    }
  },
  
  // Update user permissions
  async updateUserPermissions(userId, permissions) {
    try {
      const response = await apiClient.put(USER_ENDPOINTS.USER_PERMISSIONS(userId), permissions)
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to update user permissions')
    }
  },
  
  // Get user roles
  async getUserRoles(userId) {
    try {
      const response = await apiClient.get(USER_ENDPOINTS.USER_ROLES(userId))
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch user roles')
    }
  },
  
  // Update user roles
  async updateUserRoles(userId, roles) {
    try {
      const response = await apiClient.put(USER_ENDPOINTS.USER_ROLES(userId), roles)
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to update user roles')
    }
  },
  
  // Bulk operations (delete, update status, etc.)
  async bulkOperation(operation, userIds, data = {}) {
    try {
      const response = await apiClient.post(USER_ENDPOINTS.BULK_OPERATIONS, {
        operation,
        userIds,
        data
      })
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to perform bulk operation')
    }
  },
  
  // Search users
  async searchUsers(query, filters = {}) {
    try {
      const params = { q: query, ...filters }
      const response = await apiClient.get(USER_ENDPOINTS.USERS, params)
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to search users')
    }
  },
  
  // Get users by department
  async getUsersByDepartment(department) {
    try {
      const response = await apiClient.get(USER_ENDPOINTS.USERS, { department })
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch users by department')
    }
  },
  
  // Get users by role
  async getUsersByRole(role) {
    try {
      const response = await apiClient.get(USER_ENDPOINTS.USERS, { role })
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch users by role')
    }
  },
  
  // Get users statistics
  async getUserStats() {
    try {
      const response = await apiClient.get(`${USER_ENDPOINTS.USERS}/stats`)
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch user statistics')
    }
  }
}

export default userAPI
