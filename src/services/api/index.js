export * from './auth';
export * from './client';
export * from './products';
export * from './users';

// API configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
}

// API utility functions
export const createAPIEndpoint = (basePath) => {
  return {
    list: (params) => `${basePath}?${new URLSearchParams(params).toString()}`,
    detail: (id) => `${basePath}/${id}`,
    create: () => basePath,
    update: (id) => `${basePath}/${id}`,
    delete: (id) => `${basePath}/${id}`,
    bulk: () => `${basePath}/bulk`,
  }
}
