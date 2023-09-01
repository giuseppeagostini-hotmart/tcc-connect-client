import HttpCodes from '@src/common/constants/httpCodes'
import api from '@src/config/request'

import { AuthEndpoints, UsersEndpoint } from '../constants/authEndpoints'

export const login = async (payload: unknown) => {
  const res = await api.post(AuthEndpoints.login, payload, { withCredentials: true })

  return res.data
}

export const signup = async (payload: unknown) => {
  const res = await api.post(AuthEndpoints.signup, payload, { withCredentials: true })

  return res.data
}

export const getIsLogged = async () => {
  const res = await api.get(AuthEndpoints.getIsLogged, { withCredentials: true })

  return res.status === HttpCodes.OK
}

export const getLogout = async () => {
  const res = await api.get(AuthEndpoints.getLogout, { withCredentials: true })

  return res.status === HttpCodes.OK
}

export const getUsers = async () => {
  const res = await api.get(UsersEndpoint.users, { withCredentials: true })

  return res.data
}
