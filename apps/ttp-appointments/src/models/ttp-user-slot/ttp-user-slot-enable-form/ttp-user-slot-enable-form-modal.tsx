import { Text } from '@chakra-ui/react'
import { appHttpClient } from 'src/http/app-http-client'
import TtpApi from 'src/http/ttp-api'
import { TtpApiResponse } from 'src/http/ttp-api-response'
import getTtpLocationDisplayName from 'src/models/ttp-location/get-ttp-location-display-name'
import { TtpUserSlot } from 'src/models/ttp-user-slot/ttp-user-slot'
import ConfirmApiActionModal, {
  ConfirmApiActionModalProps,
} from 'ui/lib/form/confirm-api-action-modal'

export interface TtpUserSlotEnableFormModalProps
  extends Pick<
    ConfirmApiActionModalProps<TtpApiResponse<TtpUserSlot.IndexRecord>>,
    'modalFooterProps' | 'modalProps' | 'onClose'
  > {
  ttpUserSlot: TtpUserSlot.IndexRecord
}

export default function TtpUserSlotEnableFormModal({
  ttpUserSlot,
  ...props
}: TtpUserSlotEnableFormModalProps) {
  return (
    <ConfirmApiActionModal
      ctaNo="Cancel"
      ctaYes="Yes, enable"
      httpClient={appHttpClient}
      httpConfig={{
        method: 'PUT',
        url: TtpApi.userSlotUpdateUrl(),
        data: {
          userSlotId: ttpUserSlot.id,
          isEnabled: true,
        },
      }}
      title="Enable Appointment Search?"
      {...props}
    >
      <Text color="gray">
        Are you sure you want to enable the appointment search for{' '}
        <strong>{getTtpLocationDisplayName(ttpUserSlot.location)}</strong>?
      </Text>
      <Text color="gray" mt={1}>
        You will start receiving notifications for available times that match
        your search.
      </Text>
    </ConfirmApiActionModal>
  )
}
