import { TtpLocation } from 'src/models/ttp-location/ttp-location'

export default function getTtpLocationCity(ttpLocation: TtpLocation) {
  return [ttpLocation.city, ttpLocation.province, ttpLocation.countryCode]
    .filter((str) => !!str)
    .join(', ')
}
