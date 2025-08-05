import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4520,
    proxy: {
      '/storage': {
        target: 'http://localhost:4010',
        changeOrigin: true,
      }
    }
  }
})
