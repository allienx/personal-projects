import { Box } from '@chakra-ui/react'
import type { BoxProps } from '@chakra-ui/react'
import type { ReactNode } from 'react'

interface PageFooterProps extends BoxProps {
  children: ReactNode
}

export default function PageFooter({ children, ...props }: PageFooterProps) {
  return (
    <Box
      alignItems="center"
      as="footer"
      display="flex"
      flexDirection="column"
      flexShrink={0}
      justifyContent="center"
      pb={4}
      pt={8}
      {...props}
    >
      {children}
    </Box>
  )
}
