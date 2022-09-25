import { useAuth0, User } from '@auth0/auth0-react'
import { Button, Center } from '@chakra-ui/react'
import { ReactNode, useMemo } from 'react'
import IdentityContext, {
  IdentityState,
} from 'src/components/app/IdentityContext/IdentityContext'
import LoadingSpinner from 'src/components/app/Spinner/LoadingSpinner'
import TtpStorage from 'src/utils/storage/TtpStorage'

interface IdentityGuardProps {
  children: ReactNode
}

export default function IdentityGuardAndProvider({
  children,
}: IdentityGuardProps) {
  const { isLoading, user, loginWithRedirect, logout } = useAuth0()

  const contextValue = useMemo<IdentityState>(() => {
    return {
      user: user as User,
      logout: () => {
        TtpStorage.clearRecentLocations()

        logout()
      },
    }
  }, [logout, user])

  if (!contextValue.user) {
    return (
      <Center height="100vh">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Button
            size="lg"
            onClick={() => {
              loginWithRedirect()
            }}
          >
            Login
          </Button>
        )}
      </Center>
    )
  }

  return (
    <IdentityContext.Provider value={contextValue}>
      {children}
    </IdentityContext.Provider>
  )
}
