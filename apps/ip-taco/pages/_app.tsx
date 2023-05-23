import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { createQueryClient } from 'config/create-query-client'
import type { AppProps } from 'next/app'
import { theme } from 'config/theme/theme'

const queryClient = createQueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ChakraProvider>
  )
}
