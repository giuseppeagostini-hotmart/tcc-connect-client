import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router-dom'

import useAuth from './app/hooks/useAuth/useAuth'
import { ParentInfoProvider } from './app/parentInfoContext'
import type { User } from './app/parentInfoContext/types'
import queryClient from './config/request/queryClient'
import Router from './core/routes/router'

const App = () => {
  const { user } = useAuth()

  return (
    <QueryClientProvider client={queryClient}>
      <ParentInfoProvider user={user as User}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ParentInfoProvider>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  )
}

export default App
