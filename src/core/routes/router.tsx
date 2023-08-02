import { lazy, Suspense } from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'

import RoutesPaths from './constants'

const Home = lazy(() => import('../../pages/Home'))
const NotFound = lazy(() => import('../../pages/NotFound'))

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
