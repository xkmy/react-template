import { useRoutes } from 'react-router-dom'
import { wrapper } from '@components/SuspenseWrapper'
import React from 'react'

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: wrapper(React.lazy(() => import('@views/Home')))
    }
  ])
}
