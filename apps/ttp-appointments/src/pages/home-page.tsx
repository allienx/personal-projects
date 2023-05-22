import { Button, Link, Text } from '@chakra-ui/react'
import useOauthState from 'react-oauth/src/use-oauth-state'
import LogoIcon from 'src/components/app/Icons/LogoIcon'
import { AboutInfo, PageContent, PageFooter, PageHeader, PageWrapper } from 'ui'

export default function HomePage() {
  const { authState, loginUrl } = useOauthState()

  return (
    <PageWrapper maxWidth={450}>
      <PageHeader
        icon={<LogoIcon boxSize="2em" ml={5} />}
        title="ttp appointments"
      />

      {authState?.atk ? (
        <PageContent>
          <Text>Logged In!</Text>
        </PageContent>
      ) : (
        <PageContent alignItems="center" display="flex" justifyContent="center">
          <Link href={loginUrl}>
            <Button size="lg">Login</Button>
          </Link>
        </PageContent>
      )}

      <PageFooter>
        <AboutInfo
          githubRepoUrl="https://github.com/allienx/personal-projects/tree/main/apps/ttp-appointments"
          initialEmoji="🗓️"
        />
      </PageFooter>
    </PageWrapper>
  )
}
