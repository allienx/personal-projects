import { appHttpClient } from 'src/http/app-http-client'
import TtpApi from 'src/http/ttp-api'
import { TtpApiResponse } from 'src/http/ttp-api-response'
import { TtpLocation } from 'src/models/ttp-location/ttp-location'
import { TtpUserSlot } from 'src/models/ttp-user-slot/ttp-user-slot'
import useApiForm, { UseApiFormSuccess } from 'ui/lib/form/use-api-form'

export type UseTtpUserSlotCreateFormValues = ReturnType<typeof getInitialValues>

export type UseTtpUserSlotCreateFormOnSuccess = UseApiFormSuccess<
  UseTtpUserSlotCreateFormValues,
  TtpApiResponse<TtpUserSlot.IndexRecord>
>

export interface UseTtpUserSlotCreateFormProps {
  initialTtpLocation: TtpLocation
  onSuccess: UseTtpUserSlotCreateFormOnSuccess
}

export default function useTtpUserSlotCreateForm({
  initialTtpLocation,
  onSuccess,
}: UseTtpUserSlotCreateFormProps) {
  const apiForm = useApiForm<
    UseTtpUserSlotCreateFormValues,
    TtpApiResponse<TtpUserSlot.IndexRecord>
  >({
    httpClient: appHttpClient,

    opts: {
      defaultValues: getInitialValues({ initialTtpLocation }),
    },

    getHttpConfig: (data) => {
      const body = JSON.parse(data.body)

      return {
        method: 'POST',
        url: TtpApi.userSlotCreateUrl(),
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
        email: 'myemail@mailinator.com',
      },
    ],
  }

  return {
    apiErrorMessage: '',
    ttpLocationId: initialTtpLocation.id,
    body: JSON.stringify(sampleBody, null, 2),
  }
}
