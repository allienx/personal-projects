import { Alert, AlertIcon, Box, BoxProps, Center } from '@chakra-ui/react'
import LoadingSpinner from 'src/components/spinner/loading-spinner'
import { appHttpClient } from 'src/http/app-http-client'
import TtpApi from 'src/http/ttp-api'
import { TtpApiListResponse } from 'src/http/ttp-api-response'
import { TtpUserSlot } from 'src/models/ttp-user-slot/ttp-user-slot'
import TtpUserSlotList from 'src/pages/home/ttp-user-slot-list'
import useHttpQuery from 'ui/lib/http/use-http-query'

interface TtpUserSlotListWrapperProps {
  boxProps?: BoxProps
}

export default function TtpUserSlotListWrapper({
  boxProps,
}: TtpUserSlotListWrapperProps) {
  const ttpUserSlotsQuery = useHttpQuery<
    TtpApiListResponse<TtpUserSlot.IndexRecord>
  >({
    httpClient: appHttpClient,
    url: TtpApi.userSlotsUrl(),
  })
  const { records: ttpUserSlots } = ttpUserSlotsQuery.data || {}

  return (
    <Box {...boxProps}>
      {ttpUserSlotsQuery.isFetching && !ttpUserSlotsQuery.isError && (
        <Center>
          <LoadingSpinner />
        </Center>
      )}

      {!ttpUserSlotsQuery.isFetching && ttpUserSlotsQuery.isError && (
        <Alert status="error">
          <AlertIcon />
          There was an error loading your appointment searches.
        </Alert>
      )}

      {!ttpUserSlotsQuery.isFetching &&
        !ttpUserSlotsQuery.isError &&
        ttpUserSlots && <TtpUserSlotList ttpUserSlots={ttpUserSlots} />}
    </Box>
  )
}
