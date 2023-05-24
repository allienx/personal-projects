import { useEffect, useState } from 'react'
import { OauthDefinition } from './definitions/oauth-definition'
import authStorage, { AuthStorageState } from './storage/auth-storage'
import useOauthState from './use-oauth-state'

export enum OauthGetTokenStatus {
  GetTokenSuccess = 'refresh_token_success',
  GetTokenError = 'refresh_token_error',
}

export type OauthGetTokenResult =
  | {
      status: OauthGetTokenStatus.GetTokenSuccess
      data: AuthStorageState
    }
  | {
      status: OauthGetTokenStatus.GetTokenError
      err: Error
    }

interface UseOauthGetTokenOpts {
  authorizationCode: string
}

export default function useOauthGetToken({
  authorizationCode,
}: UseOauthGetTokenOpts) {
  const { setAuthState, definition, tokenUrl } = useOauthState()

  const [httpError, setHttpError] = useState<Error | null>(null)

  useEffect(() => {
    getAccessToken({ tokenUrl, authorizationCode, definition }).then(
      (result) => {
        switch (result.status) {
          case OauthGetTokenStatus.GetTokenSuccess:
            setAuthState(result.data)
            break

          case OauthGetTokenStatus.GetTokenError:
            setHttpError(result.err)
            break

          default:
            break
        }
      },
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    error: httpError,
  }
}

async function getAccessToken({
  tokenUrl,
  authorizationCode,
  definition,
}: {
  tokenUrl: string
  authorizationCode: string
  definition: OauthDefinition
}): Promise<OauthGetTokenResult> {
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
        status: OauthGetTokenStatus.GetTokenError,
        err,
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
      status: OauthGetTokenStatus.GetTokenSuccess,
      data: state,
    }
  } catch (err: any) {
    return {
      status: OauthGetTokenStatus.GetTokenError,
      err,
    }
  }
}
