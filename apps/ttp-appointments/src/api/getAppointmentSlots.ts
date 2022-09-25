import axios from 'axios'
import { AppointmentSlotsApiResponse } from 'src/api/types/AppointmentSlotsApi'

export default async function getAppointmentSlots(
  locationId: string | number,
): Promise<AppointmentSlotsApiResponse> {
  const url = '.netlify/functions/appointment-slots'
  const params = { locationId }

  const result = await axios.get(url, { params })

  return result.data
}
