import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import HomePage from 'src/pages/home-page'
import { theme } from './config/theme/theme'

const container = document.getElementById('app')
const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <HomePage />
    </ChakraProvider>
  </React.StrictMode>,
)
