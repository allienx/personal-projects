import { TtpApiResponse } from 'src/http/ttp-api-response'
import { TtpLocation } from 'src/models/ttp-location/ttp-location'
import { TtpUserTrip } from 'src/models/ttp-user-trip/ttp-user-trip'
import TtpUserTripCreateForm from 'src/models/ttp-user-trip/ttp-user-trip-create-form/ttp-user-trip-create-form'
import ApiFormModal, { ApiFormModalProps } from 'ui/lib/form/api-form-modal'

export interface TtpUserTripCreateFormModalProps
  extends Pick<
    ApiFormModalProps<TtpApiResponse<TtpUserTrip.IndexRecord>>,
    'modalProps' | 'onClose'
  > {
  initialTtpLocation: TtpLocation
}

export default function TtpUserTripCreateFormModal({
  initialTtpLocation,
  onClose,
  ...apiFormModalProps
}: TtpUserTripCreateFormModalProps) {
  const handleCancel = () => {
    onClose({ type: 'cancel' })
  }

  return (
    <ApiFormModal
      title="Create Appointment Search"
      onClose={onClose}
      {...apiFormModalProps}
    >
      <TtpUserTripCreateForm
        initialTtpLocation={initialTtpLocation}
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
