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
      '/api/locations': {
        target:
          'https://d7gqolvzu4eus4vys5x75lytpm0fgzxh.lambda-url.us-east-2.on.aws',
        changeOrigin: true,
        prependPath: false,
      },
      '/api/slots': {
        target:
          'https://me63q6uiwxolyxtkgk75naatxy0jfmsa.lambda-url.us-east-2.on.aws',
        changeOrigin: true,
        prependPath: false,
      },
    },
  },

  preview: {
    proxy: {
      '/api/locations': {
        target:
          'https://d7gqolvzu4eus4vys5x75lytpm0fgzxh.lambda-url.us-east-2.on.aws',
        rewrite: (path) => path.replace(/^\/api\/locations/, ''),
      },
      '/api/slots': {
        target:
          'https://me63q6uiwxolyxtkgk75naatxy0jfmsa.lambda-url.us-east-2.on.aws',
        rewrite: (path) => path.replace(/^\/api\/slots/, ''),
      },
    },
  },
})
