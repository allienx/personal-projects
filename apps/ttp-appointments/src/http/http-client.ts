import axios, { AxiosRequestConfig, CreateAxiosDefaults } from 'axios'
import { stringify } from 'qs'

class HttpClient {
  http

  constructor(config?: CreateAxiosDefaults) {
    this.http = axios.create(config)
  }

  send<T = any>(config: AxiosRequestConfig) {
    return this.http.request<T>(config)
  }

  setBearerToken(token: string) {
    this.http.defaults.headers.Authorization = `Bearer ${token}`
  }

  removeBearerToken() {
    delete this.http.defaults.headers.Authorization
  }
}

export const httpClient = new HttpClient({
  paramsSerializer: (params) => {
    return stringify(params, { arrayFormat: 'brackets' })
  },
})
