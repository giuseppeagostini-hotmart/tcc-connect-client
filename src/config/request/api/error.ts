/* eslint-disable no-underscore-dangle */
type Error = {
  statusCode: number
  message: string
  headers?: Record<string, string>
  extra?: unknown
  code?: string
}

class ApiError {
  private _statusCode: number

  private _message: string

  private _headers?: Record<string, string>

  private _extra?: unknown

  private _code?: string

  constructor({ statusCode, message, headers, extra, code }: Error) {
    this._statusCode = statusCode
    this._code = code
    this._message = message
    this._headers = headers
    this._extra = extra
  }

  get statusCode() {
    return this._statusCode
  }

  get code() {
    return this._code
  }

  get message() {
    return this._message
  }

  get headers() {
    return this._headers
  }

  get extra() {
    return this._extra
  }
}

export default ApiError
