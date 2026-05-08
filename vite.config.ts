import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/Agroscaner-2.0/',
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Bind to all available network interfaces
    port: 8080, // Default port, change if necessary
  },
});
