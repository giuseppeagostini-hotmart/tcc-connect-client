import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  name: string
  email: string
  isProfessor: boolean
  firstTime: boolean
}

interface State {
  user: User | null
  token: string | null
}

interface Actions {
  dispatchUser: (user: User) => void
  dispatchToken: (token: string) => void
  reset: () => void
}

const initialState: State = {
  user: null,
  token: null
}

const STORE_NAME = 'auth-storage'

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      ...initialState,
      dispatchUser: (user) => set({ user }),
      dispatchToken: (token) => set({ token }),
      reset: () => set(initialState)
    }),
    {
      name: STORE_NAME
    }
  )
)
