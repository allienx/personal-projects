import { RouteObject } from 'react-router-dom'
import AuthPage from 'src/pages/auth-page'
import HomePage from 'src/pages/home-page'

const appRoutes: RouteObject[] = [
  {
    path: '/',
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'auth',
        element: <AuthPage />,
      },
    ],
  },
]

export default appRoutes
