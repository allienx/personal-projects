import { Alert, AlertIcon, Box, BoxProps } from '@chakra-ui/react'
import { ReactNode } from 'react'
import LoadingSpinner from 'src/components/spinner/loading-spinner'
import useTtpLocationsQuery from 'src/models/ttp-location/use-ttp-locations-query'

interface HomeContentWrapperProps {
  boxProps?: BoxProps
  children?: ReactNode
}

export default function HomeContentWrapper({
  boxProps,
  children,
}: HomeContentWrapperProps) {
  const { ttpLocationsQuery, ttpLocations } = useTtpLocationsQuery()

  return (
    <Box {...boxProps}>
      {!ttpLocations && ttpLocationsQuery.error && (
        <Alert status="error">
          <AlertIcon />
          There was an error loading available locations.
        </Alert>
      )}

      {!ttpLocations ? (
        <Box display="flex" justifyContent="center" {...boxProps}>
          <LoadingSpinner />
        </Box>
      ) : (
        children
      )}
    </Box>
  )
}
