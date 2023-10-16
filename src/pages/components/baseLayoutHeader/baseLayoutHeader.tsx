import { LogoutOutlined, UserOutlined, MailOutlined } from '@ant-design/icons'
import logo from '@src/assets/logoo.png'
import useLogout from '@src/auth/hooks/useLogout/useLogout'
import { getItem } from '@src/common/utils'
import { Avatar, Dropdown, Layout, Space, theme } from 'antd'
import { useNavigate } from 'react-router-dom'

import { AVATAR_LABELS } from '../constants'

const { Header } = Layout

const AVATAR_ITEMS = [
  getItem(AVATAR_LABELS.invites.label, AVATAR_LABELS.invites.key, <MailOutlined />),
  getItem(AVATAR_LABELS.logout.label, AVATAR_LABELS.logout.key, <LogoutOutlined />)
]

interface EventAvatarProps {
  key: string
  keyPath: string[]
}

const BaseLayoutHeader: React.FC = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const logout = useLogout()
  const navigate = useNavigate()

  const handleClick = (event: EventAvatarProps) => {
    if (event.key === AVATAR_LABELS.logout.key) {
      logout()
      navigate('/login')
    }

    if (event.key === AVATAR_LABELS.invites.key) {
      navigate('/connections/pending')
    }
  }

  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
        <div className='ml-4 items-center flex'>
          <img src={logo} alt='logo tcc connect' width='100px' height='30px' />
        </div>
        <Dropdown
          className='mr-4'
          menu={{ items: AVATAR_ITEMS, onClick: handleClick }}
          trigger={['click']}>
          <Space wrap size={16}>
            <Avatar icon={<UserOutlined />} />
          </Space>
        </Dropdown>
      </div>
    </Header>
  )
}

export default BaseLayoutHeader
