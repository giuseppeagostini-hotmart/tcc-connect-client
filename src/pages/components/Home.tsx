import {
  SmileOutlined,
  FileTextOutlined,
  UserOutlined,
  SearchOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons'
import { useAuthStore } from '@src/auth/hooks/useAuthStore/useAuthStore'
import ScreenSizes from '@src/common/constants/screenSizes'
import { useMediaQuery } from '@src/common/hooks/useMediaQuery'
import { getItem } from '@src/common/utils'
import { Layout, Menu, theme } from 'antd'

import BaseLayoutHeader from './baseLayoutHeader/baseLayoutHeader'
import ContentHome from './contentHome/contentHome'
import SideMenu from './sideMenu/sideMenu'
import type { MenuItem } from './types'

const { Content, Footer } = Layout

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

const App: React.FC = () => {
  const isMobile = useMediaQuery(`(max-width: ${ScreenSizes.sm})`)
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const user = useAuthStore((state) => state.user)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {!isMobile && <SideMenu />}
      <Layout>
        <BaseLayoutHeader />
        <Content style={{ margin: '20px 16px' }}>
          <div
            style={{
              padding: 24,
              minHeight: '100%',
              background: colorBgContainer,
              borderRadius: '8px'
            }}>
            <ContentHome />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', padding: 0 }}>
          {isMobile && (
            <Menu
              theme='dark'
              defaultSelectedKeys={['1']}
              mode='horizontal'
              items={user?.isProfessor ? professorItems : studentItems}
            />
          )}
        </Footer>
      </Layout>
    </Layout>
  )
}

export default App
