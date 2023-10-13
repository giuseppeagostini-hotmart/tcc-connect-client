import { InvitesEndpoint } from '@src/auth/constants/authEndpoints'
import api from '@src/config/request'

export const createInvite = async (payload: unknown) => {
  const res = await api.post(InvitesEndpoint.createInvite, payload, { withCredentials: true })

  return res.data
}

export const getinviteById = async (id: string) => {
  const url = InvitesEndpoint.getInviteById.replace(':id', id)
  const res = await api.get(url, { withCredentials: true })

  return res.data
}
