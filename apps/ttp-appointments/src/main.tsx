import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/700.css'

import { Auth0Provider } from '@auth0/auth0-react'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { createRoot } from 'react-dom/client'
import IdentityGuardAndProvider from 'src/components/app/IdentityContext/IdentityGuardAndProvider'
import createQueryClient from 'src/config/createQueryClient'
import { Env } from 'src/config/Env'
import { theme } from 'src/config/theme/theme'
import App from './App'

const queryClient = createQueryClient()

const container = document.getElementById('app')
const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <ChakraProvider resetCSS theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Auth0Provider
          useRefreshTokens
          cacheLocation="localstorage"
          clientId={Env.Auth0ClientId}
          domain={Env.Auth0Domain}
          redirectUri={window.location.origin}
        >
          <IdentityGuardAndProvider>
            <App />
          </IdentityGuardAndProvider>
        </Auth0Provider>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
