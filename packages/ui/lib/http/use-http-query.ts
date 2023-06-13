import { useQuery } from '@tanstack/react-query'
import { UseQueryOptions } from '@tanstack/react-query/src/types'
import { AxiosRequestConfig } from 'axios'
import HttpClient from './http-client'

interface UseHttpQueryOpts<D> {
  httpClient: HttpClient
  url: string
  config?: Omit<AxiosRequestConfig<D>, 'url'>
  queryOpts?: Omit<UseQueryOptions<D, any, any, any>, 'queryKey' | 'queryFn'>
}

export default function useHttpQuery<D>({
  httpClient,
  url,
  config,
  queryOpts,
}: UseHttpQueryOpts<D>) {
  return useQuery<D>({
    queryKey: [url, config?.params],
    queryFn: async () => {
      const res = await httpClient.send<D>({
        method: 'GET',
        url,
        ...config,
      })

      return res.data
    },
    ...queryOpts,
  })
}
