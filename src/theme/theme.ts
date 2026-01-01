import { createTheme } from '@mui/material/styles';

// Google-inspired color palette
const googleColors = {
  primary: {
    main: '#1976d2', // Google Blue
    light: '#42a5f5',
    dark: '#1565c0',
  },
  secondary: {
    main: '#4caf50', // Google Green
    light: '#81c784',
    dark: '#388e3c',
  },
  error: {
    main: '#f44336', // Google Red
    light: '#e57373',
    dark: '#d32f2f',
  },
  warning: {
    main: '#ff9800', // Google Orange
    light: '#ffb74d',
    dark: '#f57c00',
  },
  info: {
    main: '#2196f3', // Google Light Blue
    light: '#64b5f6',
    dark: '#1976d2',
  },
  success: {
    main: '#4caf50', // Google Green
    light: '#81c784',
    dark: '#388e3c',
  },
  background: {
    default: '#fafafa',
    paper: '#ffffff',
  },
  text: {
    primary: '#202124', // Google's primary text color
    secondary: '#5f6368', // Google's secondary text color
  },
};

export const theme = createTheme({
  palette: {
    mode: 'light',
    ...googleColors,
  },
  typography: {
    fontFamily: [
      'Google Sans',
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 400,
      lineHeight: 1.2,
      color: '#202124',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 400,
      lineHeight: 1.3,
      color: '#202124',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 400,
      lineHeight: 1.3,
      color: '#202124',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#202124',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#202124',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#202124',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#202124',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.4,
      color: '#5f6368',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#202124',
          boxShadow: '0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)',
          borderRadius: '8px',
          '&:hover': {
            boxShadow: '0 1px 3px 0 rgba(60,64,67,.3), 0 4px 8px 3px rgba(60,64,67,.15)',
            transition: 'box-shadow 0.3s ease',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 24px',
        },
        contained: {
          boxShadow: '0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)',
          '&:hover': {
            boxShadow: '0 1px 3px 0 rgba(60,64,67,.3), 0 4px 8px 3px rgba(60,64,67,.15)',
          },
        },
        outlined: {
          borderColor: '#dadce0',
          color: '#1976d2',
          '&:hover': {
            borderColor: '#1976d2',
            backgroundColor: 'rgba(25, 118, 210, 0.04)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          height: '32px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            '& fieldset': {
              borderColor: '#dadce0',
            },
            '&:hover fieldset': {
              borderColor: '#1976d2',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1976d2',
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid #e0e0e0',
          backgroundColor: '#fafafa',
        },
      },
    },
  },
});

export default theme;