import { UseQueryOptions } from '@tanstack/react-query/src/types'
import { sortBy } from 'lodash'
import { useMemo } from 'react'
import { appHttpClient } from 'src/http/app-http-client'
import TtpApi from 'src/http/ttp-api'
import { TtpApiListResponse } from 'src/http/ttp-api-response'
import getTtpLocationDisplayName from 'src/models/ttp-location/get-ttp-location-display-name'
import { TtpLocation } from 'src/models/ttp-location/ttp-location'
import { TtpService } from 'src/models/ttp-location/ttp-service'
import useHttpQuery from 'ui/lib/http/use-http-query'

interface UseTtpLocationsQuery {
  queryOpts?: Omit<
    UseQueryOptions<TtpApiListResponse<TtpLocation>, any, any, any>,
    'queryKey' | 'queryFn'
  >
}

export default function useTtpLocationsQuery({
  queryOpts,
}: UseTtpLocationsQuery = {}) {
  const ttpLocationsQuery = useHttpQuery<TtpApiListResponse<TtpLocation>>({
    httpClient: appHttpClient,
    url: TtpApi.locationsUrl(),
    config: {
      params: {
        services: [TtpService.GlobalEntry],
      },
    },
    queryOpts: {
      cacheTime: Infinity,
      staleTime: 60 * 60 * 1000,
      refetchOnMount: false,
      refetchOnWindowFocus: true,
      ...queryOpts,
    },
  })

  const ttpLocations = useMemo(() => {
    return sortBy(ttpLocationsQuery.data?.records || [], (loc) => {
      return getTtpLocationDisplayName(loc)
    })
  }, [ttpLocationsQuery.data?.records])

  return {
    ttpLocationsQuery,
    ttpLocations,
  }
}
