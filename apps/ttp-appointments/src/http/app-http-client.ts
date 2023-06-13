import HttpClient from 'ui/lib/http/http-client'

export const appHttpClient = new HttpClient()

export function updateAppHttpClientToken(accessToken: string | null) {
  if (accessToken) {
    appHttpClient.setBearerToken(accessToken)
  } else {
    appHttpClient.removeBearerToken()
  }
}
