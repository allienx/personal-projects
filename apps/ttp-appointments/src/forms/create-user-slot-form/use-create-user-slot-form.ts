import { useForm } from 'react-hook-form'
import { httpClient } from 'src/http/http-client'
import TtpApi from 'src/http/ttp/ttp-api'
import { TtpApiResponse } from 'src/http/ttp/ttp-api-response'
import { TtpLocation } from 'src/http/ttp/ttp-location'
import { TtpUserSlot } from 'src/http/ttp/ttp-user-slot'

export type UseCreateUserSlotFormValues = ReturnType<typeof getInitialValues>

export type UseCreateUserSlotFormOnSuccess = (result: {
  ttpUserSlot: TtpUserSlot.IndexRecord
}) => void

export interface UseCreateUserSlotFormProps {
  initialTtpLocation: TtpLocation
  onSuccess: UseCreateUserSlotFormOnSuccess
}

export default function useCreateUserSlotForm({
  initialTtpLocation,
  onSuccess,
}: UseCreateUserSlotFormProps) {
  const form = useForm<UseCreateUserSlotFormValues>({
    defaultValues: getInitialValues({ initialTtpLocation }),
  })

  const ttpLocationIdField = form.register('ttpLocationId', {
    valueAsNumber: true,
  })
  const bodyField = form.register('body')

  const onSubmit = async (data: UseCreateUserSlotFormValues) => {
    form.setValue('apiErrorMessage', '')

    try {
      const body = JSON.parse(data.body)
      const res = await httpClient.send<
        TtpApiResponse<TtpUserSlot.IndexRecord>
      >({
        method: 'POST',
        url: TtpApi.createUserSlotUrl(),
        data: {
          ...body,
          locationId: data.ttpLocationId,
        },
      })

      onSuccess({ ttpUserSlot: res.data.record })
    } catch (err: any) {
      const issues = err.response?.data?.metadata?.issues || []

      form.setValue(
        'apiErrorMessage',
        issues.length > 0
          ? issues
              .map((issue: any) => {
                const { path, message } = issue
                const paths = Array.isArray(path) ? path.join(', ') : path

                return `${paths}: ${message}`
              })
              .join('\n')
          : 'An error ocurred while creating the record. Have you already created a search for this location?',
      )
    }
  }

  return {
    ...form,
    ttpLocationIdField,
    bodyField,
    handleSubmit: form.handleSubmit(onSubmit),
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
