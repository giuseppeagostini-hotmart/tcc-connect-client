import type { FC, ReactNode } from 'react'

import useIsLogged from '@src/auth/hooks/useIsLogged/useIsLogged'
import { Navigate } from 'react-router-dom'

type AuthenticationRouteProps = {
  children: ReactNode
}

export const AuthenticationRoute: FC<AuthenticationRouteProps> = ({ children }) => {
  const { data } = useIsLogged()

  if (data) {
    return <Navigate to='/home' />
  }

  return children
}
