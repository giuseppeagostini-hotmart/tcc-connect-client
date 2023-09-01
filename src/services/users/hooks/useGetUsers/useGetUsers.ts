import { UsersEndpoint } from '@src/auth/constants/authEndpoints'
import { useRequest } from '@src/common/hooks/useRequest'

import { getUsers } from '../../usersClient'

const useGetUsers = () => useRequest([`${UsersEndpoint.users}`], () => getUsers())

export default useGetUsers
