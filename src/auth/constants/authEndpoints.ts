import RoutesPaths from '@src/core/routes/constants'

const AuthUtil = {
  logged: '/isLogged',
  logout: '/logout'
}

export const AuthEndpoints = {
  login: `${import.meta.env.VITE_REACT_APP_DOMAIN_API_TCC_CONNECT}${RoutesPaths.Login}`,
  signup: `${import.meta.env.VITE_REACT_APP_DOMAIN_API_TCC_CONNECT}${RoutesPaths.Signup}`,
  getIsLogged: `${import.meta.env.VITE_REACT_APP_DOMAIN_API_TCC_CONNECT}${AuthUtil.logged}`,
  getLogout: `${import.meta.env.VITE_REACT_APP_DOMAIN_API_TCC_CONNECT}${AuthUtil.logout}`
}
