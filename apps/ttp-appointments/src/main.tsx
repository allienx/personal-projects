import { Center, ChakraProvider } from '@chakra-ui/react'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/700.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import { AwsCognitoDefinition } from 'react-oauth/lib/definitions/aws-cognito-definition'
import { OauthDefinitionType } from 'react-oauth/lib/definitions/oauth-definition-type'
import OauthProvider from 'react-oauth/lib/oauth-provider'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoadingSpinner from 'src/components/spinner/loading-spinner'
import createQueryClient from 'src/config/create-query-client'
import { EnvVars } from 'src/config/env-vars'
import { theme } from 'src/config/theme/theme'
import HttpClientInitializer from 'src/http/http-client-initializer'
import appRoutes from 'src/pages/_app-routes'

const queryClient = createQueryClient()

const container = document.getElementById('app')
const root = createRoot(container!)

const oauthDefinition: AwsCognitoDefinition = {
  type: OauthDefinitionType.AwsCognito,
  config: {
    clientId: EnvVars.OauthClientId,
    redirectUrl: `${window.location.origin}/auth`,
    responseType: 'code',
    userPoolUrl: EnvVars.OauthBaseUrl,
  },
}

const router = createBrowserRouter(appRoutes)

root.render(
  <ChakraProvider resetCSS theme={theme}>
    <QueryClientProvider client={queryClient}>
      <OauthProvider
        definition={oauthDefinition}
        loader={
          <Center height="100vh">
            <LoadingSpinner />
          </Center>
        }
      >
        <HttpClientInitializer />

        <RouterProvider router={router} />
      </OauthProvider>
    </QueryClientProvider>
  </ChakraProvider>,
)
