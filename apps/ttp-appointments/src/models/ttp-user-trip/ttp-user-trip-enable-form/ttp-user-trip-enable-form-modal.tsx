import { Text } from '@chakra-ui/react'
import { appHttpClient } from 'src/http/app-http-client'
import TtpApi from 'src/http/ttp-api'
import { TtpApiResponse } from 'src/http/ttp-api-response'
import getTtpLocationDisplayName from 'src/models/ttp-location/get-ttp-location-display-name'
import { TtpUserTrip } from 'src/models/ttp-user-trip/ttp-user-trip'
import ConfirmApiActionModal, {
  ConfirmApiActionModalProps,
} from 'ui/lib/form/confirm-api-action-modal'

export interface TtpUserTripEnableFormModalProps
  extends Pick<
    ConfirmApiActionModalProps<TtpApiResponse<TtpUserTrip.IndexRecord>>,
    'modalFooterProps' | 'modalProps' | 'onClose'
  > {
  ttpUserTrip: TtpUserTrip.IndexRecord
}

export default function TtpUserTripEnableFormModal({
  ttpUserTrip,
  ...props
}: TtpUserTripEnableFormModalProps) {
  return (
    <ConfirmApiActionModal
      ctaNo="Cancel"
      ctaYes="Yes, enable"
      httpClient={appHttpClient}
      httpConfig={{
        method: 'PUT',
        url: TtpApi.userTripUpdateUrl(),
        data: {
          userTripId: ttpUserTrip.id,
          isEnabled: true,
        },
      }}
      title="Enable Appointment Search?"
      {...props}
    >
      <Text color="gray">
        Are you sure you want to enable the appointment search for{' '}
        <strong>{getTtpLocationDisplayName(ttpUserTrip.location)}</strong>?
      </Text>
      <Text color="gray" mt={1}>
        You will start receiving notifications for available times that match
        your search.
      </Text>
    </ConfirmApiActionModal>
  )
}
