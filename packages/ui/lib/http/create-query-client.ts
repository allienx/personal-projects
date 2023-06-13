import { QueryClient, QueryClientConfig } from '@tanstack/react-query'
import { merge } from 'lodash'

export default function createQueryClient(config?: QueryClientConfig) {
  const mergedConfig = merge(
    {
      defaultOptions: {
        queries: {
          retry: 1,
        },
      },
    },
    config,
  )

  return new QueryClient(mergedConfig)
}
