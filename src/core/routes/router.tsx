import { lazy, Suspense } from 'react'

import RoutesPaths from '@src/core/routes/constants'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'

import { AuthenticationRoute } from './authenticationRoute'
import { ProtectedRoute } from './protectedRoute'

const Home = lazy(() => import('@src/pages/Home'))
const NotFound = lazy(() => import('@src/pages/NotFound'))
const LoginPage = lazy(() => import('@src/auth/components/loginPage'))
const SignupPage = lazy(() => import('@src/auth/components/signupPage'))

const Router = () => {
  return (
    <Suspense>
      <BrowserRouter basename='/tcc-connect-client'>
        <Routes>
          <Route
            path={RoutesPaths.Login}
            element={
              <AuthenticationRoute>
                <LoginPage />
              </AuthenticationRoute>
            }
          />
          <Route
            path={RoutesPaths.Signup}
            element={
              <AuthenticationRoute>
                <SignupPage />
              </AuthenticationRoute>
            }
          />
          <Route
            path={RoutesPaths.Home}
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path={RoutesPaths.NotFound} element={<NotFound />} />
          <Route path='*' element={<Navigate to={RoutesPaths.Home} />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default Router
