import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/movie-app/',
  server: {
    proxy: {
      '/users/': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/movie-app/, ''),
      },
      '/favorites/': { // Add this new proxy rule
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/movie-app/, ''),
      },
    },
  },
});
