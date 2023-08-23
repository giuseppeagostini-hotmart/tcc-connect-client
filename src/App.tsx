import useAuth from '@src/app/hooks/useAuth/useAuth'
import { ParentInfoProvider } from '@src/app/parentInfoContext'
import type { User } from '@src/app/parentInfoContext/types'
import queryClient from '@src/config/request/queryClient'
import Router from '@src/core/routes/router'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router-dom'

const App = () => {
  const { user } = useAuth()

  return (
    <QueryClientProvider client={queryClient}>
      <ParentInfoProvider user={user as User}>
        <BrowserRouter basename='/tcc-connect-client'>
          <Router />
        </BrowserRouter>
      </ParentInfoProvider>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  )
}

export default App
