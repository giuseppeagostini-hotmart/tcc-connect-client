import type ApiError from '@src/config/request/error'
import type { UseQueryOptions } from '@tanstack/react-query'
import { useQueryClient, useQuery } from '@tanstack/react-query'

export type Fetcher<Response> = () => Response | Promise<Response>

export type UseRequestOptions<Response, Select = Response> = UseQueryOptions<
  Response,
  ApiError,
  Select
>

const useRequest = <Response, Select = Response>(
  keys: string[],
  fetcher: Fetcher<Response>,
  options?: UseRequestOptions<Response, Select>
) => {
  const response = useQuery<Response, ApiError, Select>(keys, fetcher, { ...options })

  const queryClient = useQueryClient()
  const invalidate = () => {
    return queryClient.invalidateQueries(keys)
  }

  return {
    invalidate,
    ...response
  }
}

export default useRequest
