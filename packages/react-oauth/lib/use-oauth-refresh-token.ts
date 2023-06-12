import { addMinutes } from 'date-fns'
import { useEffect, useState } from 'react'
import { OauthDefinition } from './definitions/oauth-definition'
import authStorage, { AuthStorageState } from './storage/auth-storage'
import useInterval from './use-interval'

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
  const [toggle, setToggle] = useState(false)

  // Get a new access token when the current one is expired.
  useEffect(() => {
    checkAccessToken({
      definition,
      accessToken,
      expiresAt,
      refreshToken,
      tokenUrl,
      callback,
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle])

  // Force a re-render when our app is focused.
  // This forces us to check for an expired token and show a loading state if expired.
  useEffect(() => {
    const focusHandler = () => {
      setToggle((prevState) => !prevState)
    }

    window.addEventListener('focus', focusHandler)

    return () => {
      window.removeEventListener('focus', focusHandler)
    }
  }, [])

  // Check if the current access token is going to expire in the next few minutes.
  // This will run every 5 minutes.
  useInterval(() => {
    checkAccessToken({
      bufferMin: 6,
      definition,
      accessToken,
      expiresAt,
      refreshToken,
      tokenUrl,
      callback,
    })
  }, 60 * 1000 * 5)
}

function checkAccessToken({
  bufferMin = 0,
  definition,
  accessToken,
  expiresAt,
  refreshToken,
  tokenUrl,
  callback,
}: {
  bufferMin?: number
  definition: OauthDefinition
  accessToken: string | null
  expiresAt: string | null
  refreshToken: string | null
  tokenUrl: string
  callback: (result: OauthRefreshTokenResult) => void
}) {
  const isAccessTokenExpired =
    !!accessToken &&
    !!expiresAt &&
    addMinutes(new Date(), bufferMin) > new Date(expiresAt)

  if (isAccessTokenExpired && !!refreshToken) {
    getAccessToken({
      definition,
      refreshToken,
      tokenUrl,
    }).then(callback)
  } else if (isAccessTokenExpired && !refreshToken) {
    callback({
      status: OauthRefreshTokenStatus.RefreshTokenMissing,
    })
  } else {
    callback({
      status: OauthRefreshTokenStatus.AccessTokenValid,
    })
  }
}

async function getAccessToken({
  definition,
  refreshToken,
  tokenUrl,
}: {
  definition: OauthDefinition
  refreshToken: string
  tokenUrl: string
}): Promise<OauthRefreshTokenResult> {
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

    // Store the original 'refreshToken', the refresh token response does not return one.
    const state: AuthStorageState = {
      atk: data.access_token,
      rtk: refreshToken,
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
