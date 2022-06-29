import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import { Heading } from './components/heading'
import { typography } from './foundations/typography'
import { styles } from './styles'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

// Customize chakra theme at scale:
// https://chakra-ui.com/docs/styled-system/customize-theme#scaling-out-your-project
export const theme = extendTheme({
  ...typography,
  styles,
  config,
  components: {
    Heading,
  },
})
