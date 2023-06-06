import { TtpLocation } from 'src/http/ttp/ttp-location'

export namespace TtpUserSlot {
  export interface IndexRecord {
    id: string
    userId: string
    locationId: string
    location: TtpLocation | null
    isEnabled: boolean
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
    Slack = 'slack',
  }

  export interface Slot {
    dayOfWeek: DayOfWeek
    timeRange: string[]
  }

  export interface EmailNotification {
    type: NotificationType.Email
    email: string
  }

  export interface SlackNotification {
    type: NotificationType.Slack
    channel: string
  }

  export type Notification = EmailNotification | SlackNotification
}
