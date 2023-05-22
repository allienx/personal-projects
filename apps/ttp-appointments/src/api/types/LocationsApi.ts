import { ResponseCode } from 'src/api/types/ResponseCode'

export interface AppointmentLocation {
  id: number
  type: string
  code: string
  name: string
  nameShort: string
  city: string
  province: string
  postalCode: string
  countryCode: string
  timezone: string
}

export interface AppointmentLocationsApiResponse {
  code: ResponseCode
  records: AppointmentLocation[]
}
