'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { HelmetProvider } from 'react-helmet-async';
import theme from '../src/theme';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';

export default function Providers({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin') ?? false;

  return (
    <AppRouterCacheProvider>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          {children}
          {!isAdminRoute && <Footer />}
        </ThemeProvider>
      </HelmetProvider>
    </AppRouterCacheProvider>
  );
}
