import { Button, Link } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import useOauthState from 'react-oauth/lib/use-oauth-state'
import LogoIcon from 'src/components/icons/logo-icon'
import CreateUserSlotFormDialog from 'src/forms/create-user-slot-form/create-user-slot-form-dialog'
import TtpApi from 'src/http/ttp/ttp-api'
import { TtpLocation } from 'src/http/ttp/ttp-location'
import HomeContentWrapper from 'src/pages/home/home-content-wrapper'
import TtpLocationSearchWrapper from 'src/pages/home/ttp-location-search-wrapper'
import TtpUserSlotListWrapper from 'src/pages/home/ttp-user-slot-list-wrapper'
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

          <TtpUserSlotListWrapper boxProps={{ mt: 8 }} />
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
        <CreateUserSlotFormDialog
          modalProps={{ isOpen: !!ttpLocation }}
          ttpLocation={ttpLocation}
          onClose={(result) => {
            if (result.type === 'success') {
              queryClient.invalidateQueries([TtpApi.userSlotsUrl()])
            }

            setTtpLocation(null)
          }}
        />
      )}
    </PageWrapper>
  )
}
