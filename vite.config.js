import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Tell the plugin to use the 'classic' JSX runtime
  plugins: [
    react({
      jsxRuntime: 'classic'
    })
  ],
})
