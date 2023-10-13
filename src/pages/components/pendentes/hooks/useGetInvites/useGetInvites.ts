/* eslint-disable no-underscore-dangle */
import { InvitesEndpoint } from '@src/auth/constants/authEndpoints'
import { useAuthStore } from '@src/auth/hooks/useAuthStore/useAuthStore'
import { useRequest } from '@src/common/hooks/useRequest'
import { getinviteById } from '@src/services/invites/invitesClient'

const useGetInvites = () => {
  const user = useAuthStore((state) => state.user)

  return useRequest(
    [`${InvitesEndpoint.getInviteById}`],
    () => getinviteById(user?._id as string),
    { cacheTime: 0 }
  )
}

export default useGetInvites
