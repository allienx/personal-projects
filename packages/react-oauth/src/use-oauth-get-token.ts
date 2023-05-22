import { useEffect, useState } from 'react'
import { OauthDefinition } from './definitions/oauth-definition'
import authStorage, { AuthStorageState } from './storage/auth-storage'
import useOauthState from './use-oauth-state'

interface UseOauthGetTokenOpts {
  authorizationCode: string
}

export default function useOauthGetToken({
  authorizationCode,
}: UseOauthGetTokenOpts) {
  const { setAuthState, definition, tokenUrl } = useOauthState()

  const [httpError, setHttpError] = useState<Error | null>(null)

  useEffect(() => {
    getToken({ tokenUrl, authorizationCode, definition }).then((result) => {
      // eslint-disable-next-line no-console
      console.log(
        result.error
          ? 'Encountered error during token fetching.'
          : 'Finished token fetching.',
      )

      if (result.error) {
        setHttpError(result.data as Error)
      } else {
        setAuthState(result.data as AuthStorageState)
      }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    error: httpError,
  }
}

async function getToken({
  tokenUrl,
  authorizationCode,
  definition,
}: {
  tokenUrl: string
  authorizationCode: string
  definition: OauthDefinition
}) {
  try {
    const res = await fetch(tokenUrl, {
      method: 'POST',
      body: new URLSearchParams({
        client_id: definition.config.clientId,
        grant_type: 'authorization_code',
        code: authorizationCode,
        redirect_uri: definition.config.redirectUrl,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      const dataStr = JSON.stringify(data)
      const err = new Error(
        `HTTP Error: ${res.status} ${res.statusText} ${dataStr}`,
      )

      return {
        error: true,
        data: err,
      }
    }

    const state: AuthStorageState = {
      atk: data.access_token,
      rtk: data.refresh_token || null,
      exp: new Date(
        new Date().valueOf() + data.expires_in * 1000,
      ).toISOString(),
    }

    authStorage.saveData(state)

    return {
      error: false,
      data: state,
    }
  } catch (err: any) {
    return {
      error: true,
      data: err as Error,
    }
  }
}
