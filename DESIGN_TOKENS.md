# Design Tokens Documentation

## Overview

LearnFlow uses a comprehensive design token system to ensure consistency across light and dark modes. All design values are centralized in `src/theme/tokens.ts` and applied through Material-UI's theming system.

## File Structure

```
src/theme/
├── tokens.ts           # Design token definitions
├── theme.ts            # Material-UI theme configuration
└── ThemeProvider.tsx   # Theme context and provider
```

## Design Token Categories

### 1. Spacing
Consistent spacing scale based on 8px base unit:

```typescript
spacing.xs   = 4px
spacing.sm   = 8px
spacing.md   = 16px
spacing.lg   = 24px
spacing.xl   = 32px
spacing.xxl  = 48px
spacing.xxxl = 64px
```

**Usage:**
```tsx
<Box sx={{ p: 3 }}>           // padding: 24px (3 * 8px)
<Box sx={{ mt: 2, mb: 4 }}>  // margin-top: 16px, margin-bottom: 32px
```

### 2. Border Radius
Rounded corner values for different UI elements:

```typescript
borderRadius.none = 0
borderRadius.sm   = 4px
borderRadius.md   = 8px   // Default
borderRadius.lg   = 12px
borderRadius.xl   = 16px
borderRadius.xxl  = 24px
borderRadius.full = 9999px  // Perfect circles
```

**Usage:**
```tsx
// In tokens
sx={{ borderRadius: designTokens.borderRadius.lg }}

// Through theme
<Card />  // Uses theme default: 8px
<Button />  // Uses full: 9999px
```

### 3. Typography

#### Font Families
```typescript
typography.fontFamily.primary  // Google Sans, Roboto, system fonts
typography.fontFamily.mono     // Fira Code, Consolas, monospace
```

#### Font Sizes
```typescript
fontSize.xs   = 12px
fontSize.sm   = 14px
fontSize.base = 16px  // Default
fontSize.lg   = 18px
fontSize.xl   = 20px
fontSize.2xl  = 24px
fontSize.3xl  = 28px
fontSize.4xl  = 32px
fontSize.5xl  = 40px
```

#### Font Weights
```typescript
fontWeight.light    = 300
fontWeight.regular  = 400  // Default
fontWeight.medium   = 500
fontWeight.semibold = 600
fontWeight.bold     = 700
```

#### Line Heights
```typescript
lineHeight.tight   = 1.2
lineHeight.snug    = 1.3
lineHeight.normal  = 1.5  // Default
lineHeight.relaxed = 1.6
lineHeight.loose   = 1.8
```

**Usage:**
```tsx
<Typography variant="h1">  // 40px, bold, 1.2 line height
<Typography variant="body1">  // 16px, regular, 1.5 line height
<Typography variant="caption">  // 12px, regular, 1.5 line height
```

### 4. Shadows
Multiple shadow depths for elevation:

```typescript
// Standard shadows
shadows.sm   // Subtle elevation
shadows.md   // Default card shadow
shadows.lg   // Prominent elevation
shadows.xl   // Maximum elevation
shadows.2xl  // Floating elements

// Google Material Design shadows
shadows.google.sm  // Subtle Google-style
shadows.google.md  // Default Google-style
shadows.google.lg  // Prominent Google-style
```

**Usage:**
```tsx
<Card />  // Automatically uses google.sm shadow
<Paper elevation={2} />  // Uses md shadow
```

### 5. Z-Index
Layering system for overlapping elements:

```typescript
zIndex.dropdown      = 1000
zIndex.sticky        = 1020
zIndex.fixed         = 1030
zIndex.modalBackdrop = 1040
zIndex.modal         = 1050
zIndex.popover       = 1060
zIndex.tooltip       = 1070
```

### 6. Transitions
Animation timing and easing:

```typescript
// Durations (ms)
duration.shortest       = 150
duration.short          = 250
duration.standard       = 300  // Default
duration.complex        = 375
duration.enteringScreen = 225
duration.leavingScreen  = 195

// Easing functions
easing.easeInOut = 'cubic-bezier(0.4, 0, 0.2, 1)'
easing.easeOut   = 'cubic-bezier(0.0, 0, 0.2, 1)'
easing.easeIn    = 'cubic-bezier(0.4, 0, 1, 1)'
easing.sharp     = 'cubic-bezier(0.4, 0, 0.6, 1)'
```

**Usage:**
```tsx
sx={{
  transition: `all ${designTokens.transitions.duration.standard}ms ${designTokens.transitions.easing.easeInOut}`
}}
```

## Color System

### Light Mode Colors

#### Primary (Purple)
```typescript
primary.main     = #7c3aed  // Main brand color
primary.light    = #a78bfa  // Hover states
primary.dark     = #6d28d9  // Active states
primary.contrast = #ffffff  // Text on primary
```

#### Secondary (Blue)
```typescript
secondary.main     = #2563eb
secondary.light    = #60a5fa
secondary.dark     = #1d4ed8
secondary.contrast = #ffffff
```

#### Semantic Colors
```typescript
success.main  = #16a34a  // Green
warning.main  = #f97316  // Orange
error.main    = #dc2626  // Red
info.main     = #3b82f6  // Blue
```

#### Text Colors
```typescript
text.primary   = #18181b  // Main text
text.secondary = #52525b  // Muted text
text.disabled  = #a1a1aa  // Disabled text
text.hint      = #71717a  // Hints/placeholders
```

