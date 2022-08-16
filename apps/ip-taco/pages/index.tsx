import '@fontsource/jetbrains-mono/700.css'

import { Text } from '@chakra-ui/react'

import type { NextPage } from 'next'
import { PageHeader, PageWrapper } from 'ui'

const HomePage: NextPage = () => {
  return (
    <PageWrapper maxWidth={640}>
      <PageHeader title="ip taco" />
    </PageWrapper>
  )
}

export default HomePage
