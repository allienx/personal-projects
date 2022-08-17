import axios from 'axios'
import type { IpLookupResponse } from 'pages/api/ip-lookup'

export default function getIpAddressLookup(ipAddress: string) {
  const url = '/api/ip-lookup'
  const params = {
    ip: ipAddress,
  }

  return axios.get<IpLookupResponse>(url, { params })
}
