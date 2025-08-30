import apiClient from './client';

export const usersApi = {
  // Get all users
  getUsers: async () => {
    const response = await apiClient.get('/users');
    return response.data;
  },

  // Get user by ID
  getUser: async (id) => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  // Create new user
  createUser: async (userData) => {
    const response = await apiClient.post('/users', userData);
    return response.data;
  },

  // Update user
  updateUser: async (id, userData) => {
    const response = await apiClient.put(`/users/${id}`, userData);
    return response.data;
  },

  // Delete user
  deleteUser: async (id) => {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  },

  // Search users
  searchUsers: async (query) => {
    const response = await apiClient.get('/users/search', { params: query });
    return response.data;
  }
};
