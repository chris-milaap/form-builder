import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: 'Avenir, sans-serif',
    h1: {
      fontSize: '26px',
      fontWeight: 'bold',
      '@media (min-width:960px)': {
        fontSize: '42px',
      },
    },
    h2: {
      fontSize: '22px',
      fontWeight: 'bold',
      '@media (min-width:960px)': {
        fontSize: '30px',
      },
    },
    h3: {
      fontSize: '18px',
      fontWeight: 'medium',
      '@media (min-width:960px)': {
        fontSize: '24px',
      },
    },
    h4: {
      fontSize: '14px',
      fontWeight: 'medium',
      '@media (min-width:960px)': {
        fontSize: '18px',
      },
    },
    h5: {
      fontSize: '12px',
      fontWeight: 'medium',
      '@media (min-width:960px)': {
        fontSize: '14px',
      },
    },
    h6: {
      fontSize: '10px',
      fontWeight: 'medium',
      '@media (min-width:960px)': {
        fontSize: '12px',
      },
    },
    body1: {
      fontSize: '12px',
      '@media (min-width:960px)': {
        fontSize: '14px',
      },
    },
  },
  palette: {
    primary: {
      main: '#9c3353',
    },
    secondary: {
      main: '#ffc1d3',
    },
    text: {
      primary: '#212121',
      secondary: '#542e44',
    },
    background: {
      default: '#ffffff',
      paper: '#ecedee',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '25px',
          boxShadow: '0 0 6px 0 rgba(156, 51, 83, 0.2)',
          textTransform: 'none',
        },
        sizeLarge: {
          fontSize: '14px',
          padding: '15px 0',
          height: '40px',
          '@media (min-width:960px)': {
            fontSize: '20px',
            padding: '20px 0',
            height: '50px',
          },
        },
        sizeMedium: {
          fontSize: '12px',
          padding: '12px 0',
          height: '36px',
          '@media (min-width:960px)': {
            fontSize: '14px',
            padding: '15px 0',
          },
        },
        sizeSmall: {
          fontSize: '10px',
          padding: '10px 0',
          height: '30px',
          '@media (min-width:960px)': {
            fontSize: '12px',
            padding: '12px 0',
          },
        },
      },
    },
  },
});

export default theme;