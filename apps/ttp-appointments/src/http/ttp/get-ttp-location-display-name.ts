import { TtpLocation } from 'src/http/ttp/ttp-location'

export default function getTtpLocationDisplayName(ttpLocation: TtpLocation) {
  return ttpLocation.name || ttpLocation.nameFull
}
