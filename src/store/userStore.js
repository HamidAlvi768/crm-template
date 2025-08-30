import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// User state interface
const initialState = {
  // User data
  users: [],
  currentUser: null,
  
  // UI state
  isLoading: false,
  isUpdating: false,
  
  // Pagination and filtering
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  },
  
  // Filters and search
  filters: {
    search: '',
    role: '',
    status: '',
    department: ''
  },
  
  // Error handling
  error: null,
  
  // Selection state
  selectedUsers: [],
  isSelectAll: false
}

// User store
export const useUserStore = create(
  persist(
    (set, get) => ({
      ...initialState,
      
      // Actions
      fetchUsers: async (params = {}) => {
        set({ isLoading: true, error: null })
        try {
          // TODO: Implement actual API call
          // const response = await userAPI.getUsers(params)
          
          // Mock response for now
          const mockUsers = [
            {
              id: 1,
              firstName: 'John',
              lastName: 'Doe',
              email: 'john.doe@company.com',
              role: 'admin',
              status: 'active',
              department: 'IT',
              createdAt: '2024-01-15T10:00:00Z',
              lastLogin: '2024-01-20T14:30:00Z'
            },
            {
              id: 2,
              firstName: 'Jane',
              lastName: 'Smith',
              email: 'jane.smith@company.com',
              role: 'manager',
              status: 'active',
              department: 'Sales',
              createdAt: '2024-01-10T09:00:00Z',
              lastLogin: '2024-01-19T16:45:00Z'
            }
          ]
          
          set({
            users: mockUsers,
            pagination: {
              page: 1,
              limit: 10,
              total: mockUsers.length,
              totalPages: Math.ceil(mockUsers.length / 10)
            },
            isLoading: false,
            error: null
          })
          
          return mockUsers
        } catch (error) {
          set({
            isLoading: false,
            error: error.message || 'Failed to fetch users'
          })
          throw error
        }
      },
      
      createUser: async (userData) => {
        set({ isUpdating: true, error: null })
        try {
          // TODO: Implement actual API call
          // const response = await userAPI.createUser(userData)
          
          // Mock response
          const newUser = {
            id: Date.now(),
            ...userData,
            createdAt: new Date().toISOString(),
            lastLogin: null
          }
          
          set(state => ({
            users: [newUser, ...state.users],
            isUpdating: false,
            error: null
          }))
          
          return newUser
        } catch (error) {
          set({
            isUpdating: false,
            error: error.message || 'Failed to create user'
          })
          throw error
        }
      },
      
      updateUser: async (userId, userData) => {
        set({ isUpdating: true, error: null })
        try {
          // TODO: Implement actual API call
          // const response = await userAPI.updateUser(userId, userData)
          
          // Mock update
          set(state => ({
            users: state.users.map(user => 
              user.id === userId 
                ? { ...user, ...userData, updatedAt: new Date().toISOString() }
                : user
            ),
            isUpdating: false,
            error: null
          }))
          
          return { success: true }
        } catch (error) {
          set({
            isUpdating: false,
            error: error.message || 'Failed to update user'
          })
          throw error
        }
      },
      
      deleteUser: async (userId) => {
        set({ isUpdating: true, error: null })
        try {
          // TODO: Implement actual API call
          // await userAPI.deleteUser(userId)
          
          // Mock delete
          set(state => ({
            users: state.users.filter(user => user.id !== userId),
            selectedUsers: state.selectedUsers.filter(id => id !== userId),
            isUpdating: false,
            error: null
          }))
          
          return { success: true }
        } catch (error) {
          set({
            isUpdating: false,
            error: error.message || 'Failed to delete user'
          })
          throw error
        }
      },
      
      setCurrentUser: (user) => {
        set({ currentUser: user })
      },
      
      updatePagination: (pagination) => {
        set({ pagination: { ...get().pagination, ...pagination } })
      },
      
      updateFilters: (filters) => {
        set({ 
          filters: { ...get().filters, ...filters },
          pagination: { ...get().pagination, page: 1 } // Reset to first page
        })
      },
      
      selectUser: (userId) => {
        set(state => ({
          selectedUsers: state.selectedUsers.includes(userId)
            ? state.selectedUsers.filter(id => id !== userId)
            : [...state.selectedUsers, userId]
        }))
      },
      
      selectAllUsers: () => {
        const { users, selectedUsers, isSelectAll } = get()
        if (isSelectAll) {
          set({ selectedUsers: [], isSelectAll: false })
        } else {
          set({ 
            selectedUsers: users.map(user => user.id), 
            isSelectAll: true 
          })
        }
      },
      
      clearSelection: () => {
        set({ selectedUsers: [], isSelectAll: false })
      },
      
      clearError: () => {
        set({ error: null })
      },
      
      reset: () => {
        set(initialState)
      }
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        // Only persist these fields
        filters: state.filters,
        pagination: state.pagination
      })
    }
  )
)
