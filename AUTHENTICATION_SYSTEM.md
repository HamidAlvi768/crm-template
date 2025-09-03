# 🔐 Authentication System Documentation

## Overview

This React application implements a robust, production-ready authentication system with layered architecture, automatic token management, and comprehensive security features.

## 🏗️ Architecture

The authentication system follows a **layered architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                    Component Layer                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   LoginForm     │  │ ProtectedRoute  │  │    Header    │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                   Custom Hook Layer                         │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                    useAuth Hook                         │ │
│  │  • Authentication state management                      │ │
│  │  • Permission/role checking                            │ │
│  │  • Activity monitoring                                 │ │
│  │  • Token refresh logic                                 │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                 State Management Layer                      │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                  authStore (Zustand)                    │ │
│  │  • Persistent state management                          │ │
│  │  • Login/logout operations                              │ │
│  │  • Session management                                   │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                     API Layer                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │    authAPI      │  │   apiClient     │  │  Backend API │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Complete Authentication Flow

### 1. Application Initialization

```
main.jsx → AuthInitializer → checkAuth() → App.jsx
```

**Process:**
1. **`main.jsx`**: Wraps entire app with `AuthInitializer`
2. **`AuthInitializer`**: Shows loading spinner while checking authentication
3. **`checkAuth()`**: Calls `/auth/profile` to verify existing session
4. **Result**: Sets `isInitializing: false` and `isAuthenticated: true/false`

### 2. Login Flow

```
LoginForm → useAuth.login() → authStore.login() → authAPI.login() → API Client → Backend
```

**Step-by-step:**
1. User submits login form (`src/components/login-form.jsx`)
2. `useAuth.login()` called (abstraction layer)
3. `authStore.login()` executes:
   - Sets `isLoading: true`
   - Calls `authAPI.login(credentials)`
   - On success: Updates state with `user`, `token`, `isAuthenticated: true`
   - Persists to localStorage via Zustand persist middleware
4. `authAPI.login()` makes POST request to `/auth/login`
5. API Client adds Authorization header and handles response
6. Success: User redirected to dashboard, toast notification shown

### 3. Token Management

```
API Client → getAuthToken() → localStorage → Zustand Persist
```

**Features:**
- **Token Storage**: Stored in localStorage as `auth-storage` (Zustand persist)
- **Token Extraction**: `getAuthToken()` function parses `authData.token`
- **Auto-attachment**: Every API request includes `Authorization: Bearer ${token}`
- **Token Validation**: 401 responses trigger automatic logout and redirect

### 4. Route Protection

```
ProtectedRoute → useAuth.isAuthenticated → Navigate to /login
```

**Implementation:**
- `ProtectedRoute` wraps protected pages (Dashboard, Customers)
- Checks `isAuthenticated` from auth store
- Unauthenticated users redirected to `/login`
- Users page is public (no protection)

### 5. Session Management

```
useAuth Hook → Activity Listeners → updateActivity() → Token Refresh Logic
```

**Features:**
- **Activity Tracking**: Monitors mouse, keyboard, scroll, touch events
- **Auto-refresh**: Checks token age every 5 minutes
- **Session Timeout**: 30 minutes of inactivity
- **Token Refresh**: Currently updates activity timestamp (refresh logic placeholder)

### 6. Logout Flow

```
Header Logout Button → useAuth.logout() → authStore.logout() → Clear State
```

**Process:**
1. API Call: Attempts server-side logout via `/auth/logout`
2. State Cleanup: Always clears local state (even if API fails)
3. Redirect: Navigates to `/login` page
4. Storage Cleanup: Removes `auth-storage` from localStorage

## 🔧 Key Components

### State Management (`src/store/authStore.js`)

```javascript
// Core state
{
  isAuthenticated: boolean,
  user: object,
  token: string,
  isLoading: boolean,
  isInitializing: boolean,
  error: string,
  lastActivity: timestamp
}

// Key methods
login(), logout(), checkAuth(), getProfile(), updateProfile()
```

**Features:**
- Zustand with persist middleware
- Automatic localStorage persistence
- Comprehensive error handling
- Loading state management

### Unified API Client (`src/services/api/client.js`)

```javascript
// Unified API client with integrated authentication methods
const apiClient = {
  // Core HTTP methods
  get: (endpoint, params = {}) => axiosInstance.get(endpoint, { params }),
  post: (endpoint, data = {}) => axiosInstance.post(endpoint, data),
  put: (endpoint, data = {}) => axiosInstance.put(endpoint, data),
  patch: (endpoint, data = {}) => axiosInstance.patch(endpoint, data),
  delete: (endpoint) => axiosInstance.delete(endpoint),

  // Authentication methods
  auth: {
    login: (credentials) => axiosInstance.post('/auth/login', credentials),
    logout: () => axiosInstance.post('/auth/logout'),
    getProfile: () => axiosInstance.get('/auth/profile'),
    updateProfile: (data) => axiosInstance.put('/auth/profile', data),
    changePassword: (data) => axiosInstance.post('/auth/change-password', data),
    forgotPassword: (email) => axiosInstance.post('/auth/forgot-password', { email }),
    resetPassword: (token, password) => axiosInstance.post('/auth/reset-password', { token, password }),
    verifyEmail: (token) => axiosInstance.post('/auth/verify-email', { token }),
    checkAuth: async () => {
      try {
        const response = await axiosInstance.get('/auth/profile')
        return { isAuthenticated: true, user: response }
      } catch (error) {
        return { isAuthenticated: false, user: null }
      }
    }
  },

  // File upload
  upload: (endpoint, file, onProgress) => { /* ... */ }
}
```

