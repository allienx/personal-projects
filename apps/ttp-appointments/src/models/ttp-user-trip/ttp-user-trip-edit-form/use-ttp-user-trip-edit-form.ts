import { clamp } from 'lodash'
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
          numDays: data.numDays,
        },
      }
    },

    onSuccess,
  })

  const numDaysField = apiForm.register('numDays', {
    setValueAs: (value) => {
      const num = Number(value)

      if (!num) {
        return 0
      }

      return clamp(num, 0, Number.MAX_SAFE_INTEGER)
    },
  })
  const bodyField = apiForm.register('body')

  return {
    ...apiForm,
    numDaysField,
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
    numDays: ttpUserTrip.numDays,
    body: JSON.stringify(body, null, 2),
  }
}
