import { UseQueryOptions } from '@tanstack/react-query/src/types'
import TtpApi from 'src/http/ttp/ttp-api'
import { TtpApiListResponse } from 'src/http/ttp/ttp-api-response'
import { TtpLocation } from 'src/http/ttp/ttp-location'
import { TtpService } from 'src/http/ttp/ttp-service'
import useHttpQuery from 'src/http/use-http-query'

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
  const ttpLocations = ttpLocationsQuery.data?.records as TtpLocation[]

  return {
    ttpLocationsQuery,
    ttpLocations,
  }
}
