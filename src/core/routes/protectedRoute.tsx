import React, { useEffect } from 'react'

import { useAuth } from '@src/app/hooks/useAuth/useAuth'
import { useNavigate } from 'react-router-dom'

type ProtectedRouteProps = {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { signed } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!signed) {
      navigate('/login')
    }
  }, [signed, navigate])

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}
