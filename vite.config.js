import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Altijd / gebruiken - GitHub Pages deployment gebeurt via apart build proces
  base: '/',
  // Proxy voor lokale development: stuur /api calls door naar productie
  server: {
    proxy: {
      '/api': {
        target: 'https://hofmansautomotiveacademie.nl',
        changeOrigin: true,
        secure: true
      }
    }
  }
});
