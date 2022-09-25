import { ResponseCode } from 'src/api/types/ResponseCode'

export interface TtpSlot {
  locationId: string
  startTimestamp: string
  endTimestamp: string
  active: boolean
  duration: number
  remoteInd: boolean
}

export interface AppointmentSlot {
  active: boolean
  startTime: string
  endTime: string
  durationMins: number
}

export interface AppointmentSlotsApiResponse {
  code: ResponseCode
  data: AppointmentSlot[]
}
