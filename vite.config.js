import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Voor custom domain gebruik '/', voor GitHub Pages subfolder gebruik '/hofmansaa/'
  base: process.env.NODE_ENV === 'production' ? '/hofmansaa/' : '/'
});
