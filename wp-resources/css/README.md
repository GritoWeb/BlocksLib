# CSS Variables - Design System

This directory contains the centralized design tokens for the BlocksLib project.

## 📁 Files

- **`variables.css`** - Main CSS variables file containing all design tokens

## 🎨 Usage

### In Blade Templates

Use utility classes that reference CSS variables:

```blade
<div class="bg-primary text-white">
    <h2 class="font-heading text-3xl">Title</h2>
    <p class="text-muted">Description</p>
</div>
```

### In Custom CSS

Reference variables directly:

```css
.my-component {
    background-color: var(--color-primary);
    color: var(--color-white);
    font-family: var(--font-heading);
    padding: var(--spacing-md);
    border-radius: var(--border-radius-lg);
}
```

### In Block Editor (JSX)

Use CSS variable values in ColorPalette:

```jsx
const colors = [
    { name: 'Primary', color: 'var(--color-primary)' },
    { name: 'Primary Dark', color: 'var(--color-primary-dark)' },
    { name: 'Secondary', color: 'var(--color-secondary)' }
];
```

## 🚨 Important Rules

1. **NEVER hardcode colors** - always use CSS variables
2. **NEVER hardcode fonts** - use `var(--font-heading)` or `var(--font-body)`
3. **Check `variables.css` first** before adding new colors or tokens
4. **Map block attributes to CSS variables** in `block.php`

## 📊 Available Tokens

### Colors
- Primary: `--color-primary`, `--color-primary-dark`, `--color-primary-light`
- Secondary: `--color-secondary`, `--color-secondary-dark`, `--color-secondary-light`
- Accent: `--color-accent`, `--color-accent-dark`, `--color-accent-light`
- Grays: `--color-gray-50` through `--color-gray-900`
- Semantic: `--color-success`, `--color-warning`, `--color-error`, `--color-info`

### Typography
- Font families: `--font-heading`, `--font-body`, `--font-mono`
- Font sizes: `--font-size-xs` through `--font-size-6xl`
- Font weights: `--font-weight-light` through `--font-weight-extrabold`
- Line heights: `--line-height-tight`, `--line-height-normal`, etc.

### Spacing
- Scale: `--spacing-1` through `--spacing-32`
- Semantic: `--spacing-xs`, `--spacing-sm`, `--spacing-md`, `--spacing-lg`, `--spacing-xl`

### Other
- Border radius: `--border-radius-sm` through `--border-radius-full`
- Shadows: `--shadow-sm` through `--shadow-2xl`
- Transitions: `--transition-fast`, `--transition-base`, `--transition-slow`
- Z-index: `--z-index-dropdown` through `--z-index-tooltip`

## 🔄 Updating Variables

When adding new design tokens:

1. Add to `variables.css`
2. Add corresponding utility class if needed
3. Update this README
4. Document in `BLOCK_CREATION_GUIDE.md` if it's a common pattern
5. Notify team of new tokens available

## 📝 Example Block Integration

**block.php:**
```php
$backgroundColor = $attributes['backgroundColor'] ?? 'primary';

$bgClass = match($backgroundColor) {
    'primary' => 'bg-primary',
    'primary-dark' => 'bg-primary-dark',
    'secondary' => 'bg-secondary',
    'white' => 'bg-white',
    default => 'bg-primary'
};
```

**blade template:**
```blade
<div class="{{ $bgClass }}">
    <h2 class="font-heading">Title</h2>
</div>
```

---

**Last Updated:** February 4, 2026
