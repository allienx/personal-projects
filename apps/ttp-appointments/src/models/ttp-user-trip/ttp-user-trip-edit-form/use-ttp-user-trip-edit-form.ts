import { appHttpClient } from 'src/http/app-http-client'
import TtpApi from 'src/http/ttp-api'
import { TtpApiResponse } from 'src/http/ttp-api-response'
import { TtpUserTrip } from 'src/models/ttp-user-trip/ttp-user-trip'
import useApiForm, { UseApiFormSuccess } from 'ui/lib/form/use-api-form'

export type UseTtpUserTripEditFormValues = ReturnType<typeof getInitialValues>

export type UseTtpUserTripEditFormOnSuccess = UseApiFormSuccess<
  UseTtpUserTripEditFormValues,
  TtpApiResponse<TtpUserTrip.IndexRecord>
>

export interface UseTtpUserTripEditFormProps {
  ttpUserTrip: TtpUserTrip.IndexRecord
  onSuccess: UseTtpUserTripEditFormOnSuccess
}

export default function useTtpUserTripEditForm({
  ttpUserTrip,
  onSuccess,
}: UseTtpUserTripEditFormProps) {
  const apiForm = useApiForm<
    UseTtpUserTripEditFormValues,
    TtpApiResponse<TtpUserTrip.IndexRecord>
  >({
    httpClient: appHttpClient,

    opts: {
      defaultValues: getInitialValues({ ttpUserTrip }),
    },

    getHttpConfig: (data) => {
      const body = JSON.parse(data.body)

      return {
        method: 'PUT',
        url: TtpApi.userTripUpdateUrl(),
        data: {
          ...body,
          userTripId: ttpUserTrip.id,
        },
      }
    },

    onSuccess,
  })

  const bodyField = apiForm.register('body')

  return {
    ...apiForm,
    bodyField,
  }
}

function getInitialValues({
  ttpUserTrip,
}: {
  ttpUserTrip: TtpUserTrip.IndexRecord
}) {
  const body = {
    slots: ttpUserTrip.slots,
    notifications: ttpUserTrip.notifications,
  }

  return {
    apiErrorMessage: '',
    body: JSON.stringify(body, null, 2),
  }
}
