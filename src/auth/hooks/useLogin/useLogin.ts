import { login } from '@src/auth/client/authClient'
import { useMutation } from '@src/common/hooks/useMutation'

type UserLoginPayload = {
  email: string
  password: string
}

const useLogin = () =>
  useMutation(({ email, password }: UserLoginPayload) => login({ email, password }))

export default useLogin
