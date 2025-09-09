 Error: MySQL shutdown unexpectedly. This may be due to a blocked port, missing dependencies,  improper privileges, a crash, or a shutdown by another method. Press the Logs button to view error logs and check the Windows Event Viewer for more clues If you need more help, copy and post this entire log window on the forums


# 🔄 **API Integration Guide for Junior Developers**

## 📋 **Overview**

This guide explains the complete end-to-end data flow in our React application, helping junior developers understand how to integrate APIs and debug issues effectively.

## 🏗️ **Architecture Overview**

Our application follows a **layered architecture** with clear separation of concerns:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Components    │───▶│   Zustand Store │───▶│   API Services  │───▶│  Unified Client │
│   (UI Layer)    │    │ (State Layer)   │    │ (Data Layer)    │    │ (HTTP Client)   │
│ pages/users/    │    │ store/userStore │    │ api/users.js    │    │ api/client.js   │
│ create.jsx      │    │ store/authStore │    │ api/products.js │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │                       │
         ▼                       ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Form Configs   │    │  Auth Interceptor│    │  Axios Instance │    │  Backend API    │
│  (Config Layer) │    │ (Auth Logic)    │    │ (HTTP Layer)    │    │ (External)      │
│ lib/form-configs│    │ client.js       │    │ client.js       │    │ External Server │
│ .jsx            │    │                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔄 **Complete Data Flow Chain**

### **1. Component → Zustand Store**

**File**: `src/pages/users/create.jsx`

```jsx
// User clicks "Add User" button, opens form dialog, submits form data
const handleSubmit = async (formData) => {
  const response = await addUser(formData);
};
```

### **2. Store → API Service**

**File**: `src/store/userStore.js`

```jsx
// Store calls API service methods
addUser: async (userData) => {
	const response = await usersApi.createUser(userData)
}
```

### **3. API Service → Unified Client**

**File**: `src/services/api/users.js`

```jsx
// API service uses unified client
createUser: async (userData) => {
	const response = await apiClient.post('/users', userData)
}
```

### **4. Unified Client → Axios Instance**

**File**: `src/services/api/client.js` (axiosInstance)

```jsx
// Unified client methods directly call axios instance
const apiClient = {
	post: (endpoint, data = {}) => axiosInstance.post(endpoint, data)
}
```

### **5. Axios Interceptor → Authentication**

**File**: `src/services/api/client.js` (Request Interceptor)

```jsx
// Authentication happens automatically in request interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = getAuthToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`  }
  return config
})
```

### **6. Axios → Backend API**

**File**: External backend server

```jsx
// Axios makes HTTP request to backend
POST /api/users
Authorization: Bearer <token>Content-Type: application/json
```
## 📁 **File Structure & Responsibilities**

### **🔧 Core API Files**

| File | Purpose | When to Check |
|------|---------|---------------|
| `src/services/api/client.js` | **Unified API client** with Axios interceptors | **401 errors, token issues, network errors** |
| `src/services/api/users.js` | **Users API service** - CRUD operations | **User-related API errors** |
| `src/services/api/products.js` | **Products API service** - Product operations | **Product-related API errors** |
| `src/services/utils/apiUtils.js` | **API utilities** - Error formatting, retry logic | **Error message formatting issues** |

### **🏪 State Management Files**

| File | Purpose | When to Check |
|------|---------|---------------|
| `src/store/authStore.js` | **Authentication state** - Login, logout, user data | **Auth state issues, login/logout problems** |
| `src/store/userStore.js` | **Users state** - User CRUD operations | **User list, create, update, delete issues** |
| `src/hooks/useAuth.js` | **Auth hook** - Centralized auth logic | **Permission checks, user display issues** |

### **🎨 UI & Form Files**

| File | Purpose | When to Check |
|------|---------|---------------|
| `src/components/forms/dynamic-form.jsx` | **Dynamic form renderer** | **Form rendering, validation issues** |
| `src/lib/form-configs.jsx` | **Form configurations** | **Form field issues, validation problems** |
| `src/pages/users/list.jsx` | **Users list page** | **User list display, CRUD operations** |

## 🚨 **Common Error Scenarios & Debugging**

### **🔐 Authentication Errors**

#### **Error: "Authentication required. Please login again."**
- **Where to check**: `src/services/api/client.js` (Response Interceptor)
- **Cause**: 401 response from backend
- **Debug steps**:
  1. Check if token exists in localStorage
  2. Verify token format in Network tab
  3. Check backend authentication logic

#### **Error: "Login failed"**
- **Where to check**: `src/store/authStore.js` (login method)
- **Cause**: Invalid credentials or backend error
- **Debug steps**:
  1. Check login form data
  2. Verify backend response format
  3. Check error handling in authStore

### **📊 Data Loading Errors**

#### **Error: "Failed to fetch users"**
- **Where to check**: `src/store/userStore.js` (fetchUsers method)
- **Cause**: API call failure or data parsing issue
- **Debug steps**:
  1. Check Network tab for API response
  2. Verify response format matches expected structure
  3. Check error handling in userStore

#### **Error: "Network error: Unable to connect to server"**
- **Where to check**: `src/services/api/client.js` (Response Interceptor)
- **Cause**: No response from server
- **Debug steps**:
  1. Check if backend server is running
  2. Verify API_BASE_URL in environment variables
  3. Check network connectivity

### **📝 Form Submission Errors**

#### **Error: Form validation fails**
- **Where to check**: `src/lib/form-configs.jsx` (validation rules)
- **Cause**: Invalid form data or validation rules
- **Debug steps**:
  1. Check form field validation rules
  2. Verify form data structure
  3. Check Zod schema in form configs

#### **Error: "Failed to create user"**
- **Where to check**: `src/store/userStore.js` (addUser method)
- **Cause**: Backend validation or server error
- **Debug steps**:
  1. Check form data being sent
  2. Verify backend response
  3. Check error handling in userStore

## 🔍 **Debugging Workflow**

### **Step 1: Identify the Error Source**
```javascript
// Check browser console for error messages
console.error('Error:', error)

