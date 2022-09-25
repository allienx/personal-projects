import { QueryClient } from '@tanstack/react-query'

export default function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
      },
    },
  })
}
