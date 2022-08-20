import { Box, BoxProps } from '@chakra-ui/react'
import type { ReactNode } from 'react'

export interface PageContentProps extends BoxProps {
  children: ReactNode
}

export default function PageContent({ children, ...props }: PageContentProps) {
  return (
    <Box as="main" flexGrow={1} {...props}>
      {children}
    </Box>
  )
}
