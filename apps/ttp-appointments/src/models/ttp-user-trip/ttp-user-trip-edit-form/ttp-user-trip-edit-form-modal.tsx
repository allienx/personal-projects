import { TtpApiResponse } from 'src/http/ttp-api-response'
import { TtpUserTrip } from 'src/models/ttp-user-trip/ttp-user-trip'
import TtpUserTripEditForm from 'src/models/ttp-user-trip/ttp-user-trip-edit-form/ttp-user-trip-edit-form'
import ApiFormModal, { ApiFormModalProps } from 'ui/lib/form/api-form-modal'

export interface TtpUserTripEditFormModalProps
  extends Pick<
    ApiFormModalProps<TtpApiResponse<TtpUserTrip.IndexRecord>>,
    'modalProps' | 'onClose'
  > {
  ttpUserTrip: TtpUserTrip.IndexRecord
}

export default function TtpUserTripEditFormModal({
  ttpUserTrip,
  onClose,
  ...apiFormModalProps
}: TtpUserTripEditFormModalProps) {
  const handleCancel = () => {
    onClose({ type: 'cancel' })
  }

  return (
    <ApiFormModal
      title="Edit Appointment Search"
      onClose={onClose}
      {...apiFormModalProps}
    >
      <TtpUserTripEditForm
        ttpUserTrip={ttpUserTrip}
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
