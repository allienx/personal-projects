import { LogoutOptions, User } from '@auth0/auth0-react'
import { createContext } from 'react'

export interface IdentityState {
  user: User
  logout: (options?: LogoutOptions) => void
}

const IdentityContext = createContext<IdentityState>({
  user: null as unknown as User,
  logout: () => {},
})

export default IdentityContext
