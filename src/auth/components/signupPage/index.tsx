import { LockOutlined, UserOutlined } from '@ant-design/icons'
import useSignup from '@src/auth/hooks/useSignup/useSignup'
import { Button, Card, Form, Input, notification } from 'antd'
import type { NotificationPlacement } from 'antd/es/notification/interface'

type FormsValue = {
  password: string
  email: string
}

const SignupPage = () => {
  const { mutate: mutateSignup } = useSignup()
  const [api, contextHolder] = notification.useNotification()

  const openNotification = (placement: NotificationPlacement, error: string) => {
    api.error({
      message: `Ops, nao foi possivel realizar o cadastro`,
      description: error,
      placement
    })
  }

  const handleClick = (values: FormsValue) => {
    mutateSignup(
      { password: values.password, email: values.email },
      {
        onSuccess() {
          console.log('deu bom')
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
        </Form>
      </Card>
    </>
  )
}

export default SignupPage
