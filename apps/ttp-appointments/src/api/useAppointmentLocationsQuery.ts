import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import getLocations from 'src/api/getLocations'
import { AppointmentLocationsApiResponse } from 'src/api/types/LocationsApi'

export default function useAppointmentLocationsQuery(
  opts?: UseQueryOptions<AppointmentLocationsApiResponse | null, null>,
) {
  const appointmentLocationsQuery = useQuery<
    AppointmentLocationsApiResponse | null,
    null
  >({
    queryKey: ['locations'],
    queryFn: getLocations,
    cacheTime: Infinity,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: 'always',
    ...opts,
  })

  return {
    appointmentLocationsQuery,
    appointmentLocations: appointmentLocationsQuery.data?.data || [],
  }
}
