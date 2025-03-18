import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
    server: {
      proxy: {
        "/api": {
          target: "http://www.logicnsolution.com:8085",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
});
