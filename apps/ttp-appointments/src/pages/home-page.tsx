import { Button, Link } from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import useOauthState from 'react-oauth/src/use-oauth-state'
import LogoIcon from 'src/components/app/Icons/LogoIcon'
import { TtpLocation } from 'src/http/ttp/ttp-location'
import TtpLocationSearch from 'src/pages/home/ttp-location-search'
import ttpStorage from 'src/utils/storage/ttp-storage'
import { AboutInfo, PageContent, PageFooter, PageHeader, PageWrapper } from 'ui'

export default function HomePage() {
  const { authState, loginUrl } = useOauthState()

  const [ttpLocation, setTtpLocation] = useState<TtpLocation | null>(() => {
    return ttpStorage.getRecentLocations()[0] || null
  })

  console.log('ttpLocation', ttpLocation)

  const handleAppointmentLocationChange = useCallback((loc: TtpLocation) => {
    ttpStorage.saveRecentLocation(loc)

    setTtpLocation(loc)
  }, [])

  return (
    <PageWrapper maxWidth={450}>
      <PageHeader
        icon={<LogoIcon boxSize="2em" ml={5} />}
        title="ttp appointments"
      />

      {authState?.atk ? (
        <PageContent>
          <TtpLocationSearch
            onAppointmentLocationChange={handleAppointmentLocationChange}
          />
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
