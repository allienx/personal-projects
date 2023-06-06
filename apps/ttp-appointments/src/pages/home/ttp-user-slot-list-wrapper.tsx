import { Alert, AlertIcon, Box, BoxProps, Center } from '@chakra-ui/react'
import LoadingSpinner from 'src/components/spinner/loading-spinner'
import TtpApi from 'src/http/ttp/ttp-api'
import { TtpApiListResponse } from 'src/http/ttp/ttp-api-response'
import { TtpUserSlot } from 'src/http/ttp/ttp-user-slot'
import useHttpQuery from 'src/http/use-http-query'

interface TtpUserSlotListWrapperProps {
  boxProps?: BoxProps
}

export default function TtpUserSlotListWrapper({
  boxProps,
}: TtpUserSlotListWrapperProps) {
  const ttpUserSlotsQuery = useHttpQuery<
    TtpApiListResponse<TtpUserSlot.IndexRecord>
  >({
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
        ttpUserSlots &&
        ttpUserSlots.map((userSlot) => {
          return <div key={userSlot.id}>{userSlot.id}</div>
        })}
    </Box>
  )
}
