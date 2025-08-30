## 🔄 **CRUD Integration**

### **1. Update Store Actions**
```javascript
// src/store/userStore.js
import axios from '../lib/api';

export const useUserStore = create((set, get) => ({
  users: [],
  
  // Replace local actions with API calls
  addUser: async (user) => {
    const response = await axios.post('/users', user);
    if (response.data.success) {
      set({ users: [...get().users, response.data.data] });
    }
    return response.data;
  },
  
  updateUser: async (id, updates) => {
    const response = await axios.put(`/users/${id}`, updates);
    if (response.data.success) {
      set({
        users: get().users.map(u => 
          u.id === id ? { ...u, ...updates } : u
        )
      });
    }
    return response.data;
  },
  
  deleteUser: async (id) => {
    const response = await axios.delete(`/users/${id}`);
    if (response.data.success) {
      set({
        users: get().users.filter(u => u.id !== id)
      });
    }
    return response.data;
  },
  
  fetchUsers: async () => {
    const response = await axios.get('/users');
    if (response.data.success) {
      set({ users: response.data.data });
    }
    return response.data;
  }
}));
```

### **2. Update Components**
```javascript
// src/pages/users/list.jsx
import { useUserStore } from '../../store/userStore';

export default function UserList() {
  const { users, fetchUsers } = useUserStore();
  
  useEffect(() => {
    fetchUsers(); // Load data on mount
  }, []);
  
  // Rest of component remains the same
}
```

## ⚡ **Quick Migration Steps**

1. **Replace local state** with API calls in stores
2. **Add authentication checks** to protected routes
3. **Update form submissions** to use API endpoints
4. **Handle loading states** during API calls
5. **Add error handling** for API failures

## 🛡️ **Protected Routes**

```javascript
// src/components/ProtectedRoute.jsx
import { useAuthStore } from '../store/authStore';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
}
```

## 📱 **Form Integration**

### **Update Form Submission**
```javascript
// In your form components
const handleSubmit = async (formData) => {
  try {
    if (editingUser) {
      await updateUser(editingUser.id, formData);
    } else {
      await addUser(formData);
    }
    toast.success('Success!');
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error occurred');
  }
};
```

## 🔧 **Error Handling**

```javascript
// src/lib/api.js
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

## ✅ **What Changes**

- **Stores**: Replace local state with API calls
- **Components**: Add loading states and error handling
- **Forms**: Update submission to use API endpoints
- **Authentication**: Add session-based auth flow
- **Module**: Use "users" module 

## 🎯 **Keep Unchanged**

- Form configurations (`lib/form-configs.jsx`)
- UI components (`components/ui/`)
- Form dialog structure
- Table column definitions

## 🚀 **Ready to Use**

Your React CRM now connects to the PHP backend with a **users module** while maintaining the same UI patterns and user experience!
