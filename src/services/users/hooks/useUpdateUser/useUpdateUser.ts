import { useAuthStore } from '@src/auth/hooks/useAuthStore/useAuthStore'
import { useMutation } from '@src/common/hooks/useMutation'

import { updateUser } from '../../usersClient'

export const useUpdateUser = () => {
  const user = useAuthStore((state) => state.user)

  return {
    // eslint-disable-next-line no-underscore-dangle
    updateUser: useMutation((payload) => updateUser(user?._id as string, payload))
  }
}
