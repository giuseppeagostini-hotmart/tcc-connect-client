import type { ApiError } from '@src/config/request'
import { useMutation as useReactQueryMutation } from '@tanstack/react-query'
import type { MutationFunction, UseMutationOptions } from '@tanstack/react-query'

type Fetcher<Response, Variables> = MutationFunction<Response, Variables>

type Options<Response, Variables, Context> = UseMutationOptions<
  Response,
  ApiError,
  Variables,
  Context
>

const useMutation = <Response, Variables, Context = unknown>(
  fetcher: Fetcher<Response, Variables>,
  options?: Options<Response, Variables, Context>
) => {
  const mutation = useReactQueryMutation<Response, ApiError, Variables, Context>(fetcher, options)

  return mutation
}

export default useMutation
