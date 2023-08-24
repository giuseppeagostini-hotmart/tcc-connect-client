import React, { useEffect } from 'react'

import useIsLogged from '@src/auth/hooks/useIsLogged/useIsLogged'
import { Space, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'

type ProtectedRouteProps = {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { data, isLoading } = useIsLogged()
  const navigate = useNavigate()

  useEffect(() => {
    if (!data) {
      navigate('/login')
    }
  }, [data, navigate])

  if (isLoading) {
    return (
      <Space size='middle'>
        <Spin />
      </Space>
    )
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}
