import type { AxiosRequestHeaders } from 'axios'

export type RequestHeaders = AxiosRequestHeaders
export type ResponseError = {
  currentDate: string
  status: string
  code: string
  message: string
  details: string
  extra: unknown
}

export type ApiErrorInformation = {
  code: string
  extra: unknown
  status: string
  details: string
  currentDate: string
  message?: string
}
