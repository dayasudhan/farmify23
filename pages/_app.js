import { AuthProvider } from './authContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#eafbe7', // light green background
      paper: '#ffffff',
    },
    primary: {
      main: '#398378', // accent green
      contrastText: '#fff',
    },
    secondary: {
      main: '#b2dfdb', // lighter green accent
    },
    success: {
      main: '#7ed957', // vibrant green for highlights
    },
    text: {
      primary: '#2e473b',
      secondary: '#398378',
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;