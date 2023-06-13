import { appHttpClient } from 'src/http/app-http-client'
import TtpApi from 'src/http/ttp/ttp-api'
import { TtpApiResponse } from 'src/http/ttp/ttp-api-response'
import { TtpLocation } from 'src/http/ttp/ttp-location'
import { TtpUserSlot } from 'src/http/ttp/ttp-user-slot'
import useApiForm, { UseApiFormSuccess } from 'ui/lib/form/use-api-form'

export type UseUserSlotCreateFormValues = ReturnType<typeof getInitialValues>

export type UseUserSlotCreateFormOnSuccess = UseApiFormSuccess<
  UseUserSlotCreateFormValues,
  TtpApiResponse<TtpUserSlot.IndexRecord>
>

export interface UseUserSlotCreateFormProps {
  initialTtpLocation: TtpLocation
  onSuccess: UseUserSlotCreateFormOnSuccess
}

export default function useUserSlotCreateForm({
  initialTtpLocation,
  onSuccess,
}: UseUserSlotCreateFormProps) {
  const apiForm = useApiForm<
    UseUserSlotCreateFormValues,
    TtpApiResponse<TtpUserSlot.IndexRecord>
  >({
    httpClient: appHttpClient,

    opts: {
      defaultValues: getInitialValues({ initialTtpLocation }),
    },

    getHttpConfig: (data) => {
      const body = JSON.parse(data.body)

      return {
        url: TtpApi.createUserSlotUrl(),
        data: {
          ...body,
          locationId: data.ttpLocationId,
        },
      }
    },

    onSuccess,
  })

  const ttpLocationIdField = apiForm.register('ttpLocationId', {
    valueAsNumber: true,
  })
  const bodyField = apiForm.register('body')

  return {
    ...apiForm,
    ttpLocationIdField,
    bodyField,
  }
}

function getInitialValues({
  initialTtpLocation,
}: {
  initialTtpLocation: TtpLocation
}) {
  const sampleBody = {
    slots: [
      {
        dayOfWeek: 'monday',
        timeRange: ['08:00', '20:00'],
      },
    ],
    notifications: [
      {
        type: 'email',
        email: '',
      },
    ],
  }

  return {
    apiErrorMessage: '',
    ttpLocationId: initialTtpLocation.id,
    body: JSON.stringify(sampleBody, null, 2),
  }
}
