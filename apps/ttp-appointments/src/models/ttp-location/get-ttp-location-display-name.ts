import { TtpLocation } from 'src/models/ttp-location/ttp-location'

export default function getTtpLocationDisplayName(ttpLocation: TtpLocation) {
  return ttpLocation.name || ttpLocation.nameFull
}
