import { whenRequestWithError, whenResponseWithError } from '@src/config/request/api/interceptors'
import axios from 'axios'

const api = axios.create()

api.defaults.headers.common.Authorization = localStorage.getItem('token')
api.interceptors.request.use((config) => config, whenRequestWithError)
api.interceptors.response.use((response) => response, whenResponseWithError)

export default api
