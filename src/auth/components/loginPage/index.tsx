import { LockOutlined, UserOutlined } from '@ant-design/icons'
import useLogin from '@src/auth/hooks/useLogin/useLogin'
import { Button, Card, Form, Input, notification } from 'antd'
import type { NotificationPlacement } from 'antd/es/notification/interface'
import { useNavigate } from 'react-router-dom'

type FormsValue = {
  password: string
  email: string
}

const LoginPage = () => {
  const { mutate: mutateLogin } = useLogin()
  const [api, contextHolder] = notification.useNotification()
  const navigate = useNavigate()

  const openNotification = (placement: NotificationPlacement, error: string) => {
    api.error({
      message: `Ops, nao foi possivel realizar o login`,
      description: error,
      placement
    })
  }

  const handleNavigate = () => {
    navigate('/signup')
  }

  const handleClick = (values: FormsValue) => {
    mutateLogin(
      { password: values.password, email: values.email },
      {
        onSuccess() {
          navigate('/home')
        },
        onError(error) {
          openNotification('bottomRight', error.message)
        }
      }
    )
  }

  return (
    <>
      {contextHolder}
      <Card title='TCC Connect Login' bordered={false} style={{ width: 300 }}>
        <Form
          name='normal_login'
          className='login-form'
          initialValues={{ remember: true }}
          onFinish={handleClick}>
          <Form.Item
            name='email'
            rules={[{ required: true, message: 'Please input your Username!' }]}>
            <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='email' />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' className='login-form-button'>
              Log in
            </Button>
          </Form.Item>

          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Button onClick={handleNavigate}>Registre-se</Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}

export default LoginPage
