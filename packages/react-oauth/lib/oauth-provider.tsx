import { ReactNode, useEffect, useMemo, useState } from 'react'
import AuthContext, { AuthContextState } from './auth-context'
import getOauthDefinitionHelper from './definitions/get-oauth-definition-helper'
import { OauthDefinition } from './definitions/oauth-definition'
import authStorage from './storage/auth-storage'
import useOauthRefreshToken, {
  OauthRefreshTokenStatus,
} from './use-oauth-refresh-token'

export interface OauthProviderProps {
  definition: OauthDefinition
  loader?: ReactNode
  onAccessTokenChange: (accessToken: string | null) => void
  children: ReactNode
}

const initialAuthStorageState = authStorage.getData()

export default function OauthProvider({
  definition,
  loader,
  onAccessTokenChange,
  children,
}: OauthProviderProps) {
  const [authState, setAuthState] = useState(initialAuthStorageState)
  const [hasSetAccessToken, setHasAccessToken] = useState(false)

  const isAccessTokenExpired =
    !!authState?.atk && !!authState?.exp && new Date() > new Date(authState.exp)
  const hasRefreshToken = !!authState?.rtk

  const contextValue = useMemo<AuthContextState>(() => {
    const oauthDefinitionHelper = getOauthDefinitionHelper(definition)

    return {
      authState,
      setAuthState,
      definition,
      loginUrl: oauthDefinitionHelper.getLoginUrl(),
      tokenUrl: oauthDefinitionHelper.getTokenUrl(),
      logout: () => {
        authStorage.clearData()

        setAuthState(null)
      },
    }
  }, [authState, definition])

  useEffect(() => {
    if (!hasSetAccessToken) {
      setHasAccessToken(true)
    }

    onAccessTokenChange(authState?.atk || null)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState?.atk, onAccessTokenChange])

  useOauthRefreshToken({
    definition,
    accessToken: authState?.atk || null,
    expiresAt: authState?.exp || null,
    refreshToken: authState?.rtk || null,
    tokenUrl: contextValue.tokenUrl,
    callback: (result) => {
      switch (result.status) {
        case OauthRefreshTokenStatus.RefreshTokenMissing:
          setAuthState(null)
          break

        case OauthRefreshTokenStatus.RefreshTokenError:
          setAuthState(null)
          break

        case OauthRefreshTokenStatus.RefreshTokenSuccess:
          setAuthState(result.data)
          break

        case OauthRefreshTokenStatus.AccessTokenValid:
        default:
          break
      }
    },
  })

  // Display a loading state until we've set the access token
  // or while we are refreshing the access token.
  //
  // We will either:
  //   1. get a new access token OR
  //   2. will clear authState and isAccessTokenExpired will be false
  if (!hasSetAccessToken || (isAccessTokenExpired && hasRefreshToken)) {
    return <div>{loader || null}</div>
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
