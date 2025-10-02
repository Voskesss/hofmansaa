import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Altijd / gebruiken - GitHub Pages deployment gebeurt via apart build proces
  base: '/'
});
