/**
 * Design Tokens for LearnFlow
 * Centralized design system constants for consistent theming
 */

// ==================== SPACING ====================
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

// ==================== BORDER RADIUS ====================
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
} as const;

// ==================== TYPOGRAPHY ====================
export const typography = {
  fontFamily: {
    primary: [
      'Google Sans',
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    mono: [
      'Fira Code',
      'Consolas',
      'Monaco',
      'Courier New',
      'monospace',
    ].join(','),
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.75rem', // 28px
    '4xl': '2rem',    // 32px
    '5xl': '2.5rem',  // 40px
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.2,
    snug: 1.3,
    normal: 1.5,
    relaxed: 1.6,
    loose: 1.8,
  },
} as const;

// ==================== SHADOWS ====================
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  xl: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  '2xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  // Google Material Design shadows
  google: {
    sm: '0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15)',
    md: '0 1px 3px 0 rgba(60, 64, 67, 0.3), 0 4px 8px 3px rgba(60, 64, 67, 0.15)',
    lg: '0 2px 6px 2px rgba(60, 64, 67, 0.15), 0 8px 12px 6px rgba(60, 64, 67, 0.15)',
  },
} as const;

// ==================== Z-INDEX ====================
export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

// ==================== BREAKPOINTS ====================
export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
} as const;

