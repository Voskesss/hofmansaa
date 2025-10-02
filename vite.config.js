import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [react()],
  // Development (vercel dev, npm run start): altijd /
  // Build voor Vercel productie: /
  // Build voor GitHub Pages: /hofmansaa/
  base: command === 'serve' || process.env.VERCEL === '1' ? '/' : '/hofmansaa/'
}));
