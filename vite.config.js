import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // Ensure this is just `react()` and not `react({ jsxRuntime: 'classic' })`
})
