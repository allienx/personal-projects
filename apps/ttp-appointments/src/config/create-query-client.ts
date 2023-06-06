import { QueryClient } from '@tanstack/react-query'
import { EnvVars } from 'src/config/env-vars'

export default function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: EnvVars.isDev ? 60 * 60 * 1000 : undefined,
      },
    },
  })
}
