import { createTheme, ThemeOptions } from '@mui/material/styles';
import { designTokens } from './tokens';

/**
 * Create Material-UI theme from design tokens
 * @param mode - 'light' or 'dark'
 */
export const createLearnFlowTheme = (mode: 'light' | 'dark') => {
  const tokens = mode === 'light' ? designTokens.light : designTokens.dark;

  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      primary: {
        main: tokens.primary.main,
        light: tokens.primary.light,
        dark: tokens.primary.dark,
        contrastText: tokens.primary.contrast,
      },
      secondary: {
        main: tokens.secondary.main,
        light: tokens.secondary.light,
        dark: tokens.secondary.dark,
        contrastText: tokens.secondary.contrast,
      },
      success: {
        main: tokens.success.main,
        light: tokens.success.light,
        dark: tokens.success.dark,
        contrastText: tokens.success.contrast,
      },
      warning: {
        main: tokens.warning.main,
        light: tokens.warning.light,
        dark: tokens.warning.dark,
        contrastText: tokens.warning.contrast,
      },
      error: {
        main: tokens.error.main,
        light: tokens.error.light,
        dark: tokens.error.dark,
        contrastText: tokens.error.contrast,
      },
      info: {
        main: tokens.info.main,
        light: tokens.info.light,
        dark: tokens.info.dark,
        contrastText: tokens.info.contrast,
      },
      text: {
        primary: tokens.text.primary,
        secondary: tokens.text.secondary,
        disabled: tokens.text.disabled,
      },
      background: {
        default: tokens.background.default,
        paper: tokens.background.paper,
      },
      divider: tokens.divider,
      action: {
        active: tokens.action.active,
        hover: tokens.action.hover,
        selected: tokens.action.selected,
        disabled: tokens.action.disabled,
        disabledBackground: tokens.action.disabledBackground,
        focus: tokens.action.focus,
      },
    },

    typography: {
      fontFamily: designTokens.typography.fontFamily.primary,
      fontSize: 16,
      h1: {
        fontSize: designTokens.typography.fontSize['5xl'],
        fontWeight: designTokens.typography.fontWeight.bold,
        lineHeight: designTokens.typography.lineHeight.tight,
      },
      h2: {
        fontSize: designTokens.typography.fontSize['4xl'],
        fontWeight: designTokens.typography.fontWeight.bold,
        lineHeight: designTokens.typography.lineHeight.tight,
      },
      h3: {
        fontSize: designTokens.typography.fontSize['3xl'],
        fontWeight: designTokens.typography.fontWeight.semibold,
        lineHeight: designTokens.typography.lineHeight.snug,
      },
      h4: {
        fontSize: designTokens.typography.fontSize['2xl'],
        fontWeight: designTokens.typography.fontWeight.semibold,
        lineHeight: designTokens.typography.lineHeight.snug,
      },
      h5: {
        fontSize: designTokens.typography.fontSize.xl,
        fontWeight: designTokens.typography.fontWeight.semibold,
        lineHeight: designTokens.typography.lineHeight.normal,
      },
      h6: {
        fontSize: designTokens.typography.fontSize.lg,
        fontWeight: designTokens.typography.fontWeight.semibold,
        lineHeight: designTokens.typography.lineHeight.normal,
      },
      body1: {
        fontSize: designTokens.typography.fontSize.base,
        fontWeight: designTokens.typography.fontWeight.regular,
        lineHeight: designTokens.typography.lineHeight.normal,
      },
      body2: {
        fontSize: designTokens.typography.fontSize.sm,
        fontWeight: designTokens.typography.fontWeight.regular,
        lineHeight: designTokens.typography.lineHeight.normal,
      },
      subtitle1: {
        fontSize: designTokens.typography.fontSize.base,
        fontWeight: designTokens.typography.fontWeight.medium,
        lineHeight: designTokens.typography.lineHeight.normal,
      },
      subtitle2: {
        fontSize: designTokens.typography.fontSize.sm,
        fontWeight: designTokens.typography.fontWeight.medium,
        lineHeight: designTokens.typography.lineHeight.normal,
      },
      button: {
        fontSize: designTokens.typography.fontSize.sm,
        fontWeight: designTokens.typography.fontWeight.medium,
        lineHeight: designTokens.typography.lineHeight.normal,
        textTransform: 'none',
      },
      caption: {
        fontSize: designTokens.typography.fontSize.xs,
        fontWeight: designTokens.typography.fontWeight.regular,
        lineHeight: designTokens.typography.lineHeight.normal,
      },
      overline: {
        fontSize: designTokens.typography.fontSize.xs,
        fontWeight: designTokens.typography.fontWeight.semibold,
        lineHeight: designTokens.typography.lineHeight.normal,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      },
    },

    shape: {
      borderRadius: designTokens.borderRadius.md,
    },

    spacing: 8, // Base spacing unit (8px)

    breakpoints: {
      values: designTokens.breakpoints,
    },

    shadows: [
      'none',
      designTokens.shadows.sm,
      designTokens.shadows.md,
      designTokens.shadows.lg,
      designTokens.shadows.xl,
      designTokens.shadows['2xl'],
      designTokens.shadows.google.sm,
      designTokens.shadows.google.md,
      designTokens.shadows.google.lg,
      designTokens.shadows.xl,
      designTokens.shadows.xl,
      designTokens.shadows['2xl'],
      designTokens.shadows['2xl'],
      designTokens.shadows['2xl'],
      designTokens.shadows['2xl'],
      designTokens.shadows['2xl'],
      designTokens.shadows['2xl'],
      designTokens.shadows['2xl'],
      designTokens.shadows['2xl'],
      designTokens.shadows['2xl'],
      designTokens.shadows['2xl'],
      designTokens.shadows['2xl'],
      designTokens.shadows['2xl'],
      designTokens.shadows['2xl'],
      designTokens.shadows['2xl'],
    ],

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: tokens.background.default,
            color: tokens.text.primary,
            transition: 'background-color 0.3s ease, color 0.3s ease',
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: tokens.background.paper,
            color: tokens.text.primary,
            boxShadow: designTokens.shadows.google.sm,
            borderBottom: `1px solid ${tokens.border.light}`,
          },
        },
      },

      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: tokens.background.paper,
            borderRight: `1px solid ${tokens.border.light}`,
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: tokens.background.paper,
            boxShadow: designTokens.shadows.google.sm,
            borderRadius: designTokens.borderRadius.lg,
            border: `1px solid ${tokens.border.light}`,
            transition: `box-shadow ${designTokens.transitions.duration.standard}ms ${designTokens.transitions.easing.easeInOut}, transform ${designTokens.transitions.duration.standard}ms ${designTokens.transitions.easing.easeInOut}`,
            '&:hover': {
              boxShadow: designTokens.shadows.google.md,
              transform: 'translateY(-2px)',
            },
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: designTokens.borderRadius.full,
            textTransform: 'none',
            fontWeight: designTokens.typography.fontWeight.medium,
            padding: `${designTokens.spacing.sm}px ${designTokens.spacing.lg}px`,
            fontSize: designTokens.typography.fontSize.sm,
            transition: `all ${designTokens.transitions.duration.standard}ms ${designTokens.transitions.easing.easeInOut}`,
          },
          contained: {
            boxShadow: designTokens.shadows.google.sm,
            '&:hover': {
              boxShadow: designTokens.shadows.google.md,
              transform: 'translateY(-1px)',
            },
            '&:active': {
              transform: 'translateY(0)',
            },
          },
          outlined: {
            borderWidth: '2px',
            borderColor: tokens.border.main,
            '&:hover': {
              borderWidth: '2px',
              backgroundColor: tokens.action.hover,
            },
          },
          text: {
            '&:hover': {
              backgroundColor: tokens.action.hover,
            },
          },
        },
      },

      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: designTokens.borderRadius.md,
            transition: `all ${designTokens.transitions.duration.short}ms ${designTokens.transitions.easing.easeInOut}`,
            '&:hover': {
              backgroundColor: tokens.action.hover,
              transform: 'scale(1.05)',
            },
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: designTokens.borderRadius.full,
            fontWeight: designTokens.typography.fontWeight.medium,
            fontSize: designTokens.typography.fontSize.xs,
            height: '28px',
          },
        },
      },

      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: designTokens.borderRadius.md,
              backgroundColor: tokens.background.paper,
              transition: `all ${designTokens.transitions.duration.short}ms ${designTokens.transitions.easing.easeInOut}`,
              '& fieldset': {
                borderColor: tokens.border.main,
                borderWidth: '1px',
              },
              '&:hover fieldset': {
                borderColor: tokens.border.dark,
              },
              '&.Mui-focused': {
                boxShadow: `0 0 0 3px ${mode === 'light' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(167, 139, 250, 0.2)'}`,
                '& fieldset': {
                  borderColor: tokens.primary.main,
                  borderWidth: '2px',
                },
              },
            },
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: tokens.background.paper,
            backgroundImage: 'none',
          },
          elevation1: {
            boxShadow: designTokens.shadows.sm,
          },
          elevation2: {
            boxShadow: designTokens.shadows.md,
          },
          elevation3: {
            boxShadow: designTokens.shadows.lg,
          },
        },
      },

      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: tokens.divider,
          },
        },
      },

      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: designTokens.borderRadius.md,
            marginBottom: designTokens.spacing.xs,
            transition: `all ${designTokens.transitions.duration.short}ms ${designTokens.transitions.easing.easeInOut}`,
            '&:hover': {
              backgroundColor: tokens.action.hover,
              transform: 'translateX(4px)',
            },
            '&.Mui-selected': {
              backgroundColor: tokens.action.selected,
              borderLeft: `3px solid ${tokens.primary.main}`,
              '&:hover': {
                backgroundColor: tokens.action.selected,
              },
            },
          },
        },
      },

      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: mode === 'light' ? tokens.text.primary : tokens.background.elevated,
            color: mode === 'light' ? tokens.background.paper : tokens.text.primary,
            fontSize: designTokens.typography.fontSize.xs,
            borderRadius: designTokens.borderRadius.md,
            padding: `${designTokens.spacing.xs}px ${designTokens.spacing.sm}px`,
            boxShadow: designTokens.shadows.lg,
          },
        },
      },

      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: designTokens.borderRadius.full,
            height: 8,
            backgroundColor: tokens.action.disabledBackground,
          },
          bar: {
            borderRadius: designTokens.borderRadius.full,
          },
        },
      },

      MuiSwitch: {
        styleOverrides: {
          root: {
            width: 42,
            height: 26,
            padding: 0,
          },
          switchBase: {
            padding: 1,
            '&.Mui-checked': {
              transform: 'translateX(16px)',
              '& + .MuiSwitch-track': {
                backgroundColor: tokens.primary.main,
                opacity: 1,
              },
            },
          },
          thumb: {
            width: 24,
            height: 24,
          },
          track: {
            borderRadius: 13,
            backgroundColor: tokens.action.disabledBackground,
            opacity: 1,
          },
        },
      },
    },
  };

  return createTheme(themeOptions);
};

// Export default light theme for backward compatibility
export const theme = createLearnFlowTheme('light');
export default theme;