// ==================== TRANSITIONS ====================
export const transitions = {
  duration: {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
} as const;

// ==================== COLOR TOKENS ====================

// Base color palette
const baseColors = {
  // Primary (Purple)
  purple50: '#f5f3ff',
  purple100: '#ede9fe',
  purple200: '#ddd6fe',
  purple300: '#c4b5fd',
  purple400: '#a78bfa',
  purple500: '#8b5cf6',
  purple600: '#7c3aed',
  purple700: '#6d28d9',
  purple800: '#5b21b6',
  purple900: '#4c1d95',

  // Secondary (Blue)
  blue50: '#eff6ff',
  blue100: '#dbeafe',
  blue200: '#bfdbfe',
  blue300: '#93c5fd',
  blue400: '#60a5fa',
  blue500: '#3b82f6',
  blue600: '#2563eb',
  blue700: '#1d4ed8',
  blue800: '#1e40af',
  blue900: '#1e3a8a',

  // Success (Green)
  green50: '#f0fdf4',
  green100: '#dcfce7',
  green200: '#bbf7d0',
  green300: '#86efac',
  green400: '#4ade80',
  green500: '#22c55e',
  green600: '#16a34a',
  green700: '#15803d',
  green800: '#166534',
  green900: '#14532d',

  // Warning (Orange)
  orange50: '#fff7ed',
  orange100: '#ffedd5',
  orange200: '#fed7aa',
  orange300: '#fdba74',
  orange400: '#fb923c',
  orange500: '#f97316',
  orange600: '#ea580c',
  orange700: '#c2410c',
  orange800: '#9a3412',
  orange900: '#7c2d12',

  // Error (Red)
  red50: '#fef2f2',
  red100: '#fee2e2',
  red200: '#fecaca',
  red300: '#fca5a5',
  red400: '#f87171',
  red500: '#ef4444',
  red600: '#dc2626',
  red700: '#b91c1c',
  red800: '#991b1b',
  red900: '#7f1d1d',

  // Neutral (Gray)
  gray50: '#fafafa',
  gray100: '#f4f4f5',
  gray200: '#e4e4e7',
  gray300: '#d4d4d8',
  gray400: '#a1a1aa',
  gray500: '#71717a',
  gray600: '#52525b',
  gray700: '#3f3f46',
  gray800: '#27272a',
  gray900: '#18181b',

  // Pure colors
  white: '#ffffff',
  black: '#000000',
} as const;

// ==================== LIGHT MODE TOKENS ====================
export const lightTokens = {
  // Primary brand colors
  primary: {
    main: baseColors.purple600,
    light: baseColors.purple400,
    dark: baseColors.purple700,
    contrast: baseColors.white,
  },

  // Secondary colors
  secondary: {
    main: baseColors.blue600,
    light: baseColors.blue400,
    dark: baseColors.blue700,
    contrast: baseColors.white,
  },

  // Semantic colors
  success: {
    main: baseColors.green600,
    light: baseColors.green400,
    dark: baseColors.green700,
    contrast: baseColors.white,
  },
  warning: {
    main: baseColors.orange500,
    light: baseColors.orange400,
    dark: baseColors.orange600,
    contrast: baseColors.white,
  },
  error: {
    main: baseColors.red600,
    light: baseColors.red400,
    dark: baseColors.red700,
    contrast: baseColors.white,
  },
  info: {
    main: baseColors.blue500,
    light: baseColors.blue400,
    dark: baseColors.blue600,
    contrast: baseColors.white,
  },

  // Text colors
  text: {
    primary: baseColors.gray900,
    secondary: baseColors.gray600,
    disabled: baseColors.gray400,
    hint: baseColors.gray500,
  },

  // Background colors
  background: {
    default: baseColors.gray50,
    paper: baseColors.white,
    elevated: baseColors.white,
    overlay: 'rgba(0, 0, 0, 0.5)',
  },

  // Border colors
  border: {
    light: baseColors.gray200,
    main: baseColors.gray300,
    dark: baseColors.gray400,
  },

  // Divider
  divider: baseColors.gray200,

  // Action colors
  action: {
    active: baseColors.gray900,
    hover: 'rgba(0, 0, 0, 0.04)',
    selected: 'rgba(0, 0, 0, 0.08)',
    disabled: baseColors.gray300,
    disabledBackground: baseColors.gray100,
    focus: 'rgba(0, 0, 0, 0.12)',
  },
} as const;

// ==================== DARK MODE TOKENS ====================
export const darkTokens = {
  // Primary brand colors
  primary: {
    main: baseColors.purple400,
    light: baseColors.purple300,
    dark: baseColors.purple500,
    contrast: baseColors.gray900,
  },

  // Secondary colors
  secondary: {
    main: baseColors.blue400,
    light: baseColors.blue300,
    dark: baseColors.blue500,
    contrast: baseColors.gray900,
  },

  // Semantic colors
  success: {
    main: baseColors.green400,
    light: baseColors.green300,
    dark: baseColors.green500,
    contrast: baseColors.gray900,
  },
  warning: {
    main: baseColors.orange400,
    light: baseColors.orange300,
    dark: baseColors.orange500,
    contrast: baseColors.gray900,
  },
  error: {
    main: baseColors.red400,
    light: baseColors.red300,
    dark: baseColors.red500,
    contrast: baseColors.gray900,
  },
  info: {
    main: baseColors.blue400,
    light: baseColors.blue300,
    dark: baseColors.blue500,
    contrast: baseColors.gray900,
  },

  // Text colors
  text: {
    primary: baseColors.gray50,
    secondary: baseColors.gray400,
    disabled: baseColors.gray600,
    hint: baseColors.gray500,
  },

  // Background colors
  background: {
    default: baseColors.gray900,
    paper: baseColors.gray800,
    elevated: baseColors.gray700,
    overlay: 'rgba(0, 0, 0, 0.7)',
  },

  // Border colors
  border: {
    light: baseColors.gray700,
    main: baseColors.gray600,
    dark: baseColors.gray500,
  },

  // Divider
  divider: baseColors.gray700,

  // Action colors
  action: {
    active: baseColors.white,
    hover: 'rgba(255, 255, 255, 0.08)',
    selected: 'rgba(255, 255, 255, 0.16)',
    disabled: baseColors.gray600,
    disabledBackground: baseColors.gray700,
    focus: 'rgba(255, 255, 255, 0.12)',
  },
} as const;

// ==================== GRADIENTS ====================
export const gradients = {
  primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  secondary: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
  success: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
  warning: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
  error: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
} as const;

// Export all tokens
export const designTokens = {
  spacing,
  borderRadius,
  typography,
  shadows,
  zIndex,
  breakpoints,
  transitions,
  light: lightTokens,
  dark: darkTokens,
  gradients,
} as const;
