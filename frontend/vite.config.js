import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    //   // below 3100 is to replace the default port given by run dev
    port: 3200,
    //   // below is cors implementation
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3200",
      },
    },
  },
})
