import { TtpLocation } from 'src/models/ttp-location/ttp-location'
import { TtpUserSlot } from 'src/models/ttp-user-slot/ttp-user-slot'
import TtpUserSlotCreateForm from 'src/models/ttp-user-slot/ttp-user-slot-create-form/ttp-user-slot-create-form'
import ApiFormModal, { ApiFormModalProps } from 'ui/lib/form/api-form-modal'

export interface TtpUserSlotCreateFormModalProps
  extends Pick<
    ApiFormModalProps<TtpUserSlot.IndexRecord>,
    'modalProps' | 'onClose' | 'children'
  > {
  initialTtpLocation: TtpLocation
}

export default function TtpUserSlotCreateFormModal({
  initialTtpLocation,
  onClose,
  ...apiFormModalProps
}: TtpUserSlotCreateFormModalProps) {
  const handleCancel = () => {
    onClose({ type: 'cancel' })
  }

  return (
    <ApiFormModal
      title="Create Appointment Search"
      onClose={onClose}
      {...apiFormModalProps}
    >
      <TtpUserSlotCreateForm
        initialTtpLocation={initialTtpLocation}
        onCancel={handleCancel}
        onSuccess={({ httpResponse }) => {
          onClose({
            type: 'success',
            result: httpResponse.data.record,
          })
        }}
      />
    </ApiFormModal>
  )
}
