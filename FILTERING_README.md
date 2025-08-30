# DataTable Filtering - Quick Reference

## ⚠️ CRITICAL: Key Matching
**`filterableColumns` keys MUST exactly match `columns` array keys**

## Quick Setup
```jsx
// 1. Define columns with keys
const columns = [
  { key: 'firstName', header: 'First Name' },
  { key: 'company', header: 'Company' }
]

// 2. Use matching keys in filterableColumns
<DataTable 
  columns={columns}
  filterableColumns={['firstName', 'company']} // ✅ Keys match exactly
/>
```

## Common Issues
- **Filters not showing?** Check key matching
- **Filters not working?** Verify data structure matches column keys
- **Layout broken?** Ensure `flex-1` classes are applied

## Remember
- Case sensitivity matters
- Test with real data
- Keys must match exactly
