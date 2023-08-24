import type { ReactNode } from 'react'
import { createContext, useState, useEffect, useContext, useMemo } from 'react'

import api from '@src/config/request'

interface User {
  name: string
  email: string
}

export interface LoginProps {
  user: User
  token: string
}

interface AuthContextData {
  signed: boolean
  user: User | null
  signIn({ user, token }: LoginProps): void
  signOut(): void
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    function loadStorageData() {
      const storagedUser = localStorage.getItem('@RNAuth:user')
      const storagedToken = localStorage.getItem('@RNAuth:token')

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser))
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`
      }
    }

    loadStorageData()
  }, [])

  function signIn({ user: userResponse, token }: LoginProps) {
    setUser(userResponse)

    api.defaults.headers.Authorization = `Bearer ${token}`

    localStorage.setItem('@RNAuth:user', JSON.stringify(userResponse))
    localStorage.setItem('@RNAuth:token', token)
  }

  function signOut() {
    localStorage.clear()
    setUser(null)
  }

  const authContextValue = useMemo(
    () => ({
      signed: !!user,
      user,
      signIn,
      signOut
    }),
    [user]
  )

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
}

function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.')
  }

  return context
}

export { AuthProvider, useAuth }
