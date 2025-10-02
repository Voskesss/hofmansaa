import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vercel gebruikt automatisch VERCEL=1, GitHub Pages gebruikt niets
  base: process.env.VERCEL ? '/' : '/hofmansaa/'
});
