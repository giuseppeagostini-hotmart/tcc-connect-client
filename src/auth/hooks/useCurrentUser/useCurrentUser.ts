import { useAuthStore } from '../useAuthStore/useAuthStore'

const useCurrentUser = () => {
  return useAuthStore((state) => state.user)
}

export default useCurrentUser
