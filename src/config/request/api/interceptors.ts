import HttpCodes from '@src/common/constants/httpCodes'
import type { AxiosError } from 'axios'

import ApiError from './error'
import type { ApiErrorInformation } from './types'

const whenGenericError = (error: AxiosError) => {
  const genericError = new ApiError({
    message: error?.message,
    statusCode: HttpCodes.INTERNAL_SERVER_ERROR
  })

  return Promise.reject(genericError)
}

export const whenRequestWithError = (error: AxiosError) => {
  if (error.request) {
    const requestError = new ApiError({
      statusCode: Number(error.code),
      message: error.request.toString()
    })

    return Promise.reject(requestError)
  }

  return whenGenericError(error)
}

export const whenResponseWithError = (error: AxiosError<ApiErrorInformation>) => {
  if (error.response) {
    const responseError = new ApiError({
      statusCode: error.response.status,
      extra: error.response.data?.extra,
      message: error.response.data?.message ?? ''
    })

    return Promise.reject(responseError)
  }

  return whenGenericError(error)
}
