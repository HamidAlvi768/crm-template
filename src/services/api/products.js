import apiClient from './client'

// Products API endpoints
const PRODUCT_ENDPOINTS = {
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id) => `/products/${id}`,
  PRODUCT_CATEGORIES: '/products/categories',
  PRODUCT_BRANDS: '/products/brands',
  PRODUCT_SEARCH: '/products/search',
  PRODUCT_REVIEWS: (id) => `/products/${id}/reviews`,
  PRODUCT_IMAGES: (id) => `/products/${id}/images`,
  PRODUCT_VARIANTS: (id) => `/products/${id}/variants`,
  BULK_OPERATIONS: '/products/bulk',
  PRODUCT_STATS: '/products/stats',
}

// Products service
export const productAPI = {
  // Get all products with pagination and filters
  async getProducts(params = {}) {
    try {
      const response = await apiClient.get(PRODUCT_ENDPOINTS.PRODUCTS, params)
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch products')
    }
  },
  
  // Get product by ID
  async getProductById(productId) {
    try {
      const response = await apiClient.get(PRODUCT_ENDPOINTS.PRODUCT_BY_ID(productId))
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch product')
    }
  },
  
  // Create new product
  async createProduct(productData) {
    try {
      const response = await apiClient.post(PRODUCT_ENDPOINTS.PRODUCTS, productData)
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to create product')
    }
  },
  
  // Update product
  async updateProduct(productId, productData) {
    try {
      const response = await apiClient.put(PRODUCT_ENDPOINTS.PRODUCT_BY_ID(productId), productData)
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to update product')
    }
  },
  
  // Delete product
  async deleteProduct(productId) {
    try {
      const response = await apiClient.delete(PRODUCT_ENDPOINTS.PRODUCT_BY_ID(productId))
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to delete product')
    }
  },
  
  // Search products
  async searchProducts(query, filters = {}) {
    try {
      const params = { q: query, ...filters }
      const response = await apiClient.get(PRODUCT_ENDPOINTS.PRODUCT_SEARCH, params)
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to search products')
    }
  },
  
  // Get product categories
  async getCategories() {
    try {
      const response = await apiClient.get(PRODUCT_ENDPOINTS.PRODUCT_CATEGORIES)
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch categories')
    }
  },
  
  // Get product brands
  async getBrands() {
    try {
      const response = await apiClient.get(PRODUCT_ENDPOINTS.PRODUCT_BRANDS)
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch brands')
    }
  },
  
  // Get products by category
  async getProductsByCategory(category, params = {}) {
    try {
      const response = await apiClient.get(PRODUCT_ENDPOINTS.PRODUCTS, { category, ...params })
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch products by category')
    }
  },
  
  // Get products by brand
  async getProductsByBrand(brand, params = {}) {
    try {
      const response = await apiClient.get(PRODUCT_ENDPOINTS.PRODUCTS, { brand, ...params })
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch products by brand')
    }
  },
  
  // Get product reviews
  async getProductReviews(productId, params = {}) {
    try {
      const response = await apiClient.get(PRODUCT_ENDPOINTS.PRODUCT_REVIEWS(productId), params)
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch product reviews')
    }
  },
  
  // Add product review
  async addProductReview(productId, reviewData) {
    try {
      const response = await apiClient.post(PRODUCT_ENDPOINTS.PRODUCT_REVIEWS(productId), reviewData)
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to add review')
    }
  },
  
  // Upload product images
  async uploadProductImages(productId, files) {
    try {
      const formData = new FormData()
      files.forEach((file, index) => {
        formData.append(`images[${index}]`, file)
      })
      
      const response = await apiClient.upload(
        PRODUCT_ENDPOINTS.PRODUCT_IMAGES(productId), 
        formData
      )
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to upload product images')
    }
  },
  
  // Delete product image
  async deleteProductImage(productId, imageId) {
    try {
      const response = await apiClient.delete(
        `${PRODUCT_ENDPOINTS.PRODUCT_IMAGES(productId)}/${imageId}`
      )
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to delete product image')
    }
  },
  
  // Get product variants
  async getProductVariants(productId) {
    try {
      const response = await apiClient.get(PRODUCT_ENDPOINTS.PRODUCT_VARIANTS(productId))
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch product variants')
    }
  },
  
  // Add product variant
  async addProductVariant(productId, variantData) {
    try {
      const response = await apiClient.post(PRODUCT_ENDPOINTS.PRODUCT_VARIANTS(productId), variantData)
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to add product variant')
    }
  },
  
  // Update product variant
  async updateProductVariant(productId, variantId, variantData) {
    try {
      const response = await apiClient.put(
        `${PRODUCT_ENDPOINTS.PRODUCT_VARIANTS(productId)}/${variantId}`, 
        variantData
      )
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to update product variant')
    }
  },
  
  // Delete product variant
  async deleteProductVariant(productId, variantId) {
    try {
      const response = await apiClient.delete(
        `${PRODUCT_ENDPOINTS.PRODUCT_VARIANTS(productId)}/${variantId}`
      )
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to delete product variant')
    }
  },
  
  // Bulk operations
  async bulkOperation(operation, productIds, data = {}) {
    try {
      const response = await apiClient.post(PRODUCT_ENDPOINTS.BULK_OPERATIONS, {
        operation,
        productIds,
        data
      })
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to perform bulk operation')
    }
  },
  
  // Get product statistics
  async getProductStats() {
    try {
      const response = await apiClient.get(PRODUCT_ENDPOINTS.PRODUCT_STATS)
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch product statistics')
    }
  },
  
  // Update product stock
  async updateProductStock(productId, stockData) {
    try {
      const response = await apiClient.patch(
        `${PRODUCT_ENDPOINTS.PRODUCT_BY_ID(productId)}/stock`, 
        stockData
      )
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to update product stock')
    }
  },
  
  // Get low stock products
  async getLowStockProducts(threshold = 10) {
    try {
      const response = await apiClient.get(PRODUCT_ENDPOINTS.PRODUCTS, { 
        lowStock: true, 
        threshold 
      })
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch low stock products')
    }
  },
  
  // Get featured products
  async getFeaturedProducts(params = {}) {
    try {
      const response = await apiClient.get(PRODUCT_ENDPOINTS.PRODUCTS, { 
        featured: true, 
        ...params 
      })
      return response
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch featured products')
    }
  }
}

export default productAPI
