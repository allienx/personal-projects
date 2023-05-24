import { useEffect } from 'react'
import { OauthDefinition } from './definitions/oauth-definition'
import authStorage, { AuthStorageState } from './storage/auth-storage'

export enum OauthRefreshTokenStatus {
  AccessTokenValid = 'access_token_valid',
  RefreshTokenMissing = 'refresh_token_missing',
  RefreshTokenSuccess = 'refresh_token_success',
  RefreshTokenError = 'refresh_token_error',
}

export type OauthRefreshTokenResult =
  | { status: OauthRefreshTokenStatus.AccessTokenValid }
  | { status: OauthRefreshTokenStatus.RefreshTokenMissing }
  | {
      status: OauthRefreshTokenStatus.RefreshTokenSuccess
      data: AuthStorageState
    }
  | {
      status: OauthRefreshTokenStatus.RefreshTokenError
      err: Error
    }

interface UseOauthRefreshTokenOpts {
  definition: OauthDefinition
  accessToken: string | null
  expiresAt: string | null
  refreshToken: string | null
  tokenUrl: string
  callback: (result: OauthRefreshTokenResult) => void
}

export default function useOauthRefreshToken({
  definition,
  accessToken,
  expiresAt,
  refreshToken,
  tokenUrl,
  callback,
}: UseOauthRefreshTokenOpts) {
  useEffect(() => {
    getAccessToken({
      definition,
      accessToken,
      expiresAt,
      refreshToken,
      tokenUrl,
    }).then(callback)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

async function getAccessToken({
  definition,
  accessToken,
  expiresAt,
  refreshToken,
  tokenUrl,
}: {
  definition: OauthDefinition
  accessToken: string | null
  expiresAt: string | null
  refreshToken: string | null
  tokenUrl: string
}): Promise<OauthRefreshTokenResult> {
  const isAccessTokenExpired =
    !!accessToken && !!expiresAt && new Date() > new Date(expiresAt)

  if (isAccessTokenExpired && !refreshToken) {
    return {
      status: OauthRefreshTokenStatus.RefreshTokenMissing,
    }
  }

  if (isAccessTokenExpired && refreshToken) {
    try {
      const res = await fetch(tokenUrl, {
        method: 'POST',
        body: new URLSearchParams({
          client_id: definition.config.clientId,
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        const dataStr = JSON.stringify(data)
        const err = new Error(
          `HTTP Error: ${res.status} ${res.statusText} ${dataStr}`,
        )

        return {
          status: OauthRefreshTokenStatus.RefreshTokenError,
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
        status: OauthRefreshTokenStatus.RefreshTokenSuccess,
        data: state,
      }
    } catch (err: any) {
      return {
        status: OauthRefreshTokenStatus.RefreshTokenError,
        err,
      }
    }
  }

  return {
    status: OauthRefreshTokenStatus.AccessTokenValid,
  }
}
