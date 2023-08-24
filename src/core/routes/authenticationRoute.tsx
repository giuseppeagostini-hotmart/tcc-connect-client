import React, { useEffect } from 'react'

import useIsLogged from '@src/auth/hooks/useIsLogged/useIsLogged'
import { useNavigate } from 'react-router-dom'

type AuthenticationRouteProps = {
  children: React.ReactNode
}

export const AuthenticationRoute = ({ children }: AuthenticationRouteProps) => {
  const { data } = useIsLogged()
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      navigate('/home')
    }
  }, [data, navigate])

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}
