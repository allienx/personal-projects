import { Dispatch, SetStateAction, useEffect } from 'react'
import authStorage, { AuthStorageState } from './storage/auth-storage'

interface UseOauthRefreshTokenOpts {
  isAccessTokenExpired: boolean
  hasRefreshToken: boolean
  setAuthState: Dispatch<SetStateAction<AuthStorageState | null>>
}

export default function useOauthRefreshToken({
  isAccessTokenExpired,
  hasRefreshToken,
  setAuthState,
}: UseOauthRefreshTokenOpts) {
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
