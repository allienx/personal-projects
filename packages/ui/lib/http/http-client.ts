import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  CreateAxiosDefaults,
} from 'axios'
import { stringify } from 'qs'

export default class HttpClient {
  http: AxiosInstance

  constructor(config?: CreateAxiosDefaults) {
    this.http = axios.create({
      paramsSerializer: (params) => {
        return stringify(params, { arrayFormat: 'brackets' })
      },
      ...config,
    })
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
