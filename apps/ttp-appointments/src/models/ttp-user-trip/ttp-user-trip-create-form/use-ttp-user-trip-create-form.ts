import { appHttpClient } from 'src/http/app-http-client'
import TtpApi from 'src/http/ttp-api'
import { TtpApiResponse } from 'src/http/ttp-api-response'
import { TtpLocation } from 'src/models/ttp-location/ttp-location'
import { TtpUserTrip } from 'src/models/ttp-user-trip/ttp-user-trip'
import useApiForm, { UseApiFormSuccess } from 'ui/lib/form/use-api-form'

export type UseTtpUserTripCreateFormValues = ReturnType<typeof getInitialValues>

export type UseTtpUserTripCreateFormOnSuccess = UseApiFormSuccess<
  UseTtpUserTripCreateFormValues,
  TtpApiResponse<TtpUserTrip.IndexRecord>
>

export interface UseTtpUserTripCreateFormProps {
  initialTtpLocation: TtpLocation
  onSuccess: UseTtpUserTripCreateFormOnSuccess
}

export default function useTtpUserTripCreateForm({
  initialTtpLocation,
  onSuccess,
}: UseTtpUserTripCreateFormProps) {
  const apiForm = useApiForm<
    UseTtpUserTripCreateFormValues,
    TtpApiResponse<TtpUserTrip.IndexRecord>
  >({
    httpClient: appHttpClient,

    opts: {
      defaultValues: getInitialValues({ initialTtpLocation }),
    },

    getHttpConfig: (data) => {
      const body = JSON.parse(data.body)

      return {
        method: 'POST',
        url: TtpApi.userTripCreateUrl(),
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
