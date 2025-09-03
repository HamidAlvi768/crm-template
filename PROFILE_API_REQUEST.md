# Profile API Implementation Request

## Subject: User Profile API Endpoints Required for Frontend Integration

Hi [Backend Engineer Name],

I need you to implement the **User Profile API endpoints** for our React application. Based on my analysis of the frontend infrastructure, here are the specific requirements:

## 🔗 **Required API Endpoints**

### **1. GET /auth/profile**
**Purpose**: Retrieve current user's profile information
**Method**: GET
**Headers**: `Authorization: Bearer <token>`

**Expected Response Structure**:
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "id": 6,
    "username": "testuser",
    "email": "test@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890",
    "avatar": "https://example.com/avatar.jpg",
    "bio": "Software developer with 5 years experience",
    "role": "user",
    "department": "it",
    "location": "New York",
    "manager": "Jane Smith",
    "hireDate": "2023-01-15",
    "status": "active",
    "createdAt": "2023-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T14:20:00Z"
  },
  "timestamp": "2025-01-15 12:40:59"
}
```

### **2. PUT /auth/profile**
**Purpose**: Update current user's profile information
**Method**: PUT
**Headers**: `Authorization: Bearer <token>`
**Content-Type**: `application/json`

**Request Body** (all fields optional):
```json
{
  "firstName": "John",
  "lastName": "Doe", 
  "phone": "+1234567890",
  "avatar": "https://example.com/avatar.jpg",
  "bio": "Updated bio information"
}
```

**Expected Response Structure**:
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": 6,
    "username": "testuser",
    "email": "test@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890",
    "avatar": "https://example.com/avatar.jpg",
    "bio": "Updated bio information",
    "role": "user",
    "department": "it",
    "location": "New York",
    "manager": "Jane Smith",
    "hireDate": "2023-01-15",
    "status": "active",
    "createdAt": "2023-01-15T10:30:00Z",
    "updatedAt": "2025-01-15T15:45:00Z"
  },
  "timestamp": "2025-01-15 15:45:00"
}
```

### **3. POST /auth/change-password**
**Purpose**: Change user's password
**Method**: POST
**Headers**: `Authorization: Bearer <token>`
**Content-Type**: `application/json`

**Request Body**:
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword456",
  "confirmPassword": "newpassword456"
}
```

**Expected Response Structure**:
```json
{
  "success": true,
  "message": "Password changed successfully",
  "data": null,
  "timestamp": "2025-01-15 15:50:00"
}
```

## 📋 **Field Specifications**

### **Profile Fields** (for GET/PUT /auth/profile)
| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `id` | integer | Yes | - | User ID (read-only) |
| `username` | string | Yes | 3+ chars | Username (read-only) |
| `email` | string | Yes | Valid email | Email address (read-only) |
| `firstName` | string | No | 2-50 chars | User's first name |
| `lastName` | string | No | 2-50 chars | User's last name |
| `phone` | string | No | 10+ chars | Phone number |
| `avatar` | string | No | Valid URL | Profile picture URL |
| `bio` | string | No | Max 500 chars | User biography |
| `role` | string | Yes | enum | User role (read-only) |
| `department` | string | No | - | Department |
| `location` | string | No | - | Work location |
| `manager` | string | No | - | Manager name |
| `hireDate` | date | No | - | Date of hire |
| `status` | string | Yes | enum | Account status (read-only) |
| `createdAt` | datetime | Yes | - | Creation timestamp (read-only) |
| `updatedAt` | datetime | Yes | - | Last update timestamp (read-only) |

### **Role Enum Values**
- `admin` - Administrator
- `manager` - Manager  
- `user` - Regular User
- `viewer` - Read-only User

### **Status Enum Values**
- `active` - Active account
- `inactive` - Inactive account
- `suspended` - Suspended account

### **Department Enum Values**
- `it` - Information Technology
- `sales` - Sales
- `marketing` - Marketing
- `hr` - Human Resources
- `finance` - Finance
- `operations` - Operations
- `other` - Other

## 🔐 **Authentication & Authorization**

### **Token Validation**
- All endpoints require valid JWT token in `Authorization: Bearer <token>` header
- Return `401 Unauthorized` for invalid/expired tokens
- Return `403 Forbidden` for insufficient permissions

### **Permission Requirements**
- **GET /auth/profile**: User can only access their own profile
- **PUT /auth/profile**: User can only update their own profile (except read-only fields)
- **POST /auth/change-password**: User can only change their own password

## ⚠️ **Error Handling**

### **Common Error Responses**
```json
{
  "success": false,
  "message": "Error description",
  "data": null,
  "timestamp": "2025-01-15 15:50:00"
}
```

### **HTTP Status Codes**
- `200` - Success
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (user not found)
- `422` - Unprocessable Entity (validation failed)
- `500` - Internal Server Error

### **Validation Error Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "data": {
    "firstName": "First name must be at least 2 characters",
    "phone": "Phone number must be at least 10 characters"
  },
  "timestamp": "2025-01-15 15:50:00"
}
```

## 🎯 **Frontend Integration Points**

### **Current Frontend Usage**
The frontend already has these integrations ready:

1. **API Client** (`src/services/api/client.js`):
   - `apiClient.auth.getProfile()`
   - `apiClient.auth.updateProfile(profileData)`
   - `apiClient.auth.changePassword(passwordData)`

2. **State Management** (`src/store/authStore.js`):
   - `getProfile()` - Fetches and stores user profile
   - `updateProfile(profileData)` - Updates profile and refreshes state
   - `changePassword(passwordData)` - Changes password

3. **Validation Schemas** (`src/utils/validation.js`):
   - `updateProfile` schema for profile updates
   - `changePassword` schema for password changes

4. **Form Configurations** (`src/lib/form-configs.jsx`):
   - Profile form fields already defined
   - Validation rules already implemented

## 🚀 **Implementation Priority**

**High Priority** - These endpoints are essential for:
- User profile management
- Password change functionality  
- Authentication state persistence
- User experience completion

## 📝 **Testing Requirements**

Please test these scenarios:
1. **Valid token** - All endpoints work correctly
2. **Invalid token** - Returns 401 Unauthorized
3. **Expired token** - Returns 401 Unauthorized
4. **Validation errors** - Returns 422 with field-specific errors
5. **Read-only fields** - Cannot be updated via PUT /auth/profile
6. **Password validation** - Current password must be correct

## 🔗 **Related Endpoints**

These profile endpoints work alongside existing endpoints:
- `POST /auth/login` - Already implemented
- `POST /auth/logout` - Already implemented
- `POST /auth/refresh` - Already implemented

## 📞 **Questions/Clarifications**

If you need any clarification on:
- Field requirements
- Validation rules
- Response formats
- Error handling

Please let me know and I can provide more details or examples.

---

**Thanks for implementing these endpoints! The frontend is ready to integrate as soon as they're available.** 🚀
