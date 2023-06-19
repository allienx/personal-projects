import { Text } from '@chakra-ui/react'
import { appHttpClient } from 'src/http/app-http-client'
import TtpApi from 'src/http/ttp-api'
import { TtpApiResponse } from 'src/http/ttp-api-response'
import getTtpLocationDisplayName from 'src/models/ttp-location/get-ttp-location-display-name'
import { TtpUserSlot } from 'src/models/ttp-user-slot/ttp-user-slot'
import ConfirmApiActionModal, {
  ConfirmApiActionModalProps,
} from 'ui/lib/form/confirm-api-action-modal'

export interface TtpUserSlotDisableFormModalProps
  extends Pick<
    ConfirmApiActionModalProps<TtpApiResponse<TtpUserSlot.IndexRecord>>,
    'modalFooterProps' | 'modalProps' | 'onClose'
  > {
  ttpUserSlot: TtpUserSlot.IndexRecord
}

export default function TtpUserSlotDisableFormModal({
  ttpUserSlot,
  ...props
}: TtpUserSlotDisableFormModalProps) {
  return (
    <ConfirmApiActionModal
      colorScheme="red"
      ctaNo="Cancel"
      ctaYes="Yes, disable"
      httpClient={appHttpClient}
      httpConfig={{
        method: 'PUT',
        url: TtpApi.userSlotUpdateUrl(),
        data: {
          userSlotId: ttpUserSlot.id,
          isEnabled: false,
        },
      }}
      title="Disable Appointment Search?"
      {...props}
    >
      <Text color="gray">
        Are you sure you want to disable the appointment search for{' '}
        <strong>{getTtpLocationDisplayName(ttpUserSlot.location)}</strong>?
      </Text>
      <Text color="gray" mt={1}>
        You will <strong>stop</strong> receiving notifications for available
        times that match your search.
      </Text>
    </ConfirmApiActionModal>
  )
}
