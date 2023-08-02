import type { ReactNode } from 'react'
import { createContext } from 'react'

import type { User } from 'src/app/parentInfoContext/types'

export type ParentInfoContextProps = {
  user: User
}

type ParentInfoProviderProps = ParentInfoContextProps & {
  children: ReactNode
}

export const ParentInfoContext = createContext<ParentInfoContextProps | null>(null)

export const ParentInfoProvider = ({ children, ...props }: ParentInfoProviderProps) => {
  return <ParentInfoContext.Provider value={props}>{children}</ParentInfoContext.Provider>
}
