import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "node:path"
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({resolve: {
    alias: {
      // Absolute path alias
      '@': fileURLToPath(new URL('./src', import.meta.url)),

      // Relative path alias for a different root
      '@components': path.resolve(__dirname, './src/components'),
    }
  },
  plugins: [react()],
})
