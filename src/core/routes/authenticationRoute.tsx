import { Suspense, useEffect } from 'react'

import useAuthorization from '@src/auth/hooks/useAuthorization/useAuthorization'
import { Outlet, useNavigate } from 'react-router-dom'

export const AuthenticationRoute = () => {
  const { isLogged } = useAuthorization()

  const navigate = useNavigate()

  useEffect(() => {
    if (isLogged()) {
      navigate('/home')
    }
  }, [isLogged, navigate])

  return (
    <Suspense>
      <Outlet />
    </Suspense>
  )
}
