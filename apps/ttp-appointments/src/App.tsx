import { useCallback, useState } from 'react'
import { AppointmentLocation } from 'src/api/types/LocationsApi'
import AppointmentLocationSearch from 'src/components/app/AppointmentLocationSearch/AppointmentLocationSearch'
import AppointmentSlotListData from 'src/components/app/AppointmentSlotList/AppointmentSlotListData'
import LogoIcon from 'src/components/app/Icons/LogoIcon'
import TtpStorage from 'src/utils/storage/TtpStorage'
import { AboutInfo, PageContent, PageFooter, PageHeader, PageWrapper } from 'ui'

function App() {
  const [appointmentLocation, setAppointmentLocation] =
    useState<AppointmentLocation | null>(() => {
      return TtpStorage.getRecentLocations()[0] || null
    })

  const handleAppointmentLocationChange = useCallback(
    (apptLocation: AppointmentLocation) => {
      TtpStorage.saveRecentLocation(apptLocation)

      setAppointmentLocation(apptLocation)
    },
    [],
  )

  return (
    <PageWrapper maxWidth={450}>
      <PageHeader
        icon={<LogoIcon boxSize="2em" ml={5} />}
        title="ttp appointments"
      />

      <PageContent>
        <AppointmentLocationSearch
          onAppointmentLocationChange={handleAppointmentLocationChange}
        />

        <AppointmentSlotListData appointmentLocation={appointmentLocation} />
      </PageContent>

      <PageFooter>
        <AboutInfo
          githubRepoUrl="https://github.com/allienx/personal-projects/tree/main/apps/ttp-appointments"
          initialEmoji="🗓️"
        />
      </PageFooter>
    </PageWrapper>
  )
}

export default App
