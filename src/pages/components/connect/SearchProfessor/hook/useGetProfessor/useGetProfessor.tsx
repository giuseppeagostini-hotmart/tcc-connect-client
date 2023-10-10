import { UsersEndpoint } from '@src/auth/constants/authEndpoints'
import { useRequest } from '@src/common/hooks/useRequest'
import { getProfessor } from '@src/services/users/usersClient'
import { Badge } from 'antd'

import { useGetCampusLabel } from '../useGetCampusName/useGetCampusName'

type OriginalObject = {
  _id: string
  name: string
  campus: string
  interests: string[]
  isProfessorAvaliable: boolean
  // Adicione outros campos, se necessário
}

const useGetProfessor = () => {
  const findLabel = useGetCampusLabel()
  const { data, ...resp } = useRequest([`${UsersEndpoint.getProfessor}`], () => getProfessor())

  const newList = data?.data?.map((obj: OriginalObject) => {
    return {
      // eslint-disable-next-line no-underscore-dangle
      key: obj._id,
      nameValue: obj.name,
      name: <p className='p-0 m0 text-blue-700'>{obj.name}</p>,
      campus:
        obj.campus === 'PA' ? 'Pampulha' : findLabel({ campus: obj.campus, collage: 'PUCMG' }),
      interests: obj.interests,
      isProfessorAvaliable: obj.isProfessorAvaliable ? (
        <Badge dot status='success' text='Disponivel' />
      ) : (
        <Badge dot status='error' text='Nāo disponivel' />
      )
    }
  })

  return {
    ...resp,
    data: newList
  }
}

export default useGetProfessor
