import { RouteObject } from 'react-router-dom'
import HomePage from 'src/pages/home-page'

const appRoutes: RouteObject[] = [
  {
    path: '/',
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]

export default appRoutes
