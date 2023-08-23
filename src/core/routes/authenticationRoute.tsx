import React from 'react'

import useIsLogged from '@src/auth/hooks/useIsLogged/useIsLogged'
import { Navigate } from 'react-router-dom'

type AuthenticationRouteProps = {
  children: React.ReactNode
}

export const AuthenticationRoute = ({ children }: AuthenticationRouteProps) => {
  const { data } = useIsLogged()

  if (data) {
    return <Navigate to='/home' />
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}
