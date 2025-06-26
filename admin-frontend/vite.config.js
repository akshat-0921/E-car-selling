import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
   plugins: [react()],
   server: {
      port: 5001,         // 👈 Your custom port!
      open: true,         // Opens browser automatically (optional)
      proxy: {
         // If you want to avoid CORS during local dev:
         // '/api': 'http://localhost:4000'
      }
   }
})
