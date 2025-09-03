# 🔍 **Data Mismatch Debug Guide**

## 🚨 **Quick Checklist**

| **Issue** | **Check** | **File** |
|-----------|-----------|----------|
| **Missing columns** | Column keys match API response fields | `src/pages/*/list.jsx` |
| **Wrong data type** | Cell renderer handles data format | `src/pages/*/list.jsx` |
| **Empty values** | API response structure | Network tab |
| **Nested data** | Access nested properties correctly | Column definitions |

## 🔧 **Common Fixes**

### **1. Column Key Mismatch**
```javascript
// ❌ Wrong - API returns 'user_name' but column expects 'name'
{ key: 'name', header: 'Name' }

// ✅ Correct - Match API response
{ key: 'user_name', header: 'Name' }
```

### **2. Nested Data Access**
```javascript
// ❌ Wrong - Direct access
{ key: 'address', header: 'Address' }

// ✅ Correct - Nested access
{ key: 'address', header: 'Address', 
  cell: ({ row }) => row.address?.street || 'N/A' }
```

### **3. Data Type Handling**
```javascript
// ❌ Wrong - No type conversion
{ key: 'created_at', header: 'Date' }

// ✅ Correct - Format data
{ key: 'created_at', header: 'Date',
  cell: ({ row }) => new Date(row.created_at).toLocaleDateString() }
```

## 🎯 **Debug Steps**

1. **Check Network Tab** → API response structure
2. **Check Column Keys** → Match API field names
3. **Check Cell Renderers** → Handle data format
4. **Check Console** → Look for undefined/null errors

## 📍 **Files to Check**

- **Column definitions**: `src/pages/*/list.jsx`
- **API response**: Network tab in DevTools
- **Data structure**: `src/store/*Store.js`

---

**💡 Tip**: Always log `console.log('API Response:', response.data)` to see exact structure
