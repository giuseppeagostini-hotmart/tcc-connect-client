import { useEffect } from 'react'

import useAuthorization from '@src/auth/hooks/useAuthorization/useAuthorization'
import BaseLayout from '@src/pages/components/baseLayout/baseLayout'
import { Outlet, useNavigate } from 'react-router-dom'

export const ProtectedRoute = () => {
  const { isLogged } = useAuthorization()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLogged()) {
      navigate('/login')
    }
  }, [isLogged, navigate])

  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  )
}
