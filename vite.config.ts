import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
    host: '0.0.0.0',
    port: 5173,
  },
  plugins: [react()],
  base: '/',
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
});
