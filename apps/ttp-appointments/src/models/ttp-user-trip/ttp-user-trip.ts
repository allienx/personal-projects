import { TtpLocation } from 'src/models/ttp-location/ttp-location'

export namespace TtpUserTrip {
  export interface IndexRecord {
    id: string
    userId: string
    locationId: string
    location: TtpLocation
    isEnabled: boolean
    numDays: number
    slots: Slot[]
    notifications: Notification[]
  }

  export enum DayOfWeek {
    Monday = 'monday',
    Tuesday = 'tuesday',
    Wednesday = 'wednesday',
    Thursday = 'thursday',
    Friday = 'friday',
    Saturday = 'saturday',
    Sunday = 'sunday',
  }

  export enum NotificationType {
    Email = 'email',
  }

  export interface Slot {
    dayOfWeek: DayOfWeek
    timeRange: string[]
  }

  export interface EmailNotification {
    type: NotificationType.Email
    email: string
  }

  export type Notification = EmailNotification
}
