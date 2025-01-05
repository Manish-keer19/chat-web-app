import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'global': 'window', // Polyfill for global variable
  },
  optimizeDeps: {
    include: ['sockjs-client', '@stomp/stompjs'], // Ensure Vite optimizes these dependencies
  },
  build:{
    outDir:'dist-react'
  },
  
  base: './',
})
