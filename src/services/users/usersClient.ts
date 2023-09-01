import { UsersEndpoint } from '@src/auth/constants/authEndpoints'
import api from '@src/config/request'

export const getUsers = async () => {
  const res = await api.get(UsersEndpoint.users, { withCredentials: true })

  return res.data
}
