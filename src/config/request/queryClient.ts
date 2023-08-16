import HttpCodes from '@src/common/constants/httpCodes'
import { QueryClient } from '@tanstack/react-query'

import type { ApiError } from './api'

const DEFAULT_STALE_TIME_IN_MINUTES = 30
const ONE_MINUTE_IN_SECONDS = 60
const ONE_SECOND_IN_MILISECONDS = 1000
const DEFAULT_STALE_TIME =
  DEFAULT_STALE_TIME_IN_MINUTES * ONE_MINUTE_IN_SECONDS * ONE_SECOND_IN_MILISECONDS // 30 minutes

export const retry = (failureCount: number, error: unknown) => {
  const maxRetries = 2
  const { statusCode } = error as ApiError

  const isTotalOfFailureLowerOrEqualMaxRetries = failureCount <= maxRetries

  return (
    (statusCode < HttpCodes.BAD_REQUEST || statusCode >= HttpCodes.INTERNAL_SERVER_ERROR) &&
    isTotalOfFailureLowerOrEqualMaxRetries
  )
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry,
      refetchOnWindowFocus: false,
      staleTime: DEFAULT_STALE_TIME
    }
  }
})

export default queryClient
