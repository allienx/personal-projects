import { UseQueryOptions } from '@tanstack/react-query/src/types'
import { sortBy } from 'lodash'
import { useMemo } from 'react'
import { appHttpClient } from 'src/http/app-http-client'
import getTtpLocationDisplayName from 'src/http/ttp/get-ttp-location-display-name'
import TtpApi from 'src/http/ttp/ttp-api'
import { TtpApiListResponse } from 'src/http/ttp/ttp-api-response'
import { TtpLocation } from 'src/http/ttp/ttp-location'
import { TtpService } from 'src/http/ttp/ttp-service'
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
