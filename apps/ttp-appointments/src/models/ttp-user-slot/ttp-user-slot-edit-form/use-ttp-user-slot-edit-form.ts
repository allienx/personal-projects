import { appHttpClient } from 'src/http/app-http-client'
import TtpApi from 'src/http/ttp-api'
import { TtpApiResponse } from 'src/http/ttp-api-response'
import { TtpUserSlot } from 'src/models/ttp-user-slot/ttp-user-slot'
import useApiForm, { UseApiFormSuccess } from 'ui/lib/form/use-api-form'

export type UseTtpUserSlotEditFormValues = ReturnType<typeof getInitialValues>

export type UseTtpUserSlotEditFormOnSuccess = UseApiFormSuccess<
  UseTtpUserSlotEditFormValues,
  TtpApiResponse<TtpUserSlot.IndexRecord>
>

export interface UseTtpUserSlotEditFormProps {
  ttpUserSlot: TtpUserSlot.IndexRecord
  onSuccess: UseTtpUserSlotEditFormOnSuccess
}

export default function useTtpUserSlotEditForm({
  ttpUserSlot,
  onSuccess,
}: UseTtpUserSlotEditFormProps) {
  const apiForm = useApiForm<
    UseTtpUserSlotEditFormValues,
    TtpApiResponse<TtpUserSlot.IndexRecord>
  >({
    httpClient: appHttpClient,

    opts: {
      defaultValues: getInitialValues({ ttpUserSlot }),
    },

    getHttpConfig: (data) => {
      const body = JSON.parse(data.body)

      return {
        method: 'PUT',
        url: TtpApi.userSlotUpdateUrl(),
        data: {
          ...body,
          userSlotId: ttpUserSlot.id,
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
  ttpUserSlot,
}: {
  ttpUserSlot: TtpUserSlot.IndexRecord
}) {
  const body = {
    slots: ttpUserSlot.slots,
    notifications: ttpUserSlot.notifications,
  }

  return {
    apiErrorMessage: '',
    body: JSON.stringify(body, null, 2),
  }
}
