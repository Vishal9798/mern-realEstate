import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['bcryptjs', 'express', 'mongoose', 'jsonwebtoken', 'cookie-parser', 'dotenv']
    }
  },
  plugins: [react()],
})
