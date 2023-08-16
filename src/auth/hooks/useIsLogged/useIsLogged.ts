import { getIsLogged } from '@src/auth/client/authClient'
import { AuthEndpoints } from '@src/auth/constants/authEndpoints'
import { useRequest } from '@src/common/hooks/useRequest'

const useIsLogged = () => {
  return useRequest([AuthEndpoints.getIsLogged()], () => getIsLogged())
}

export default useIsLogged
