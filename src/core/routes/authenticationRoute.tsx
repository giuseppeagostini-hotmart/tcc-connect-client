import React, { useEffect } from 'react'

import { useAuth } from '@src/app/hooks/useAuth/useAuth'
import { useNavigate } from 'react-router-dom'

type AuthenticationRouteProps = {
  children: React.ReactNode
}

export const AuthenticationRoute = ({ children }: AuthenticationRouteProps) => {
  const { signed } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (signed) {
      navigate('/home')
    }
  }, [signed, navigate])

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}
