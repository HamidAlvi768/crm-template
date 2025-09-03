import { create } from 'zustand';
import { usersApi } from '../services/api/users';

export const useUserStore = create((set, get) => ({
  users: [],
  loading: false,
  error: null,
  
  // Set loading state
  setLoading: (loading) => set({ loading }),
  
  // Set error state
  setError: (error) => set({ error }),
  
  // Clear error
  clearError: () => set({ error: null }),
  
  // Fetch all users from API
  fetchUsers: async () => {
    try {
      set({ loading: true, error: null });
      const response = await usersApi.getUsers();
      
      if (response.success) {
        set({ users: response.data });
      } else {
        set({ error: response.message || 'Failed to fetch users' });
      }
      
      return response;
        } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch users';
      set({ error: errorMessage });
      throw new Error(errorMessage);
    } finally {
      set({ loading: false });
    }
  },
  
  // Get user by ID from API
  getUser: async (id) => {
    try {
      set({ loading: true, error: null });
      const response = await usersApi.getUser(id);
      
      if (response.success) {
        return response.data;
      } else {
        set({ error: response.message || 'Failed to fetch user' });
        return null;
      }
        } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch user';
      set({ error: errorMessage });
      throw new Error(errorMessage);
    } finally {
      set({ loading: false });
    }
  },
  
  // Create new user via API
  addUser: async (userData) => {
    try {
      set({ loading: true, error: null });
      const response = await usersApi.createUser(userData);
      
      if (response.success) {
        set({ users: [...get().users, response.data] });
        return response;
      } else {
        set({ error: response.message || 'Failed to create user' });
        return response;
      }
        } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create user';
      set({ error: errorMessage });
      throw new Error(errorMessage);
    } finally {
      set({ loading: false });
    }
  },
  
  // Update user via API
  updateUser: async (id, updates) => {
    try {
      set({ loading: true, error: null });
      const response = await usersApi.updateUser(id, updates);
      
      if (response.success) {
        set({
          users: get().users.map(u => 
            u.id === id ? { ...u, ...updates } : u
          )
        });
        return response;
      } else {
        set({ error: response.message || 'Failed to update user' });
        return response;
      }
        } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update user';
      set({ error: errorMessage });
      throw new Error(errorMessage);
    } finally {
      set({ loading: false });
    }
  },
  
  // Delete user via API
  deleteUser: async (id) => {
    try {
      set({ loading: true, error: null });
      const response = await usersApi.deleteUser(id);
      
      if (response.success) {
        set({ 
          users: get().users.filter(u => u.id !== id)
        });
        return response;
        } else {
        set({ error: response.message || 'Failed to delete user' });
        return response;
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to delete user';
      set({ error: errorMessage });
      throw new Error(errorMessage);
    } finally {
      set({ loading: false });
    }
  },
  
  // Search users via API
  searchUsers: async (query) => {
    try {
      set({ loading: true, error: null });
      const response = await usersApi.searchUsers(query);
      
      if (response.success) {
        set({ users: response.data });
      } else {
        set({ error: response.message || 'Failed to search users' });
      }
      
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to search users';
      set({ error: errorMessage });
      throw new Error(errorMessage);
    } finally {
      set({ loading: false });
    }
  },
  
  // Reset store to initial state
  reset: () => set({ users: [], loading: false, error: null })
}));
