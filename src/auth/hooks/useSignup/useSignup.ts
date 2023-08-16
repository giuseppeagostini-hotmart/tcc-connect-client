import { signup } from '@src/auth/client/authClient'
import { useMutation } from '@src/common/hooks/useMutation'

type UserLoginPayload = {
  email: string
  password: string
}

const useSignup = () =>
  useMutation(({ email, password }: UserLoginPayload) => signup({ email, password }))

export default useSignup
