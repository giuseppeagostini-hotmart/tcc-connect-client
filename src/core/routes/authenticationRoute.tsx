import React, { useEffect } from 'react'

import useAuthorization from '@src/auth/hooks/useAuthorization/useAuthorization'
import { useNavigate } from 'react-router-dom'

type AuthenticationRouteProps = {
  children: React.ReactNode
}

export const AuthenticationRoute = ({ children }: AuthenticationRouteProps) => {
  const { isLogged } = useAuthorization()

  const navigate = useNavigate()

  useEffect(() => {
    if (isLogged()) {
      navigate('/home')
    }
  }, [isLogged, navigate])

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}
