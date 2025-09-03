import { create } from "zustand";
import { persist } from "zustand/middleware";
import apiClient from "../services/api/client";

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
};

// Authentication store
export const useAuthStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      // Login user
      login: async (credentials) => {
        try {
          set({ isLoading: true, error: null });
          const response = await apiClient.auth.login(credentials);
          
          if (response.success) {
            const userData = response.data;
            set({
              user: userData,
              isAuthenticated: true,
              token: userData.token || userData.access_token,
              isLoading: false,
              error: null,
              lastActivity: Date.now(),
            });
            return { success: true, data: userData };
          } else {
            set({
              isLoading: false,
              error: response.message || 'Login failed',
            });
            return { success: false, message: response.message || 'Login failed' };
          }
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message || 'Login failed';
          set({
            isLoading: false,
            error: errorMessage,
          });
          return { success: false, message: errorMessage };
        }
      },

      // Logout user
      logout: async () => {
        try {
          set({ isLoading: true });
          await apiClient.auth.logout();
        } catch (error) {
          console.warn('Logout API call failed:', error);
        } finally {
          // Always clear local state, even if API call fails
          set({
            ...initialState,
            isLoading: false,
            isInitializing: false,
          });
        }
      },

      // Check authentication status
      checkAuth: async () => {
        try {
          set({ isInitializing: true });
          const response = await apiClient.auth.checkAuth();
          
          if (response.isAuthenticated) {
            set({
              isAuthenticated: true,
              user: response.user,
              isInitializing: false,
              lastActivity: Date.now(),
            });
          } else {
            set({
              isAuthenticated: false,
  user: null,
              isInitializing: false,
            });
          }
        } catch (error) {
          set({
  isAuthenticated: false,
            user: null,
            isInitializing: false,
            error: error.message,
          });
        }
      },

      // Get user profile
      getProfile: async () => {
        try {
          set({ isLoading: true, error: null });
          const response = await apiClient.auth.getProfile();
          
          if (response.success) {
            set({
              user: response.data,
              isLoading: false,
              lastActivity: Date.now(),
            });
            return { success: true, data: response.data };
          } else {
            set({
              isLoading: false,
              error: response.message || 'Failed to fetch profile',
            });
            return { success: false, message: response.message || 'Failed to fetch profile' };
          }
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch profile';
          set({
            isLoading: false,
            error: errorMessage,
          });
          return { success: false, message: errorMessage };
        }
      },

      // Update user profile
      updateProfile: async (profileData) => {
        try {
          set({ isLoading: true, error: null });
          const response = await apiClient.auth.updateProfile(profileData);
          
          if (response.success) {
            const updatedUser = response.data;
            set({
              user: updatedUser,
              isLoading: false,
              lastActivity: Date.now(),
            });
            return { success: true, data: updatedUser };
          } else {
            set({
              isLoading: false,
              error: response.message || 'Failed to update profile',
            });
            return { success: false, message: response.message || 'Failed to update profile' };
          }
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message || 'Failed to update profile';
          set({
            isLoading: false,
            error: errorMessage,
          });
          return { success: false, message: errorMessage };
        }
      },

      // Change password
      changePassword: async (passwordData) => {
        try {
          set({ isLoading: true, error: null });
          const response = await apiClient.auth.changePassword(passwordData);
          
          if (response.success) {
            set({
              isLoading: false,
              error: null,
            });
            return { success: true, message: response.message || 'Password changed successfully' };
          } else {
            set({
              isLoading: false,
              error: response.message || 'Failed to change password',
            });
            return { success: false, message: response.message || 'Failed to change password' };
          }
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message || 'Failed to change password';
          set({
            isLoading: false,
            error: errorMessage,
          });
          return { success: false, message: errorMessage };
        }
      },

      // Forgot password
      forgotPassword: async (email) => {
        try {
          set({ isLoading: true, error: null });
          const response = await apiClient.auth.forgotPassword(email);
          
          if (response.success) {
            set({
              isLoading: false,
              error: null,
            });
            return { success: true, message: response.message || 'Password reset email sent' };
          } else {
            set({
              isLoading: false,
              error: response.message || 'Failed to send reset email',
            });
            return { success: false, message: response.message || 'Failed to send reset email' };
          }
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message || 'Failed to send reset email';
          set({
            isLoading: false,
            error: errorMessage,
          });
          return { success: false, message: errorMessage };
        }
      },

      // Clear error
      clearError: () => set({ error: null }),

      // Update last activity
      updateActivity: () => set({ lastActivity: Date.now() }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        lastActivity: state.lastActivity,
      }),
    }
  )
);
