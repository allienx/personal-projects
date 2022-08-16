import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/700.css'

import { CheckIcon, CopyIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  IconButton,
  Text,
  Tooltip,
  useClipboard,
} from '@chakra-ui/react'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { PageHeader, PageWrapper } from 'ui'

export interface IndexPageProps {
  ipAddress: string
}

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async (
  context,
) => {
  const { req } = context
  const ipAddress = (req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress ||
    '') as string

  return {
    props: {
      ipAddress,
    },
  }
}

export default function HomePage({
  ipAddress,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { hasCopied, onCopy } = useClipboard(ipAddress)

  return (
    <PageWrapper maxWidth={640}>
      <PageHeader title="ip taco" />

      <Flex alignItems="center" justifyContent="center">
        <Box bgColor="gray.100" borderRadius={4} p={4}>
          <Text fontFamily="mono" fontSize="2xl">
            {ipAddress}
          </Text>
        </Box>

        <Tooltip label={!hasCopied ? 'Copy to clipboard' : ''}>
          <IconButton
            aria-label="Copy to clipboard"
            colorScheme={hasCopied ? 'green' : 'orange'}
            icon={hasCopied ? <CheckIcon /> : <CopyIcon />}
            ml={5}
            variant="outline"
            onClick={!hasCopied ? onCopy : undefined}
          />
        </Tooltip>
      </Flex>
    </PageWrapper>
  )
}
