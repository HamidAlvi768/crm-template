// Export all stores
export { useAuthStore } from './authStore'
export { useUserStore } from './userStore'
export { useProductStore } from './productStore'

// Store initialization and configuration
export const initializeStores = () => {
  // Any store initialization logic can go here
  console.log('Stores initialized')
}
