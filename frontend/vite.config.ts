import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
<<<<<<< HEAD
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const target = env.VITE_BACKEND_URL || 'http://localhost:3000'

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api': {
          target,
          changeOrigin: true,
          secure: false,
        },
=======
export default defineConfig({
  plugins: [react(),tailwindcss()],
   server: {
    proxy: {
      "/api": {
        target: "https://morrow-tccs.onrender.com",
        changeOrigin: true,
>>>>>>> fb4a1b0764ede5b1db344c0061deb483d0ad7129
      },
    },
  }
})

