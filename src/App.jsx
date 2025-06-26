import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Trainingen from './pages/Trainingen';
import Contact from './pages/Contact';
import Voertuigtechniek from './pages/Voertuigtechniek';
import LLO from './pages/LLO';
import NederlandsRekenen from './pages/NederlandsRekenen';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e3a8a', // Donkerblauw voor automotive
    },
    secondary: {
      main: '#f59e0b', // Warm oranje als accentkleur
    },
    background: {
      default: '#f8fafc', // Lichte achtergrond voor modern gevoel
    },
  },
  typography: {
    fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Oxygen, Ubuntu, Cantarell, "Open Sans", sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.8)', // Glass effect
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
          borderRadius: 16,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.8)', // Glass effect voor dialogs en menus
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '10px 20px',
          fontWeight: 'bold',
        },
        contained: {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trainingen" element={<Trainingen />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/voertuigtechniek" element={<Voertuigtechniek />} />
        <Route path="/llo" element={<LLO />} />
        <Route path="/nederlands-rekenen" element={<NederlandsRekenen />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
