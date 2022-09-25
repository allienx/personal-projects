import axios from 'axios'
import { AppointmentLocationsApiResponse } from 'src/api/types/LocationsApi'

export default async function getLocations(): Promise<AppointmentLocationsApiResponse> {
  const url = '.netlify/functions/locations'

  const result = await axios.get(url)

  return result.data
}
