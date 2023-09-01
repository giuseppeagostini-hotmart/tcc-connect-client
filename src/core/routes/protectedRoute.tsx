import React, { useEffect } from 'react'

import useAuthorization from '@src/auth/hooks/useAuthorization/useAuthorization'
import { useNavigate } from 'react-router-dom'

type ProtectedRouteProps = {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLogged } = useAuthorization()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLogged()) {
      navigate('/login')
    }
  }, [isLogged, navigate])

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}
