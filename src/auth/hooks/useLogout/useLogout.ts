import { useAuthStore } from '../useAuthStore/useAuthStore'

const useLogout = () => {
  return useAuthStore((state) => state.reset)
}

export default useLogout
