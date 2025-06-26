import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Trainingen from './pages/Trainingen';
import Contact from './pages/Contact';
import Voertuigtechniek from './pages/Voertuigtechniek';
import LLO from './pages/LLO';
import NederlandsRekenen from './pages/NederlandsRekenen';
import NietTechnisch from './pages/NietTechnisch';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a4b8c', // Rijk, diep blauw voor betrouwbaarheid en professionaliteit
      light: '#4d7ab8', // Lichtere variant voor hover states
      dark: '#0d2e5c', // Donkerdere variant voor nadruk
    },
    secondary: {
      main: '#ff6b35', // Levendig oranje voor speelse accenten
      light: '#ff9468', // Lichtere variant
      dark: '#cc4a1a', // Donkerdere variant
    },
    tertiary: {
      main: '#2ec4b6', // Turquoise als derde kleur voor speelse elementen
      light: '#5edbcf',
      dark: '#1a9e92',
    },
    background: {
      default: '#f9fafb', // Zeer lichte grijstint voor moderne uitstraling
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b', // Donkere tekst, maar niet volledig zwart voor zachtheid
      secondary: '#475569',
    },
    success: {
      main: '#10b981', // Modern groen
    },
    info: {
      main: '#3b82f6', // Helder blauw
    },
    warning: {
      main: '#f59e0b', // Warm oranje
    },
    error: {
      main: '#ef4444', // Levendig rood
    },
  },
  typography: {
    fontFamily: '"Nunito", "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '2.75rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.3,
      letterSpacing: '-0.005em',
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.75rem',
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 600,
      fontSize: '0.875rem',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700&display=swap');
        
        html, body {
          scroll-behavior: smooth;
        }
        
        /* Subtiele animaties voor links en interactieve elementen */
        a, button, .MuiButtonBase-root {
          transition: all 0.3s ease;
        }
      `,
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: 16,
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 10,
          padding: '10px 24px',
          fontWeight: 600,
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            transform: 'scaleX(0)',
            transformOrigin: 'right',
            transition: 'transform 0.3s ease-out',
          },
          '&:hover::after': {
            transform: 'scaleX(1)',
            transformOrigin: 'left',
          },
        },
        contained: {
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.18)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #1a4b8c, #2563eb)',
          '&:hover': {
            background: 'linear-gradient(45deg, #0d2e5c, #1e40af)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(45deg, #ff6b35, #ff9468)',
          '&:hover': {
            background: 'linear-gradient(45deg, #cc4a1a, #ff6b35)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            transition: 'box-shadow 0.3s ease',
            '&:hover': {
              boxShadow: '0 0 0 2px rgba(26, 75, 140, 0.1)',
            },
            '&.Mui-focused': {
              boxShadow: '0 0 0 3px rgba(26, 75, 140, 0.2)',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(26, 75, 140, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          margin: '2px 8px',
          padding: '8px 16px',
          '&:hover': {
            backgroundColor: 'rgba(26, 75, 140, 0.08)',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&:hover': {
            backgroundColor: 'rgba(26, 75, 140, 0.08)',
          },
        },
      },
    },
  },
});

function App() {
  const navigate = useNavigate();

  // Verwerk de omleiding van 404.html
  useEffect(() => {
    // Controleer of er een opgeslagen route is in sessionStorage
    const redirectRoute = sessionStorage.getItem('redirect_route');
    if (redirectRoute && redirectRoute !== '/') {
      // Verwijder de opgeslagen route
      sessionStorage.removeItem('redirect_route');
      // Navigeer naar de opgeslagen route
      navigate(redirectRoute);
    }
  }, [navigate]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trainingen" element={<Trainingen />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/voertuigtechniek" element={<Voertuigtechniek />} />
        <Route path="/llo" element={<LLO />} />
        <Route path="/nederlands-rekenen" element={<NederlandsRekenen />} />
        <Route path="/niet-technisch" element={<NietTechnisch />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
