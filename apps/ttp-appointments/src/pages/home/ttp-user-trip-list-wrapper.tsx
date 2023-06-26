import { Alert, AlertIcon, Box, BoxProps, Center } from '@chakra-ui/react'
import LoadingSpinner from 'src/components/spinner/loading-spinner'
import { appHttpClient } from 'src/http/app-http-client'
import TtpApi from 'src/http/ttp-api'
import { TtpApiListResponse } from 'src/http/ttp-api-response'
import { TtpUserTrip } from 'src/models/ttp-user-trip/ttp-user-trip'
import TtpUserTripList from 'src/pages/home/ttp-user-trip-list'
import useHttpQuery from 'ui/lib/http/use-http-query'

interface TtpUserTripListWrapperProps {
  boxProps?: BoxProps
}

export default function TtpUserTripListWrapper({
  boxProps,
}: TtpUserTripListWrapperProps) {
  const ttpUserTripsQuery = useHttpQuery<
    TtpApiListResponse<TtpUserTrip.IndexRecord>
  >({
    httpClient: appHttpClient,
    url: TtpApi.userTripsUrl(),
  })
  const { records: ttpUserTrips } = ttpUserTripsQuery.data || {}

  return (
    <Box {...boxProps}>
      {ttpUserTripsQuery.isFetching && !ttpUserTripsQuery.isError && (
        <Center>
          <LoadingSpinner />
        </Center>
      )}

      {!ttpUserTripsQuery.isFetching && ttpUserTripsQuery.isError && (
        <Alert status="error">
          <AlertIcon />
          There was an error loading your appointment searches.
        </Alert>
      )}

      {!ttpUserTripsQuery.isFetching &&
        !ttpUserTripsQuery.isError &&
        ttpUserTrips && <TtpUserTripList ttpUserTrips={ttpUserTrips} />}
    </Box>
  )
}
