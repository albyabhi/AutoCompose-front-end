import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx';
import './index.css';

// Define the custom theme
const theme = createTheme({
  palette: {
    background: {
      default: '#1A1A1D', 
    },
    text: {
      primary: '#eddfe6', 
    },
    primary: {
      main: '#1A1A1D', 
    },
    secondary: {
      main: '#3B1C32', 
    },
    error: {
      main: '#6A1E55', 
    },
    info: {
      main: '#A64D79', 
    },
  },
  typography: {
    fontFamily: 'Titillium Web, sans-serif', // Global font
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
