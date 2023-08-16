import { getLogout } from '@src/auth/client/authClient'
import { useMutation } from '@src/common/hooks/useMutation'

const useLogout = () => useMutation(() => getLogout())

export default useLogout
