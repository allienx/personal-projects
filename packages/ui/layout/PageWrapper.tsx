import { Box, BoxProps } from '@chakra-ui/react'
import type { ReactNode } from 'react'

interface PageWrapperProps extends BoxProps {
  children: ReactNode
}

export default function PageWrapper({
  children,
  ...boxProps
}: PageWrapperProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      margin="0 auto"
      minHeight="100vh"
      px={5}
      {...boxProps}
    >
      {children}
    </Box>
  )
}
