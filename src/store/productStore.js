import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Product state interface
const initialState = {
  // Product data
  products: [],
  currentProduct: null,
  
  // UI state
  isLoading: false,
  isUpdating: false,
  
  // Pagination and filtering
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0
  },
  
  // Filters and search
  filters: {
    search: '',
    category: '',
    brand: '',
    priceRange: { min: 0, max: 1000 },
    inStock: null, // null = all, true = in stock, false = out of stock
    sortBy: 'name',
    sortOrder: 'asc'
  },
  
  // Error handling
  error: null,
  
  // Selection state
  selectedProducts: [],
  isSelectAll: false,
  
  // Cart state (if needed)
  cart: [],
  cartTotal: 0
}

// Product store
export const useProductStore = create(
  persist(
    (set, get) => ({
      ...initialState,
      
      // Actions
      fetchProducts: async (params = {}) => {
        set({ isLoading: true, error: null })
        try {
          // TODO: Implement actual API call
          // const response = await productAPI.getProducts(params)
          
          // Mock response for now
          const mockProducts = [
            {
              id: 1,
              name: 'Laptop Pro X1',
              description: 'High-performance laptop for professionals',
              price: 1299.99,
              category: 'Electronics',
              brand: 'TechCorp',
              sku: 'LP-X1-001',
              inStock: true,
              stockQuantity: 25,
              images: ['laptop-1.jpg', 'laptop-2.jpg'],
              tags: ['laptop', 'professional', 'high-performance'],
              createdAt: '2024-01-15T10:00:00Z',
              updatedAt: '2024-01-20T14:30:00Z'
            },
            {
              id: 2,
              name: 'Wireless Headphones',
              description: 'Premium noise-canceling headphones',
              price: 299.99,
              category: 'Audio',
              brand: 'SoundMax',
              sku: 'WH-001',
              inStock: true,
              stockQuantity: 50,
              images: ['headphones-1.jpg'],
              tags: ['headphones', 'wireless', 'noise-canceling'],
              createdAt: '2024-01-10T09:00:00Z',
              updatedAt: '2024-01-18T16:45:00Z'
            }
          ]
          
          set({
            products: mockProducts,
            pagination: {
              page: 1,
              limit: 12,
              total: mockProducts.length,
              totalPages: Math.ceil(mockProducts.length / 12)
            },
            isLoading: false,
            error: null
          })
          
          return mockProducts
        } catch (error) {
          set({
            isLoading: false,
            error: error.message || 'Failed to fetch products'
          })
          throw error
        }
      },
      
      createProduct: async (productData) => {
        set({ isUpdating: true, error: null })
        try {
          // TODO: Implement actual API call
          // const response = await productAPI.createProduct(productData)
          
          // Mock response
          const newProduct = {
            id: Date.now(),
            ...productData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
          
          set(state => ({
            products: [newProduct, ...state.products],
            isUpdating: false,
            error: null
          }))
          
          return newProduct
        } catch (error) {
          set({
            isUpdating: false,
            error: error.message || 'Failed to create product'
          })
          throw error
        }
      },
      
      updateProduct: async (productId, productData) => {
        set({ isUpdating: true, error: null })
        try {
          // TODO: Implement actual API call
          // const response = await productAPI.updateProduct(productId, productData)
          
          // Mock update
          set(state => ({
            products: state.products.map(product => 
              product.id === productId 
                ? { ...product, ...productData, updatedAt: new Date().toISOString() }
                : product
            ),
            isUpdating: false,
            error: null
          }))
          
          return { success: true }
        } catch (error) {
          set({
            isUpdating: false,
            error: error.message || 'Failed to update product'
          })
          throw error
        }
      },
      
      deleteProduct: async (productId) => {
        set({ isUpdating: true, error: null })
        try {
          // TODO: Implement actual API call
          // await productAPI.deleteProduct(productId)
          
          // Mock delete
          set(state => ({
            products: state.products.filter(product => product.id !== productId),
            selectedProducts: state.selectedProducts.filter(id => id !== productId),
            isUpdating: false,
            error: null
          }))
          
          return { success: true }
        } catch (error) {
          set({
            isUpdating: false,
            error: error.message || 'Failed to delete product'
          })
          throw error
        }
      },
      
      setCurrentProduct: (product) => {
        set({ currentProduct: product })
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
      
      selectProduct: (productId) => {
        set(state => ({
          selectedProducts: state.selectedProducts.includes(productId)
            ? state.selectedProducts.filter(id => id !== productId)
            : [...state.selectedProducts, productId]
        }))
      },
      
      selectAllProducts: () => {
        const { products, selectedProducts, isSelectAll } = get()
        if (isSelectAll) {
          set({ selectedProducts: [], isSelectAll: false })
        } else {
          set({ 
            selectedProducts: products.map(product => product.id), 
            isSelectAll: true 
          })
        }
      },
      
      clearSelection: () => {
        set({ selectedProducts: [], isSelectAll: false })
      },
      
      // Cart operations
      addToCart: (product, quantity = 1) => {
        set(state => {
          const existingItem = state.cart.find(item => item.id === product.id)
          
          if (existingItem) {
            // Update quantity if product already in cart
            const updatedCart = state.cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
            return {
              cart: updatedCart,
              cartTotal: updatedCart.reduce((total, item) => total + (item.price * item.quantity), 0)
            }
          } else {
            // Add new product to cart
            const newCart = [...state.cart, { ...product, quantity }]
            return {
              cart: newCart,
              cartTotal: newCart.reduce((total, item) => total + (item.price * item.quantity), 0)
            }
          }
        })
      },
      
      removeFromCart: (productId) => {
        set(state => {
          const updatedCart = state.cart.filter(item => item.id !== productId)
          return {
            cart: updatedCart,
            cartTotal: updatedCart.reduce((total, item) => total + (item.price * item.quantity), 0)
          }
        })
      },
      
      updateCartQuantity: (productId, quantity) => {
        set(state => {
          const updatedCart = state.cart.map(item =>
            item.id === productId
              ? { ...item, quantity: Math.max(0, quantity) }
              : item
          ).filter(item => item.quantity > 0) // Remove items with 0 quantity
          
          return {
            cart: updatedCart,
            cartTotal: updatedCart.reduce((total, item) => total + (item.price * item.quantity), 0)
          }
        })
      },
      
      clearCart: () => {
        set({ cart: [], cartTotal: 0 })
      },
      
      clearError: () => {
        set({ error: null })
      },
      
      reset: () => {
        set(initialState)
      }
    }),
    {
      name: 'product-storage',
      partialize: (state) => ({
        // Only persist these fields
        filters: state.filters,
        pagination: state.pagination,
        cart: state.cart,
        cartTotal: state.cartTotal
      })
    }
  )
)
