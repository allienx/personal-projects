import { Box, BoxProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

export interface SearchListProps {
  boxProps?: BoxProps
  children: ReactNode
}

export default function SearchList({ boxProps, children }: SearchListProps) {
  return (
    <Box
      as="ul"
      borderTopColor="gray.200"
      borderTopWidth="1px"
      mt={2}
      pt={4}
      {...boxProps}
    >
      {children}
    </Box>
  )
}
