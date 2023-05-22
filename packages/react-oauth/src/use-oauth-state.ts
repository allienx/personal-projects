import { useContext } from 'react'
import AuthContext from './auth-context'

export default function useOauthState() {
  const oauthState = useContext(AuthContext)

  return oauthState
}
