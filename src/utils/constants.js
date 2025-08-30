// Application constants and configuration

// API Configuration
export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000,
    REFRESH_TOKEN_INTERVAL: 25 * 60 * 1000, // 25 minutes
    SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  };
  
  // Pagination defaults
  export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
    PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
  };
  
  // User roles and permissions
  export const USER_ROLES = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    USER: 'user',
  };
  
  export const USER_PERMISSIONS = {
    READ: 'read',
    WRITE: 'write',
    DELETE: 'delete',
    ADMIN: 'admin',
    USER_MANAGEMENT: 'user_management',
    PRODUCT_MANAGEMENT: 'product_management',
    CUSTOMER_MANAGEMENT: 'customer_management',
  };
  
  export const USER_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended',
  };
  
  // Product constants
  export const PRODUCT_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    DRAFT: 'draft',
    ARCHIVED: 'archived',
  };
  
  export const PRODUCT_CATEGORIES = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Sports & Outdoors',
    'Automotive',
    'Health & Beauty',
    'Toys & Games',
    'Food & Beverages',
    'Other',
  ];
  
  export const PRODUCT_BRANDS = [
    'Apple',
    'Samsung',
    'Nike',
    'Adidas',
    'Sony',
    'Microsoft',
    'Google',
    'Amazon',
    'Other',
  ];
  
  // Customer constants
  export const CUSTOMER_STATUS = {
    PROSPECT: 'prospect',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    VIP: 'vip',
  };
  
  export const CUSTOMER_INDUSTRIES = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Retail',
    'Real Estate',
    'Consulting',
    'Other',
  ];
  
  // Form validation constants
  export const VALIDATION = {
    MIN_PASSWORD_LENGTH: 8,
    MAX_PASSWORD_LENGTH: 128,
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 50,
    MIN_EMAIL_LENGTH: 5,
    MAX_EMAIL_LENGTH: 254,
    MIN_PHONE_LENGTH: 10,
    MAX_PHONE_LENGTH: 15,
    MIN_DESCRIPTION_LENGTH: 10,
    MAX_DESCRIPTION_LENGTH: 1000,
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  };
  
  // UI constants
  export const UI = {
    DEBOUNCE_DELAY: 500,
    TOAST_DURATION: 5000,
    MODAL_ANIMATION_DURATION: 200,
    LOADING_SPINNER_SIZE: 24,
    MAX_TABLE_ROWS: 1000,
    MIN_TABLE_ROWS: 1,
  };
  
  // Date and time formats
  export const DATE_FORMATS = {
    DISPLAY: 'MMM dd, yyyy',
    DISPLAY_WITH_TIME: 'MMM dd, yyyy HH:mm',
    ISO: 'yyyy-MM-dd',
    ISO_WITH_TIME: "yyyy-MM-dd'T'HH:mm:ss",
    SHORT: 'MM/dd/yyyy',
    SHORT_WITH_TIME: 'MM/dd/yyyy HH:mm',
  };
  
  export const TIME_FORMATS = {
    DISPLAY: 'HH:mm',
    DISPLAY_WITH_SECONDS: 'HH:mm:ss',
    TWELVE_HOUR: 'hh:mm a',
    TWELVE_HOUR_WITH_SECONDS: 'hh:mm:ss a',
  };
  
  // Currency and number formats
  export const CURRENCY = {
    DEFAULT: 'USD',
    SYMBOL: '$',
    DECIMAL_PLACES: 2,
    THOUSAND_SEPARATOR: ',',
    DECIMAL_SEPARATOR: '.',
  };
  
  export const NUMBER_FORMATS = {
    DECIMAL_PLACES: 2,
    THOUSAND_SEPARATOR: ',',
    DECIMAL_SEPARATOR: '.',
    PERCENTAGE_DECIMAL_PLACES: 1,
  };
  
  // File upload constants
  export const FILE_UPLOAD = {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: {
      IMAGE: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      DOCUMENT: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ],
      SPREADSHEET: [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ],
    },
    MAX_FILES: 10,
    COMPRESSION_QUALITY: 0.8,
  };
  
  // Search and filter constants
  export const SEARCH = {
    MIN_QUERY_LENGTH: 2,
    MAX_QUERY_LENGTH: 100,
    DEBOUNCE_DELAY: 300,
    MAX_RESULTS: 1000,
    SUGGESTION_LIMIT: 10,
  };
  
  // Notification constants
  export const NOTIFICATIONS = {
    TYPES: {
      SUCCESS: 'success',
      ERROR: 'error',
      WARNING: 'warning',
      INFO: 'info',
    },
    POSITIONS: {
      TOP_LEFT: 'top-left',
      TOP_RIGHT: 'top-right',
      TOP_CENTER: 'top-center',
      BOTTOM_LEFT: 'bottom-left',
      BOTTOM_RIGHT: 'bottom-right',
      BOTTOM_CENTER: 'bottom-center',
    },
    DURATIONS: {
      SHORT: 3000,
      MEDIUM: 5000,
      LONG: 10000,
      PERSISTENT: 0,
    },
  };
  
  // Local storage keys
  export const STORAGE_KEYS = {
    AUTH: 'auth-storage',
    USER_PREFERENCES: 'user-preferences',
    THEME: 'theme',
    LANGUAGE: 'language',
    SIDEBAR_COLLAPSED: 'sidebar-collapsed',
    TABLE_PREFERENCES: 'table-preferences',
    FORM_DRAFTS: 'form-drafts',
  };
  
  // Theme constants
  export const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system',
  };
  
  // Language constants
  export const LANGUAGES = {
    EN: 'en',
    ES: 'es',
    FR: 'fr',
    DE: 'de',
    IT: 'it',
    PT: 'pt',
    RU: 'ru',
    ZH: 'zh',
    JA: 'ja',
    KO: 'ko',
  };
  
  // Breakpoints for responsive design
  export const BREAKPOINTS = {
    XS: 0,
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536,
  };
  
  // Z-index values for layering
  export const Z_INDEX = {
    DROPDOWN: 1000,
    STICKY: 1020,
    FIXED: 1030,
    MODAL_BACKDROP: 1040,
    MODAL: 1050,
    POPOVER: 1060,
    TOOLTIP: 1070,
    TOAST: 1080,
  };
  
  // Animation durations
  export const ANIMATION = {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
    VERY_SLOW: 1000,
  };
  
  // Error codes
  export const ERROR_CODES = {
    NETWORK_ERROR: 'NETWORK_ERROR',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
    AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
    NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
    SERVER_ERROR: 'SERVER_ERROR',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  };
  
  // Success messages
  export const SUCCESS_MESSAGES = {
    CREATED: 'Item created successfully',
    UPDATED: 'Item updated successfully',
    DELETED: 'Item deleted successfully',
    SAVED: 'Changes saved successfully',
    UPLOADED: 'File uploaded successfully',
    LOGGED_IN: 'Logged in successfully',
    LOGGED_OUT: 'Logged out successfully',
    PASSWORD_CHANGED: 'Password changed successfully',
    PROFILE_UPDATED: 'Profile updated successfully',
  };
  
  // Error messages
  export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error. Please check your connection.',
    VALIDATION_ERROR: 'Please check your input and try again.',
    AUTHENTICATION_ERROR: 'Authentication failed. Please log in again.',
    AUTHORIZATION_ERROR: 'You do not have permission to perform this action.',
    NOT_FOUND_ERROR: 'The requested resource was not found.',
    SERVER_ERROR: 'A server error occurred. Please try again later.',
    UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
    REQUIRED_FIELD: 'This field is required.',
    INVALID_EMAIL: 'Please enter a valid email address.',
    INVALID_PHONE: 'Please enter a valid phone number.',
    PASSWORD_TOO_SHORT: 'Password must be at least 8 characters long.',
    PASSWORDS_DONT_MATCH: 'Passwords do not match.',
  };
  
  export default {
    API_CONFIG,
    PAGINATION,
    USER_ROLES,
    USER_PERMISSIONS,
    USER_STATUS,
    PRODUCT_STATUS,
    PRODUCT_CATEGORIES,
    PRODUCT_BRANDS,
    CUSTOMER_STATUS,
    CUSTOMER_INDUSTRIES,
    VALIDATION,
    UI,
    DATE_FORMATS,
    TIME_FORMATS,
    CURRENCY,
    NUMBER_FORMATS,
    FILE_UPLOAD,
    SEARCH,
    NOTIFICATIONS,
    STORAGE_KEYS,
    THEMES,
    LANGUAGES,
    BREAKPOINTS,
    Z_INDEX,
    ANIMATION,
    ERROR_CODES,
    SUCCESS_MESSAGES,
    ERROR_MESSAGES,
  };
  