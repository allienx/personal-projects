import { appHttpClient } from 'src/http/app-http-client'
import TtpApi from 'src/http/ttp/ttp-api'
import { TtpApiResponse } from 'src/http/ttp/ttp-api-response'
import { TtpLocation } from 'src/http/ttp/ttp-location'
import { TtpUserSlot } from 'src/http/ttp/ttp-user-slot'
import useApiForm, { UseApiFormSuccess } from 'ui/lib/form/use-api-form'

export type UseCreateUserSlotFormValues = ReturnType<typeof getInitialValues>

export type UseCreateUserSlotFormOnSuccess = UseApiFormSuccess<
  UseCreateUserSlotFormValues,
  TtpApiResponse<TtpUserSlot.IndexRecord>
>

export interface UseCreateUserSlotFormProps {
  initialTtpLocation: TtpLocation
  onSuccess: UseCreateUserSlotFormOnSuccess
}

export default function useCreateUserSlotForm({
  initialTtpLocation,
  onSuccess,
}: UseCreateUserSlotFormProps) {
  const apiForm = useApiForm<
    UseCreateUserSlotFormValues,
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
