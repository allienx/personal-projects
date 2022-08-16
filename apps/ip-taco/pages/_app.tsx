import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { theme } from 'config/theme/theme'
import Head from 'next/head'

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>ip taco</title>
      </Head>

      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
