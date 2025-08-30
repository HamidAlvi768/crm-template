# Conflict-Free Bootstrap Grid System

This is a minimal, conflict-free grid system that provides Bootstrap's grid functionality without any styling conflicts with Tailwind CSS.

## Features

- ✅ **No conflicts** with Tailwind CSS
- ✅ **All Bootstrap grid classes** with `bs-` prefix
- ✅ **Responsive breakpoints** (sm, md, lg, xl)
- ✅ **Flexbox utilities** for alignment and justification
- ✅ **Lightweight** - only essential grid classes

## Usage

### Import the CSS

```css
/* In your main CSS file */
@import './assets/css/bootstrap-grid.css';
```

### Grid Classes

#### Containers
```html
<div class="bs-container">
  <!-- Fixed width container with responsive breakpoints -->
</div>

<div class="bs-container-fluid">
  <!-- Full width container -->
</div>
```

#### Rows
```html
<div class="bs-row">
  <!-- Basic row -->
</div>

<div class="bs-row no-gutters">
  <!-- Row without gutters -->
</div>
```

#### Columns
```html
<!-- Basic columns -->
<div class="bs-col-6">Half width</div>
<div class="bs-col-6">Half width</div>

<!-- Responsive columns -->
<div class="bs-col-12 bs-col-md-6 bs-col-lg-4">
  <!-- Full width on mobile, half on tablet, third on desktop -->
</div>

<!-- Auto-sizing columns -->
<div class="bs-col">Auto width</div>
<div class="bs-col">Auto width</div>
```

#### Display Utilities
```html
<!-- Responsive display -->
<div class="bs-d-none bs-d-md-block">
  <!-- Hidden on mobile, visible on tablet+ -->
</div>

<div class="bs-d-block bs-d-lg-none">
  <!-- Visible on mobile, hidden on desktop -->
</div>
```

#### Flexbox Utilities
```html
<div class="bs-flex-row bs-justify-content-center bs-align-items-center">
  <!-- Row flexbox with centered content -->
</div>

<div class="bs-flex-column bs-align-items-start">
  <!-- Column flexbox with start alignment -->
</div>
```

## Breakpoints

| Breakpoint | Class Prefix | Min Width |
|------------|--------------|-----------|
| Small      | `bs-col-sm-` | 576px     |
| Medium     | `bs-col-md-` | 768px     |
| Large      | `bs-col-lg-` | 992px     |
| Extra Large| `bs-col-xl-` | 1200px    |

## Column Sizes

- `bs-col-1` through `bs-col-12` (8.33% to 100%)
- `bs-col` (auto-sizing)
- `bs-col-auto` (content-based width)

## Examples

### Responsive Card Grid
```html
<div class="bs-container">
  <div class="bs-row">
    <div class="bs-col-12 bs-col-md-6 bs-col-lg-4">
      <div class="card">Card 1</div>
    </div>
    <div class="bs-col-12 bs-col-md-6 bs-col-lg-4">
      <div class="card">Card 2</div>
    </div>
    <div class="bs-col-12 bs-col-md-6 bs-col-lg-4">
      <div class="card">Card 3</div>
    </div>
  </div>
</div>
```

### Sidebar Layout
```html
<div class="bs-container">
  <div class="bs-row">
    <div class="bs-col-12 bs-col-lg-3">
      <aside>Sidebar</aside>
    </div>
    <div class="bs-col-12 bs-col-lg-9">
      <main>Main content</main>
    </div>
  </div>
</div>
```

### Centered Form
```html
<div class="bs-container">
  <div class="bs-row bs-justify-content-center">
    <div class="bs-col-12 bs-col-md-8 bs-col-lg-6">
      <form>Your form here</form>
    </div>
  </div>
</div>
```

## Benefits

1. **No Conflicts**: Uses `bs-` prefix to avoid conflicts with Tailwind
2. **Familiar**: Same API as Bootstrap grid system
3. **Lightweight**: Only includes essential grid functionality
4. **Responsive**: Full responsive breakpoint support
5. **Flexible**: Works alongside Tailwind CSS classes

## Migration from Bootstrap

If you're migrating from Bootstrap, simply add the `bs-` prefix to your existing grid classes:

```html
<!-- Before (Bootstrap) -->
<div class="container">
  <div class="row">
    <div class="col-md-6">Content</div>
  </div>
</div>

<!-- After (Conflict-free) -->
<div class="bs-container">
  <div class="bs-row">
    <div class="bs-col-md-6">Content</div>
  </div>
</div>
```
