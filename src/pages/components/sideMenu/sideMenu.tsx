import { useState } from 'react'

import {
  FileTextOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  SmileOutlined,
  UserOutlined
} from '@ant-design/icons'
import { useAuthStore } from '@src/auth/hooks/useAuthStore/useAuthStore'
import { getItem } from '@src/common/utils'
import { Layout, Menu } from 'antd'

import type { MenuItem } from '../types'

const { Sider } = Layout

export const professorItems: MenuItem[] = [
  getItem('Inicio', '1', <SmileOutlined />),
  getItem('Projetos', '2', <FileTextOutlined />),
  getItem('Conexões', '3', <UserOutlined />)
]

const studentItems: MenuItem[] = [
  getItem('Inicio', '1', <SmileOutlined />),
  getItem('Projeto', '2', <FileTextOutlined />),
  getItem('Conexões', '3', <UserOutlined />, [
    getItem('Buscar', '4', <SearchOutlined />),
    getItem('Pendentes', '5', <QuestionCircleOutlined />)
  ])
]

const SideMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const user = useAuthStore((state) => state.user)

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div className='demo-logo-vertical' />
      <Menu
        theme='dark'
        defaultSelectedKeys={['1']}
        mode='inline'
        items={user?.isProfessor ? professorItems : studentItems}
      />
    </Sider>
  )
}

export default SideMenu
