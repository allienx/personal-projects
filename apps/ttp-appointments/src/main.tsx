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
import { EnvVars } from 'src/config/env-vars'
import { theme } from 'src/config/theme/theme'
import { updateAppHttpClientToken } from 'src/http/app-http-client'
import appRoutes from 'src/pages/_app-routes'
import createQueryClient from 'ui/lib/http/create-query-client'

const container = document.getElementById('app')
const root = createRoot(container!)

const queryClient = createQueryClient({
  defaultOptions: {
    queries: {
      staleTime: EnvVars.isDev ? 60 * 60 * 1000 : undefined,
    },
  },
})

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
            <LoadingSpinner size="xl" />
          </Center>
        }
        onAccessTokenChange={updateAppHttpClientToken}
      >
        <RouterProvider router={router} />
      </OauthProvider>
    </QueryClientProvider>
  </ChakraProvider>,
)
