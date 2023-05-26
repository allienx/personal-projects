import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/700.css'

import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { theme } from 'src/config/theme/theme'
import HomePage from 'src/pages/home-page'

const container = document.getElementById('app')
const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <ChakraProvider resetCSS={false} theme={theme}>
      <HomePage />
    </ChakraProvider>
  </React.StrictMode>,
)
