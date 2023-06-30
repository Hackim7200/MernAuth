import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // server port

    // proxy is used to prewrite part of the url so i dont have to later
    proxy: {
      '/api': { // when you use /api
        target: 'http://localhost:5555', //it is associated to localhost
        changeOrigin: true

      }
    }
  }
})
