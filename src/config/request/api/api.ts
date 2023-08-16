import axios from 'axios'

import { whenRequestWithError, whenResponseWithError } from './interceptors'

const api = axios.create()

api.interceptors.request.use((config) => config, whenRequestWithError)
api.interceptors.response.use((response) => response, whenResponseWithError)

export default api
