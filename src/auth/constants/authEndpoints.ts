import RoutesPaths from '@src/core/routes/constants'

const prodURL = 'https://api-tcc-connect.onrender.com'

const baseURL = import.meta.env.DEV
  ? import.meta.env.VITE_REACT_APP_DOMAIN_API_TCC_CONNECT
  : prodURL

const AuthUtil = {
  logged: '/isLogged',
  logout: '/logout'
}

export const AuthEndpoints = {
  login: `${baseURL}${RoutesPaths.Login}`,
  signup: `${baseURL}${RoutesPaths.Signup}`,
  getIsLogged: `${baseURL}${AuthUtil.logged}`,
  getLogout: `${baseURL}${AuthUtil.logout}`
}

export const UsersEndpoint = {
  users: `${baseURL}/users`
}
