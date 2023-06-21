import { TtpApiResponse } from 'src/http/ttp-api-response'
import { TtpUserSlot } from 'src/models/ttp-user-slot/ttp-user-slot'
import TtpUserSlotEditForm from 'src/models/ttp-user-slot/ttp-user-slot-edit-form/ttp-user-slot-edit-form'
import ApiFormModal, { ApiFormModalProps } from 'ui/lib/form/api-form-modal'

export interface TtpUserSlotEditFormModalProps
  extends Pick<
    ApiFormModalProps<TtpApiResponse<TtpUserSlot.IndexRecord>>,
    'modalProps' | 'onClose'
  > {
  ttpUserSlot: TtpUserSlot.IndexRecord
}

export default function TtpUserSlotEditFormModal({
  ttpUserSlot,
  onClose,
  ...apiFormModalProps
}: TtpUserSlotEditFormModalProps) {
  const handleCancel = () => {
    onClose({ type: 'cancel' })
  }

  return (
    <ApiFormModal
      title="Edit Appointment Search"
      onClose={onClose}
      {...apiFormModalProps}
    >
      <TtpUserSlotEditForm
        ttpUserSlot={ttpUserSlot}
        onCancel={handleCancel}
        onSuccess={({ httpResponse }) => {
          onClose({
            type: 'success',
            result: httpResponse.data,
          })
        }}
      />
    </ApiFormModal>
  )
}
