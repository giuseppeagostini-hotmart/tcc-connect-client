import { LockOutlined, UserOutlined } from '@ant-design/icons'
import loginImage from '@src/assets/loginPage.jpeg'
import useLogin from '@src/auth/hooks/useLogin/useLogin'
import { Button, Form, Input, notification, Image, Divider, Typography } from 'antd'
import type { NotificationPlacement } from 'antd/es/notification/interface'
import { useNavigate } from 'react-router-dom'

import LoginHeader from './components/loginHeader'

type FormsValue = {
  password: string
  email: string
}

const LoginPage = () => {
  const { mutate: mutateLogin, isLoading } = useLogin()
  const [api, contextHolder] = notification.useNotification()
  const navigate = useNavigate()

  const openNotification = (placement: NotificationPlacement, error: string) => {
    api.error({
      message: `Ops, não foi possivel realizar o login`,
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
      <div className='grid grid-cols-2 h-full w-full'>
        <Image src={loginImage} preview={false} height='100%' />
        <div className='py-20 px-24'>
          <LoginHeader description='Seja bem vindo novamente!' />
          <Form
            name='normal_login'
            className='login-form'
            initialValues={{ remember: true }}
            onFinish={handleClick}>
            <span className='text-gray-400'>Insira seu email</span>

            <Form.Item
              className='mb-6'
              name='email'
              rules={[{ required: true, message: 'Please input your Username!' }]}>
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='Email'
                size='large'
              />
            </Form.Item>
            <span className='text-gray-400'>Insira sua senha</span>
            <Form.Item
              className='mb-8'
              name='password'
              rules={[{ required: true, message: 'Please input your Password!' }]}>
              <Input
                prefix={<LockOutlined className='site-form-item-icon' />}
                type='password'
                placeholder='Senha'
                size='large'
              />
            </Form.Item>

            <Form.Item className='flex justify-center mt-10 mb-8'>
              <Button
                block
                size='large'
                type='primary'
                htmlType='submit'
                shape='round'
                className='login-form-button'
                loading={isLoading}
                style={{ paddingRight: '5rem', paddingLeft: '5rem' }}>
                Entrar
              </Button>
            </Form.Item>

            <Divider className='my-6' />

            <div className='flex justify-center items-center'>
              <Typography className='mr-2 text-gray-400'>Novo na plataforma?</Typography>
              <Button className='p-0' type='link' onClick={handleNavigate}>
                Clique aqui e se inscreva
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default LoginPage
