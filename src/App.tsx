import { AuthProvider } from '@src/app/hooks/useAuth/useAuth'
import queryClient from '@src/config/request/queryClient'
import Router from '@src/core/routes/router'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router-dom'

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter basename={import.meta.env.DEV ? '/' : '/tcc-connect-client/'}>
          <Router />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
