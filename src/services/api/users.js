import apiClient from './client';

export const usersApi = {
  // Get all users
  getUsers: async () => {
    const response = await apiClient.get('/users');
    return response;
  },
  
  // Get user by ID
  getUser: async (id) => {
    const response = await apiClient.get(`/users/${id}`);
    return response;
  },
  
  // Create new user
  createUser: async (userData) => {
    const response = await apiClient.post('/users', userData);
    return response;
  },
  
  // Update user
  updateUser: async (id, userData) => {
    const response = await apiClient.put(`/users/${id}`, userData);
    return response;
  },
  
  // Delete user
  deleteUser: async (id) => {
    const response = await apiClient.delete(`/users/${id}`);
    return response;
  },
  
  // Search users
  searchUsers: async (query) => {
    const response = await apiClient.get('/users/search', { params: query });
    return response;
  }
};