**Features:**
- **Unified API client** with integrated authentication methods
- **Axios with interceptors** for clean separation of concerns
- **Automatic token attachment** via request interceptor
- **401 error handling** with auto-logout via response interceptor
- **Request timeout** (30 seconds)
- **Centralized error formatting**
- **Network error handling**
- **Automatic response data extraction** (no need for `.data`)
- **Consolidated authentication methods** in `apiClient.auth.*`

### Custom Hook (`src/hooks/useAuth.js`)

```javascript
// Abstraction layer providing:
- Authentication state
- Permission/role checking
- Activity monitoring
- Token refresh logic
- User display utilities
```

**Features:**
- Activity monitoring with event listeners
- Token expiry checking
- Permission and role validation
- User display name utilities
- Centralized authentication logic

### Route Protection (`src/components/ProtectedRoute.jsx`)

```javascript
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}
```

## 🛡️ Security Features

1. **Automatic Token Attachment**: Every API request includes auth token via Axios request interceptor
2. **401 Auto-logout**: Invalid/expired tokens trigger immediate logout via Axios response interceptor
3. **Persistent Sessions**: Login state survives browser refresh
4. **Activity Monitoring**: Tracks user activity for session management
5. **Error Handling**: Centralized error formatting and user-friendly messages
6. **Route Protection**: Unauthenticated users can't access protected routes
7. **Session Timeout**: 30-minute inactivity timeout
8. **Secure Token Storage**: Tokens stored in localStorage with proper parsing
9. **Axios Interceptors**: Clean separation of concerns for request/response handling

## 📊 Data Flow

```
User Action → Component → useAuth Hook → authStore → authAPI → API Client → Backend
     ↓
Response ← Component ← useAuth Hook ← authStore ← authAPI ← API Client ← Backend
```

## 🚀 Current Status

- ✅ **Login/Logout**: Fully functional
- ✅ **Route Protection**: Working for Dashboard and Customers
- ✅ **Token Management**: Automatic attachment and 401 handling via Axios interceptors
- ✅ **Session Persistence**: Survives browser refresh
- ✅ **Activity Tracking**: Monitors user interaction
- ✅ **Axios Integration**: Clean interceptor-based implementation
- ⚠️ **Token Refresh**: Placeholder implementation (needs backend support)
- ✅ **Error Handling**: Centralized and user-friendly

## 📁 File Structure

```
src/
├── components/
│   ├── AuthInitializer.jsx      # App initialization wrapper
│   ├── ProtectedRoute.jsx       # Route protection component
│   └── login-form.jsx           # Login form component
├── hooks/
│   └── useAuth.js               # Authentication custom hook
├── services/
│   └── api/
│       └── client.js            # Unified API client with auth methods
├── store/
│   └── authStore.js             # Zustand authentication store
└── lib/
    └── form-configs.jsx         # Login form configuration
```

## 🔧 Configuration

### Dependencies

```bash
npm install axios
```

### Environment Variables

```bash
VITE_API_BASE_URL=http://localhost/php-crud/api
```

### API Endpoints

```javascript
const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
  CHANGE_PASSWORD: '/auth/change-password',
  PROFILE: '/auth/profile',
}
```

## 🎯 Usage Examples

### Using Authentication in Components

```javascript
import { useAuth } from '@/hooks/useAuth'

function MyComponent() {
  const { 
    isAuthenticated, 
    user, 
    login, 
    logout, 
    hasRole, 
    hasPermission 
  } = useAuth()

  if (!isAuthenticated) {
    return <div>Please login</div>
  }

  return (
    <div>
      <h1>Welcome, {user?.username}</h1>
      {hasRole('admin') && <AdminPanel />}
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

### Using the Unified API Client

```javascript
import apiClient from '@/services/api/client'

// Authentication methods
const loginUser = async (credentials) => {
  const response = await apiClient.auth.login(credentials)
  return response
}

const getUserProfile = async () => {
  const response = await apiClient.auth.getProfile()
  return response
}

// General API methods
const getUsers = async () => {
  const response = await apiClient.get('/users')
  return response
}

const createUser = async (userData) => {
  const response = await apiClient.post('/users', userData)
  return response
}
```

### Protecting Routes

```javascript
import ProtectedRoute from '@/components/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } />
    </Routes>
  )
}
```

## 🔮 Future Enhancements

1. **Token Refresh**: Implement automatic token refresh with refresh tokens
2. **Role-based Access**: Expand permission system for granular access control
3. **Multi-factor Authentication**: Add 2FA support
4. **Session Management**: Add session management UI for admins
5. **Audit Logging**: Track authentication events for security monitoring
6. **Request Cancellation**: Leverage Axios request cancellation for better UX
7. **Upload Progress**: Use Axios upload progress for file uploads
8. **API Response Caching**: Add intelligent caching for frequently accessed data
9. **Request/Response Logging**: Add comprehensive logging for debugging

---

**Last Updated**: January 2025  
**Version**: 1.0.0  
**Status**: Production Ready ✅
