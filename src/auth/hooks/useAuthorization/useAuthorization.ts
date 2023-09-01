import api from '@src/config/request'

import { useAuthStore } from '../useAuthStore/useAuthStore'

const useAuthorization = () => {
  const token = useAuthStore((state) => state.token)
  api.defaults.headers.Authorization = token ? `Bearer ${token}` : null

  return { isLogged: () => Boolean(token) }
}

export default useAuthorization
