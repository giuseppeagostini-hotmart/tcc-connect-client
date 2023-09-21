import {
  SmileOutlined,
  FileTextOutlined,
  UserOutlined,
  SearchOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons'
import { useAuthStore } from '@src/auth/hooks/useAuthStore/useAuthStore'
import { getItem } from '@src/common/utils'
import RoutesPaths from '@src/core/routes/constants'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useNavigate } from 'react-router-dom'

import type { MenuItem } from '../types'

export const professorItems: MenuItem[] = [
  getItem('Inicio', RoutesPaths.Home, <SmileOutlined />),
  getItem('Projetos', RoutesPaths.Project, <FileTextOutlined />),
  getItem('Conexões', RoutesPaths.Connections, <UserOutlined />)
]

const studentItems: MenuItem[] = [
  getItem('Inicio', RoutesPaths.Home, <SmileOutlined />),
  getItem('Projeto', RoutesPaths.Project, <FileTextOutlined />),
  getItem('Conexões', RoutesPaths.Connections, <UserOutlined />, [
    getItem('Buscar', RoutesPaths.ConnectionsSearch, <SearchOutlined />),
    getItem('Pendentes', RoutesPaths.ConnectionsPending, <QuestionCircleOutlined />)
  ])
]

interface MenuAntdProps {
  mode: 'inline' | 'horizontal'
}

const MenuAntd = ({ mode }: MenuAntdProps) => {
  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate()

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key)
  }

  return (
    <Menu
      onClick={onClick}
      theme='dark'
      defaultSelectedKeys={[RoutesPaths.Home]}
      mode={mode}
      items={user?.isProfessor ? professorItems : studentItems}
    />
  )
}

export default MenuAntd
