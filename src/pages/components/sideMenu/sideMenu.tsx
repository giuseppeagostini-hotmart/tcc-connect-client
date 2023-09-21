import { useState } from 'react'

import { Layout } from 'antd'

import MenuAntd from '../menu/menu'

const { Sider } = Layout

const SideMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <MenuAntd mode='inline' />
    </Sider>
  )
}

export default SideMenu
