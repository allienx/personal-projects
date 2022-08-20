import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  Spinner,
} from '@chakra-ui/react'
import type { BoxProps } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import getIpAddressLookup from 'components/app/ip-lookup/get-ip-address-lookup'
import IpAddressLookupData from 'components/app/ip-lookup/ip-address-lookup-data'
import type {
  IpLookupErrorResponse,
  IpLookupResponse,
} from 'pages/api/ip-lookup'

export interface IpAddressLookupProps {
  boxProps?: BoxProps
  ipAddress: string
}

export default function IpAddressLookup({
  boxProps,
  ipAddress,
}: IpAddressLookupProps) {
  const lookupQuery = useQuery<
    AxiosResponse<IpLookupResponse>,
    AxiosError<IpLookupErrorResponse>
  >(['ip-lookup'], async () => {
    return getIpAddressLookup(ipAddress)
  })
  const lookupQueryRes = lookupQuery.data

  return (
    <Box {...boxProps}>
      <>
        {lookupQuery.isLoading && (
          <Center>
            <Spinner
              color="blue.500"
              emptyColor="gray.200"
              size="xl"
              thickness="4px"
            />
          </Center>
        )}

        {!lookupQuery.isLoading && lookupQuery.error && (
          <Center>
            <Alert maxWidth={450} status="error">
              <AlertIcon />
              <AlertTitle>API Error</AlertTitle>
              <AlertDescription>
                {lookupQuery.error.response?.data.message ||
                  lookupQuery.error.message}
              </AlertDescription>
            </Alert>
          </Center>
        )}

        {!lookupQuery.isLoading && !lookupQuery.error && lookupQueryRes && (
          <IpAddressLookupData ipLookup={lookupQueryRes.data.data} />
        )}
      </>
    </Box>
  )
}
