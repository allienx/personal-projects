import { ReactNode, useMemo, useState } from 'react'
import AuthContext, { AuthContextState } from './auth-context'
import getOauthDefinitionHelper from './definitions/get-oauth-definition-helper'
import { OauthDefinition } from './definitions/oauth-definition'
import authStorage from './storage/auth-storage'
import useOauthRefreshToken from './use-oauth-refresh-token'

export interface OauthProviderProps {
  definition: OauthDefinition
  loader?: ReactNode
  children: ReactNode
}

const initialAuthStorageState = authStorage.getData()
const isAccessTokenExpired =
  !!initialAuthStorageState?.atk &&
  !!initialAuthStorageState.exp &&
  new Date() > new Date(initialAuthStorageState.exp)
const hasRefreshToken = false

export default function OauthProvider({
  definition,
  loader,
  children,
}: OauthProviderProps) {
  const [authState, setAuthState] = useState(
    !isAccessTokenExpired ? initialAuthStorageState : null,
  )

  useOauthRefreshToken({
    isAccessTokenExpired,
    hasRefreshToken,
    setAuthState,
  })

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

  // Display a loading state while we are refreshing the access token.
  // We will either:
  //   1. get a new access token OR
  //   2. will clear authState and isAccessTokenExpired will be false
  if (isAccessTokenExpired && hasRefreshToken) {
    return <div>{loader || null}</div>
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
