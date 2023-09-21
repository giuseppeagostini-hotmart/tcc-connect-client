import { Suspense } from 'react'

import ScreenSizes from '@src/common/constants/screenSizes'
import { useMediaQuery } from '@src/common/hooks/useMediaQuery'
import { Layout, Spin, theme } from 'antd'

import BaseLayoutHeader from '../baseLayoutHeader/baseLayoutHeader'
import MenuAntd from '../menu/menu'
import SideMenu from '../sideMenu/sideMenu'

const { Content, Footer } = Layout

interface BaseLayoutProps {
  children: React.ReactNode
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  const isMobile = useMediaQuery(`(max-width: ${ScreenSizes.sm})`)
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <div>
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
              <Suspense fallback={<Spin />}>{children}</Suspense>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center', padding: 0 }}>
            {isMobile && <MenuAntd mode='horizontal' />}
          </Footer>
        </Layout>
      </Layout>
    </div>
  )
}

export default BaseLayout
