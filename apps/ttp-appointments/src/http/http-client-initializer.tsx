import { useEffect } from 'react'
import useOauthState from 'react-oauth/src/use-oauth-state'
import { httpClient } from 'src/http/http-client'

export default function HttpClientInitializer() {
  const { authState } = useOauthState()

  useEffect(() => {
    if (authState?.atk) {
      httpClient.setBearerToken(authState.atk)
    } else {
      httpClient.removeBearerToken()
    }
  }, [authState?.atk])

  return null
}
