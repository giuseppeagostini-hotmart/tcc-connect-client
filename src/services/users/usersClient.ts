import { UsersEndpoint } from '@src/auth/constants/authEndpoints'
import api from '@src/config/request'

export const getUsers = async () => {
  const res = await api.get(UsersEndpoint.users, { withCredentials: true })

  return res.data
}

export const updateUser = async (id: string, payload: unknown) => {
  const url = UsersEndpoint.updateUser.replace(':id', id)
  const res = await api.put(url, payload, { withCredentials: true })

  return res.data
}
