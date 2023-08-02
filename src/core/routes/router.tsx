import { lazy, Suspense } from 'react'

import RoutesPaths from '@src/core/routes/constants'
import { Routes, Route, Navigate } from 'react-router-dom'

const Home = lazy(() => import('@src/pages/Home'))
const NotFound = lazy(() => import('@src/pages/NotFound'))

const Router = () => {
  return (
    <Suspense>
      <Routes>
        <Route path={RoutesPaths.Home} element={<Home />} />
        <Route path={RoutesPaths.NotFound} element={<NotFound />} />
        <Route path='*' element={<Navigate to={RoutesPaths.Home} />} />
      </Routes>
    </Suspense>
  )
}

export default Router
