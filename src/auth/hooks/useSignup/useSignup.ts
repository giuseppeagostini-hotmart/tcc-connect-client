import { signup } from '@src/auth/client/authClient'
import { useMutation } from '@src/common/hooks/useMutation'

type UserLoginPayload = {
  email: string
  password: string
  isProfessor: boolean
}

const useSignup = () =>
  useMutation(({ email, password, isProfessor }: UserLoginPayload) =>
    signup({ email, password, isProfessor })
  )

export default useSignup
