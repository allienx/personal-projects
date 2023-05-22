import { createContext, Dispatch, SetStateAction } from 'react'
import { OauthDefinition } from 'src/definitions/oauth-definition'
import { AuthStorageState } from './storage/auth-storage'

export interface AuthContextState {
  authState: AuthStorageState | null
  setAuthState: Dispatch<SetStateAction<AuthStorageState | null>>
  definition: OauthDefinition
  loginUrl: string
  tokenUrl: string
  logout: () => void
}

const AuthContext = createContext<AuthContextState>({
  authState: null,
  setAuthState: () => null,
  // @ts-ignore
  definition: null,
  loginUrl: '',
  tokenUrl: '',
  logout: () => null,
})

export default AuthContext
