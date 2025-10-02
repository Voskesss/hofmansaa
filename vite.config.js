import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // Development (lokaal): altijd /
  // Vercel (productie): altijd /
  // GitHub Pages: /hofmansaa/
  base: mode === 'development' || process.env.VERCEL ? '/' : '/hofmansaa/'
}));
