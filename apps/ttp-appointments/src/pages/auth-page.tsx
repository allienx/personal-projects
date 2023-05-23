import { Center } from '@chakra-ui/react'
import useOauthGetToken from 'react-oauth/src/use-oauth-get-token'
import useOauthState from 'react-oauth/src/use-oauth-state'
import { Navigate, useSearchParams } from 'react-router-dom'
import LoadingSpinner from 'src/components/spinner/loading-spinner'

export default function AuthPage() {
  const [searchParams] = useSearchParams()
  const code = searchParams.get('code') || ''

  const { authState } = useOauthState()
  const { error } = useOauthGetToken({ authorizationCode: code })

  if (!code) {
    return <Navigate replace to=".." />
  }

  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>
  }

  if (!authState?.atk) {
    return (
      <Center height="100vh">
        <LoadingSpinner />
      </Center>
    )
  }

  return <Navigate replace to=".." />
}
