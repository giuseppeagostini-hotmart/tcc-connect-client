/* eslint-disable no-underscore-dangle */
import { useAuthStore, type User } from '@src/auth/hooks/useAuthStore/useAuthStore'
import { useMutation } from '@src/common/hooks/useMutation'
import { createInvite } from '@src/services/invites/invitesClient'

export type CreateInvitePayload = {
  receiver: Partial<User>
}

const useCreateInvite = () => {
  const { name, id } = useAuthStore((state) => ({ name: state.user?.name, id: state.user?._id }))

  return useMutation(({ receiver }: CreateInvitePayload) =>
    createInvite({ receiver, sender: { name, _id: id } })
  )
}

export default useCreateInvite
