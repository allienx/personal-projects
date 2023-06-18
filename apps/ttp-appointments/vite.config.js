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
      '/api/create-user-slot': createLambdaProxy({
        target:
          'https://rknra6vulmbgg6tsoh4reisvim0gmyzb.lambda-url.us-east-2.on.aws',
      }),
      '/api/delete-user-slot': createLambdaProxy({
        target:
          'https://fijxsxbbg3mxpr6polueq4ez2m0kkcrc.lambda-url.us-east-2.on.aws',
      }),
      '/api/locations': createLambdaProxy({
        target:
          'https://d7gqolvzu4eus4vys5x75lytpm0fgzxh.lambda-url.us-east-2.on.aws',
      }),
      '/api/slots': createLambdaProxy({
        target:
          'https://me63q6uiwxolyxtkgk75naatxy0jfmsa.lambda-url.us-east-2.on.aws',
      }),
      '/api/user-slots': createLambdaProxy({
        target:
          'https://pykmienm6mzkuxgdmvgtztw4dy0qzlmh.lambda-url.us-east-2.on.aws',
      }),
    },
  },

  preview: {
    proxy: {
      '/api/create-user-slot': createLambdaProxy({
        target:
          'https://rknra6vulmbgg6tsoh4reisvim0gmyzb.lambda-url.us-east-2.on.aws',
      }),
      '/api/delete-user-slot': createLambdaProxy({
        target:
          'https://fijxsxbbg3mxpr6polueq4ez2m0kkcrc.lambda-url.us-east-2.on.aws',
      }),
      '/api/locations': createLambdaProxy({
        target:
          'https://d7gqolvzu4eus4vys5x75lytpm0fgzxh.lambda-url.us-east-2.on.aws',
      }),
      '/api/slots': createLambdaProxy({
        target:
          'https://me63q6uiwxolyxtkgk75naatxy0jfmsa.lambda-url.us-east-2.on.aws',
      }),
      '/api/user-slots': createLambdaProxy({
        target:
          'https://pykmienm6mzkuxgdmvgtztw4dy0qzlmh.lambda-url.us-east-2.on.aws',
      }),
    },
  },
})

function createLambdaProxy({ target }) {
  return {
    target,
    changeOrigin: true,
    prependPath: false,
  }
}
