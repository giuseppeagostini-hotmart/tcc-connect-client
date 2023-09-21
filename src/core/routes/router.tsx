import { lazy } from 'react'

import RoutesPaths from '@src/core/routes/constants'
import { Routes, Route } from 'react-router-dom'

import { AuthenticationRoute } from './authenticationRoute'
import { ProtectedRoute } from './protectedRoute'

const Pendentes = lazy(() => import('@src/pages/components/pendentes/pendentes'))
const Busca = lazy(() => import('@src/pages/components/busca/busca'))
const Home = lazy(() => import('@src/pages/components/Home'))
const NotFound = lazy(() => import('@src/pages/NotFound'))
const LoginPage = lazy(() => import('@src/auth/components/loginPage'))
const SignupPage = lazy(() => import('@src/auth/components/signupPage'))
const Project = lazy(() => import('@src/pages/components/project/project'))

const Router = () => {
  return (
    <Routes>
      <Route element={<AuthenticationRoute />}>
        <Route path={RoutesPaths.Signup} element={<SignupPage />} />
        <Route path={RoutesPaths.Login} element={<LoginPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path={RoutesPaths.Home} element={<Home />} />
        <Route path={RoutesPaths.Project} element={<Project />} />
        <Route path={RoutesPaths.Connections} element={<Home />} />
        <Route path={RoutesPaths.ConnectionsPending} element={<Pendentes />} />
        <Route path={RoutesPaths.ConnectionsSearch} element={<Busca />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default Router
