import axios from 'axios'
import type { AxiosError } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export interface IpApiResponse {
  status: 'success' | 'fail'
  message?: 'private range' | 'reserved range' | 'invalid query'
  country: string
  countryCode: string
  region: string
  regionName: string
  city: string
  zip: string
  lat: number
  lon: number
  timezone: string
  currency: string
  isp: string
}

export interface IpLookupResponse {
  data: IpApiResponse
}

export interface IpLookupErrorResponse {
  code: string
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IpLookupResponse | IpLookupErrorResponse>,
) {
  const { ip } = req.query
  const ipAddress = typeof ip === 'string' ? ip : ''

  let statusCode
  let resJson: IpLookupResponse | IpLookupErrorResponse

  try {
    const res = await getIpAddressLookup(ipAddress)

    if (res.data.status === 'success') {
      statusCode = 200
      resJson = {
        data: res.data,
      }
    } else {
      statusCode = 422
      resJson = {
        code: 'ip_api_error',
        message: res.data.message || '',
      }
    }
  } catch (err) {
    const axiosErr = err as AxiosError<IpApiResponse>

    statusCode = 422
    resJson = {
      code: 'ip_api_error',
      message:
        axiosErr.response?.data.message ||
        axiosErr.message ||
        'Unexpected upstream error.',
    }
  }

  res.status(statusCode).json(resJson)
}

async function getIpAddressLookup(ipAddress: string) {
  const url = `http://ip-api.com/json/${ipAddress}`
  const params = {
    fields: 8438783,
  }

  return axios.get<IpApiResponse>(url, { params })
}
