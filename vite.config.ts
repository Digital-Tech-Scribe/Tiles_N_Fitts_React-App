import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // Use a subdir base only if building for staging (GitHub Pages)
  base: process.env.VITE_STAGING === 'true' ? '/Tiles_N_Fitts_React-App/' : '/',
}))
