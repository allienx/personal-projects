import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { FieldValues, useForm, UseFormProps } from 'react-hook-form'
import HttpClient from '../http/http-client'

interface ApiFormValues extends FieldValues {
  apiErrorMessage: string
}

export type UseApiFormSuccess<V, D> = (result: {
  formValues: V
  httpResponse: AxiosResponse<D>
}) => void

interface UseApiFormOpts<V extends ApiFormValues, D> {
  httpClient: HttpClient
  opts: UseFormProps<V>
  getHttpConfig: (data: V) => AxiosRequestConfig<D>
  onSuccess: UseApiFormSuccess<V, D>
}

export default function useApiForm<V extends ApiFormValues, D>({
  httpClient,
  opts,
  getHttpConfig,
  onSuccess,
}: UseApiFormOpts<V, D>) {
  const form = useForm<V>(opts)

  const handleSubmit = form.handleSubmit(async (data) => {
    // @ts-ignore
    form.setValue('apiErrorMessage', '')

    try {
      const res = await httpClient.send<D>({
        method: 'POST',
        ...getHttpConfig(data),
      })

      onSuccess({ formValues: data, httpResponse: res })
    } catch (err: any) {
      const issues = err.response?.data?.metadata?.issues || []
      const apiErrorMessage =
        issues.length > 0
          ? issues
              .map((issue: any) => {
                const { path, message } = issue
                const paths = Array.isArray(path) ? path.join(', ') : path

                return `${paths}: ${message}`
              })
              .join('\n')
          : 'An error ocurred while creating the record. Have you already created a search for this location?'

      // @ts-ignore
      form.setValue('apiErrorMessage', apiErrorMessage)
    }
  })

  return {
    ...form,
    handleSubmit,
  }
}
