import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "@mui/material/styles";
import theme from './theme.js';
import "@fontsource/philosopher/400.css";
import "@fontsource/philosopher/700.css";
import "@fontsource/roboto-slab/400.css"; // Regular
import "@fontsource/roboto-slab/700.css"; // Bold


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </StrictMode>,
)
