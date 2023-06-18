import { Text } from '@chakra-ui/react'
import { appHttpClient } from 'src/http/app-http-client'
import TtpApi from 'src/http/ttp-api'
import getTtpLocationDisplayName from 'src/models/ttp-location/get-ttp-location-display-name'
import { TtpUserSlot } from 'src/models/ttp-user-slot/ttp-user-slot'
import ConfirmApiActionModal, {
  ConfirmApiActionModalProps,
} from 'ui/lib/form/confirm-api-action-modal'

export interface TtpUserSlotDeleteFormModalProps
  extends Pick<
    ConfirmApiActionModalProps<''>,
    'modalFooterProps' | 'modalProps' | 'onClose'
  > {
  ttpUserSlot: TtpUserSlot.IndexRecord
}

export default function TtpUserSlotDeleteFormModal({
  ttpUserSlot,
  ...props
}: TtpUserSlotDeleteFormModalProps) {
  return (
    <ConfirmApiActionModal
      colorScheme="red"
      ctaNo="Cancel"
      ctaYes="Yes, delete"
      httpClient={appHttpClient}
      httpConfig={{
        method: 'DELETE',
        url: TtpApi.userSlotDeleteUrl(),
        data: {
          userSlotId: ttpUserSlot.id,
        },
      }}
      title="Delete Appointment Search"
      {...props}
    >
      <Text color="gray">
        Are you sure you want to delete the appointment search for{' '}
        <strong>{getTtpLocationDisplayName(ttpUserSlot.location)}</strong>?
      </Text>
      <Text color="gray" mt={1}>
        This action cannot be undone and will stop all notifications for this
        search.
      </Text>
    </ConfirmApiActionModal>
  )
}