// Check Network tab for failed requests
// Look for 4xx/5xx status codes
```

### **Step 2: Trace the Data Flow**
```javascript
// 1. Check component level
const handleSubmit = async (data) => {
  console.log('Form data:', data) // Debug form data
  await addUser(data)
}

// 2. Check store level
const addUser = async (userData) => {
  console.log('Store: Adding user:', userData) // Debug store call
  const response = await usersApi.createUser(userData)
  console.log('Store: API response:', response) // Debug API response
}

// 3. Check API service level
const createUser = async (userData) => {
  console.log('API: Creating user:', userData) // Debug API call
  const response = await apiClient.post('/users', userData)
  console.log('API: Response:', response) // Debug response
  return response
}
```

### **Step 3: Check Interceptors**
```javascript
// Request interceptor logs
console.debug('Token found:', token ? 'Present' : 'Missing')

// Response interceptor logs
console.warn('Authentication failed for endpoint:', error.config?.url)
```

## 🛠️ **Adding New API Integration**

### **Step 1: Create API Service**
```javascript
// src/services/api/newModule.js
import apiClient from './client'

export const newModuleApi = {
  getItems: async () => {
    const response = await apiClient.get('/new-module')
    return response
  },
  
  createItem: async (data) => {
    const response = await apiClient.post('/new-module', data)
    return response
  }
}
```

### **Step 2: Create Zustand Store**
```javascript
// src/store/newModuleStore.js
import { create } from 'zustand'
import { newModuleApi } from '../services/api/newModule'

export const useNewModuleStore = create((set, get) => ({
  items: [],
  loading: false,
  error: null,
  
  fetchItems: async () => {
    try {
      set({ loading: true, error: null })
      const response = await newModuleApi.getItems()
      
      if (response.success) {
        set({ items: response.data })
      } else {
        set({ error: response.message })
      }
      
      return response
    } catch (error) {
      set({ error: error.message })
      throw error
    } finally {
      set({ loading: false })
    }
  }
}))
```

### **Step 3: Create Form Config**
```javascript
// src/lib/form-configs.jsx
export const newModuleFormConfig = {
  sections: [
    {
      title: 'New Module Information',
      fields: [
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          validation: z.string().min(2, 'Name must be at least 2 characters')
        }
      ]
    }
  ]
}
```

### **Step 4: Create Component**
```javascript
// src/pages/newModule/list.jsx
import { useNewModuleStore } from '@/store/newModuleStore'
import { newModuleFormConfig } from '@/lib/form-configs'

export default function NewModuleList() {
  const { items, loading, error, fetchItems } = useNewModuleStore()
  
  useEffect(() => {
    fetchItems()
  }, [fetchItems])
  
  // Rest of component logic
}
```

## 🔧 **Environment Configuration**

### **Environment Variables**
```bash
# .env.local
VITE_API_BASE_URL=http://localhost/php-crud/api
```

### **API Client Configuration**
```javascript
// src/services/api/client.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/php-crud/api'
const API_TIMEOUT = 30000 // 30 seconds
```

## 📚 **Key Concepts for Junior Developers**

### **1. Axios Interceptors**
- **Request Interceptor**: Automatically adds auth token to requests
- **Response Interceptor**: Handles 401 errors and formats responses
- **Location**: `src/services/api/client.js`

### **2. Zustand State Management**
- **Persistent State**: Auth state survives browser refresh
- **Actions**: Methods that modify state and call APIs
- **Location**: `src/store/` directory

### **3. Custom Hooks**
- **Abstraction Layer**: Clean API for components
- **Centralized Logic**: Reusable authentication logic
- **Location**: `src/hooks/` directory

### **4. Form Configuration**
- **Dynamic Forms**: Configuration-driven form rendering
- **Validation**: Zod schema validation
- **Location**: `src/lib/form-configs.jsx`

## 🚀 **Best Practices**

### **1. Error Handling**
```javascript
// Always handle errors in stores
try {
  const response = await apiClient.get('/endpoint')
  // Handle success
} catch (error) {
  set({ error: error.message })
  throw error
}
```

### **2. Loading States**
```javascript
// Always manage loading states
set({ loading: true })
try {
  // API call
} finally {
  set({ loading: false })
}
```

### **3. Response Validation**
```javascript
// Always check response.success
if (response.success) {
  // Handle success
} else {
  // Handle error
}
```

### **4. Token Management**
```javascript
// Tokens are automatically handled by interceptors
// No need to manually add tokens to requests
```

## 🎯 **Quick Reference**

| **Need to...** | **Check this file** |
|----------------|-------------------|
| Fix login issues | `src/store/authStore.js` |
| Fix API errors | `src/services/api/client.js` |
| Fix form validation | `src/lib/form-configs.jsx` |
| Fix user CRUD | `src/store/userStore.js` |
| Fix permissions | `src/hooks/useAuth.js` |
| Add new API | `src/services/api/` |
| Add new form | `src/lib/form-configs.jsx` |
| Add new page | `src/pages/` |

## 🔗 **Related Documentation**

- [Authentication System Guide](./AUTHENTICATION_SYSTEM.md)
- [Backend Integration Guide](./BACKEND_INTEGRATION_GUIDE.md)
- [Filter Functionality Guide](./FILTER_README.md)

---

**💡 Pro Tip**: When debugging, always start from the component level and work your way down through the data flow chain. Check the browser console, Network tab, and use console.log statements to trace the data flow.
