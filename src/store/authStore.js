import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "../lib/api";

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

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (credentials) => {
    const response = await axios.post("/auth/login", credentials);
    if (response.data.success) {
      set({ user: response.data.data, isAuthenticated: true });
    }
    return response.data;
  },
  logout: async () => {
    await axios.post("/auth/logout");
    set({ user: null, isAuthenticated: false });
  },
}));
