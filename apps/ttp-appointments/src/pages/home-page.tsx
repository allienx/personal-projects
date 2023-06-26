import { Button, Link } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import useOauthState from 'react-oauth/lib/use-oauth-state'
import LogoIcon from 'src/components/icons/logo-icon'
import TtpApi from 'src/http/ttp-api'
import updateTtpApiListResponse from 'src/http/update-ttp-api-list-response'
import { TtpLocation } from 'src/models/ttp-location/ttp-location'
import TtpUserTripCreateFormModal from 'src/models/ttp-user-trip/ttp-user-trip-create-form/ttp-user-trip-create-form-modal'
import HomeContentWrapper from 'src/pages/home/home-content-wrapper'
import TtpLocationSearchWrapper from 'src/pages/home/ttp-location-search-wrapper'
import TtpUserTripListWrapper from 'src/pages/home/ttp-user-trip-list-wrapper'
import ttpStorage from 'src/utils/storage/ttp-storage'
import { AboutInfo, PageContent, PageFooter, PageHeader, PageWrapper } from 'ui'

export default function HomePage() {
  const queryClient = useQueryClient()
  const { authState, loginUrl } = useOauthState()

  const [ttpLocation, setTtpLocation] = useState<TtpLocation | null>(null)

  const handleTtpLocationChange = useCallback((loc: TtpLocation) => {
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
        <HomeContentWrapper boxProps={{ as: PageContent }}>
          <TtpLocationSearchWrapper onChange={handleTtpLocationChange} />

          <TtpUserTripListWrapper boxProps={{ mt: 8 }} />
        </HomeContentWrapper>
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

      {ttpLocation && (
        <TtpUserTripCreateFormModal
          initialTtpLocation={ttpLocation}
          onClose={(context) => {
            if (context.type === 'success') {
              queryClient.setQueryData(
                [TtpApi.userTripsUrl()],
                updateTtpApiListResponse({
                  actionType: 'add',
                  record: context.result.record,
                }),
              )
            }

            setTtpLocation(null)
          }}
        />
      )}
    </PageWrapper>
  )
}
