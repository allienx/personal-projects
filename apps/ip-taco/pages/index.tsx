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
import IpAddressLookup from 'components/app/ip-lookup/ip-address-lookup'
import LogoIcon from 'components/lib/icons/logo-icon'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { AboutInfo, PageContent, PageFooter, PageHeader, PageWrapper } from 'ui'

export interface IndexPageProps {
  ipAddress: string
}

// The IP address can be a string with multiple IPs joined by a comma.
// e.g. '77.32.234.23, 101.32.0.109'
const getFirstIpAddress = (ip: string) => {
  return ip.split(',').map((str) => str.trim())[0]
}

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async (
  context,
) => {
  const { req } = context
  const ipAddresses =
    req.headers['x-forwarded-for'] || req.socket.remoteAddress || ''
  const ipAddress = Array.isArray(ipAddresses)
    ? getFirstIpAddress(ipAddresses[0])
    : getFirstIpAddress(ipAddresses)

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
      <PageHeader icon={<LogoIcon boxSize="2.5em" ml={5} />} title="ip taco" />

      <PageContent>
        <Flex alignItems="center" justifyContent="center">
          <Box bgColor="gray.100" borderRadius={4} p={4}>
            <Text fontFamily="mono" fontSize="2xl">
              {ipAddress}
            </Text>
          </Box>

          <Tooltip label={!hasCopied ? 'Copy to clipboard' : ''}>
            <IconButton
              aria-label="Copy to clipboard"
              colorScheme={hasCopied ? 'green' : 'blue'}
              icon={hasCopied ? <CheckIcon /> : <CopyIcon />}
              ml={5}
              variant="outline"
              onClick={!hasCopied ? onCopy : undefined}
            />
          </Tooltip>
        </Flex>

        <IpAddressLookup boxProps={{ mt: 12 }} ipAddress={ipAddress} />
      </PageContent>

      <PageFooter>
        <AboutInfo githubRepoUrl="https://github.com/allienx/personal-projects/tree/main/apps/ip-taco" />
      </PageFooter>
    </PageWrapper>
  )
}
