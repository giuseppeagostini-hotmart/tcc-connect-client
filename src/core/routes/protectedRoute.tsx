import type { FC, ReactNode } from 'react'

import useIsLogged from '@src/auth/hooks/useIsLogged/useIsLogged'
import { Navigate } from 'react-router-dom'

type ProtectedRouteProps = {
  children: ReactNode
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { data } = useIsLogged()

  if (!data) {
    return <Navigate to='/login' />
  }

  return children
}
