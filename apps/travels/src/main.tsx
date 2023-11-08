import './main.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { EnvVars } from 'src/config/env-vars'
import appRoutes from 'src/pages/_app-routes'
import createQueryClient from 'ui/lib/http/create-query-client'

const container = document.getElementById('app')
const root = createRoot(container!)

const queryClient = createQueryClient({
  defaultOptions: {
    queries: {
      staleTime: EnvVars.isDev ? 60 * 60 * 1000 : undefined,
    },
  },
})

const router = createBrowserRouter(appRoutes)

root.render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />

    <ReactQueryDevtools />
  </QueryClientProvider>,
)
