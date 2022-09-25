/* eslint-disable import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],

  server: {
    open: true,
    port: 3004,
    proxy: {
      '/.netlify': 'https://imaginative-sprite-9f6df6.netlify.app',
    },
  },

  preview: {
    proxy: {
      '/.netlify': 'https://imaginative-sprite-9f6df6.netlify.app',
    },
  },
})