#### Background Colors
```typescript
background.default  = #fafafa   // Page background
background.paper    = #ffffff   // Card background
background.elevated = #ffffff   // Elevated surfaces
background.overlay  = rgba(0, 0, 0, 0.5)
```

#### Border Colors
```typescript
border.light = #e4e4e7  // Subtle borders
border.main  = #d4d4d8  // Default borders
border.dark  = #a1a1aa  // Prominent borders
```

### Dark Mode Colors

Dark mode uses lighter variants of the same color scales for better contrast:

```typescript
primary.main     = #a78bfa  // Lighter purple
text.primary     = #fafafa  // Light text on dark bg
background.default = #18181b  // Dark background
background.paper   = #27272a  // Dark surface
```

## Using the Theme

### Basic Usage

```tsx
import { useTheme } from '@mui/material';

function MyComponent() {
  const theme = useTheme();
  
  return (
    <Box sx={{
      color: theme.palette.text.primary,
      bgcolor: theme.palette.background.paper,
      p: 3,  // 24px padding
      borderRadius: 2,  // 16px (2 * 8px)
    }}>
      Content
    </Box>
  );
}
```

### Toggle Theme

```tsx
import { useTheme } from '../theme/ThemeProvider';

function ThemeToggleButton() {
  const { mode, toggleTheme } = useTheme();
  
  return (
    <Button onClick={toggleTheme}>
      Switch to {mode === 'light' ? 'dark' : 'light'} mode
    </Button>
  );
}
```

### Direct Token Access

```tsx
import { designTokens } from '../theme/tokens';

<Box sx={{
  fontSize: designTokens.typography.fontSize.xl,
  fontWeight: designTokens.typography.fontWeight.bold,
  borderRadius: designTokens.borderRadius.lg,
  boxShadow: designTokens.shadows.google.md,
}}>
```

## Component Customization

The theme automatically applies design tokens to all Material-UI components:

### Buttons
- Full rounded corners (`borderRadius.full`)
- Medium font weight
- Subtle shadows with hover effects
- Smooth transitions (300ms)

### Cards
- Rounded corners (`borderRadius.lg`)
- Subtle border
- Google-style shadow
- Hover animation (lift + shadow increase)

### Text Fields
- Rounded corners (`borderRadius.md`)
- Focus ring with primary color
- Smooth transitions on focus

### List Items
- Rounded corners with hover slide effect
- Selected state with left border accent
- Smooth transitions

## Gradients

Pre-defined gradients for special effects:

```typescript
gradients.primary   // Purple gradient
gradients.secondary // Blue gradient
gradients.success   // Green gradient
gradients.warning   // Orange gradient
gradients.error     // Red gradient
gradients.glass     // Glassmorphism effect
```

**Usage:**
```tsx
<Box sx={{
  background: designTokens.gradients.primary,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}}>
  Gradient Text
</Box>
```

## Best Practices

### 1. Always Use Tokens
❌ **Don't:**
```tsx
<Box sx={{ padding: '24px', color: '#7c3aed' }}>
```

✅ **Do:**
```tsx
<Box sx={{ p: 3, color: 'primary.main' }}>
```

### 2. Use Theme Spacing
❌ **Don't:**
```tsx
<Box sx={{ marginTop: '16px', paddingLeft: '32px' }}>
```

✅ **Do:**
```tsx
<Box sx={{ mt: 2, pl: 4 }}>
```

### 3. Use Semantic Colors
❌ **Don't:**
```tsx
<Alert sx={{ bgcolor: '#dc2626' }}>
```

✅ **Do:**
```tsx
<Alert severity="error">
```

### 4. Responsive Design
```tsx
<Box sx={{
  p: { xs: 2, sm: 3, md: 4 },  // 16px, 24px, 32px
  fontSize: { xs: 'sm', md: 'base', lg: 'lg' },
}}>
```

## Theme Modes

### Light Mode
- Best for daytime use
- Higher contrast
- Pure white backgrounds
- Purple primary (#7c3aed)

### Dark Mode
- Best for low-light environments
- Reduced eye strain
- Dark gray backgrounds (#18181b)
- Lighter purple primary (#a78bfa)

## Accessibility

The design token system ensures:
- WCAG AA contrast ratios in both modes
- Consistent spacing for touch targets (minimum 44px)
- Clear focus indicators
- Readable typography (minimum 14px for body text)

## Migration Guide

### From Old Theme to New Theme

**Old:**
```tsx
import { theme } from './theme/theme';
```

**New:**
```tsx
import { ThemeProvider } from './theme/ThemeProvider';

<ThemeProvider>
  <App />
</ThemeProvider>
```

## Extending the Theme

### Adding Custom Tokens

Edit `tokens.ts`:
```typescript
export const customTokens = {
  animation: {
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  // Add your tokens here
};
```

### Adding Custom Component Styles

Edit `theme.ts`:
```typescript
components: {
  MuiCustomComponent: {
    styleOverrides: {
      root: {
        // Your styles using tokens
      },
    },
  },
}
```

## Performance

- Theme memoization prevents unnecessary re-renders
- LocalStorage caches user's theme preference
- CSS-in-JS optimization with Material-UI's sx prop
- Minimal runtime overhead

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- All modern browsers with CSS custom properties support
