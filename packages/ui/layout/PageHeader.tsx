import { Flex, FlexProps, Heading } from '@chakra-ui/react'
import type { ReactNode } from 'react'

interface PageHeaderProps extends FlexProps {
  icon?: ReactNode
  title: string
}

export default function PageHeader({ icon, title }: PageHeaderProps) {
  return (
    <Flex
      alignItems="center"
      as="header"
      flexShrink={0}
      justifyContent="center"
      py={8}
    >
      <Heading as="div" fontFamily="mono" textAlign="center">
        {title}
      </Heading>

      {icon}
    </Flex>
  )
}
