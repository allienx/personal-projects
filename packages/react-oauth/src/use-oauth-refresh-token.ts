import { Dispatch, SetStateAction, useEffect } from 'react'
import authStorage, { AuthStorageState } from './storage/auth-storage'

export interface UseOauthRefreshTokenOpts {
  authState: AuthStorageState | null
  setAuthState: Dispatch<SetStateAction<AuthStorageState | null>>
}

export default function useOauthRefreshToken({
  authState,
  setAuthState,
}: UseOauthRefreshTokenOpts) {
  const { atk, exp } = authState || {}
  const isAccessTokenExpired = !!atk && !!exp && new Date() > new Date(exp)
  const hasRefreshToken = false

  // TODO: support using refresh token if present
  useEffect(() => {
    if (isAccessTokenExpired) {
      authStorage.clearData()

      setAuthState(null)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    isAccessTokenExpired,
    hasRefreshToken,
  }
}
