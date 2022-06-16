import { Box, BoxProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface PageContentProps extends BoxProps {
  children: ReactNode
}

export default function MainContent({ children, ...props }: PageContentProps) {
  return (
    <Box as="main" flexGrow={1} {...props}>
      {children}
    </Box>
  )
}
