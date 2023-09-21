import { useState } from 'react'

import { LockOutlined, UserOutlined } from '@ant-design/icons'
import loginImage from '@src/assets/ideogramm.jpeg'
import { useAuthStore } from '@src/auth/hooks/useAuthStore/useAuthStore'
import useLogin from '@src/auth/hooks/useLogin/useLogin'
import useSignup from '@src/auth/hooks/useSignup/useSignup'
import ScreenSizes from '@src/common/constants/screenSizes'
import { useMediaQuery } from '@src/common/hooks/useMediaQuery'
import type { RadioChangeEvent } from 'antd'
import { Button, Form, Input, notification, Image, Typography, Divider, Radio } from 'antd'
import type { NotificationPlacement } from 'antd/es/notification/interface'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'

import LoginHeader from '../loginPage/components/loginHeader'

type FormsValue = {
  password: string
  email: string
  isProfessor: boolean
}

const SignupPage = () => {
  const isMobile = useMediaQuery(`(max-width: ${ScreenSizes.sm})`)
  const { dispatchUser, dispatchToken } = useAuthStore((state) => ({
    dispatchToken: state.dispatchToken,
    dispatchUser: state.dispatchUser
  }))
  const { mutate: mutateSignup, isLoading: isLoadingSignup } = useSignup()
  const { mutate: mutateLogin, isLoading: isLoadingLogin } = useLogin()
  const [api, contextHolder] = notification.useNotification()
  const navigate = useNavigate()
  const [value, setValue] = useState(1)

  const openNotificationError = (placement: NotificationPlacement, error: string) => {
    api.error({
      message: `Ops, nao foi possivel realizar o cadastro`,
      description: error,
      placement
    })
  }

  const openNotificationSuccess = (placement: NotificationPlacement) => {
    api.success({
      message: `Conta criada com sucesso!`,
      description: 'Seja bem vindo ao TCC Connect',
      placement
    })
  }

  const handleNavigate = () => {
    navigate('/login')
  }

  const handleClick = (values: FormsValue) => {
    mutateSignup(
      { password: values.password, email: values.email, isProfessor: value === 1 },
      {
        onSuccess() {
          openNotificationSuccess('bottomRight')
          mutateLogin(
            { password: values.password, email: values.email },
            {
              onSuccess(data) {
                dispatchUser(data.data.findUser)
                dispatchToken(data.data.tokenData.token)
                navigate('/home')
              },
              onError(error) {
                openNotificationError('bottomRight', error.message)
              }
            }
          )
        },
        onError(error) {
          openNotificationError('bottomRight', error.message)
        }
      }
    )
  }

  const classNameGrid = clsx('h-full w-full ', {
    'grid grid-cols-2': !isMobile
  })

  const classNameContainerPage = clsx('py-16', {
    'px-8': isMobile,
    'px-24': !isMobile
  })

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value)
  }

  return (
    <>
      {contextHolder}
      <div className={classNameGrid}>
        {!isMobile && <Image src={loginImage} preview={false} height='100%' />}
        <div className={classNameContainerPage}>
          <LoginHeader description='Bem vindo ao TCC Connect' />
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

            <Radio.Group className='ml-1' onChange={onChange} value={value}>
              <Radio value={1}>Sou professor</Radio>
              <Radio value={2}>Sou Aluno</Radio>
            </Radio.Group>

            <Form.Item className='flex justify-center mt-6 mb-4'>
              <Button
                block
                size='large'
                type='primary'
                htmlType='submit'
                shape='round'
                className='login-form-button'
                loading={isLoadingSignup || isLoadingLogin}
                style={{ paddingRight: '5rem', paddingLeft: '5rem' }}>
                Criar conta
              </Button>
            </Form.Item>

            <Divider className='my-6' />

            <div className='flex justify-center items-center'>
              <Typography className='mr-2 text-gray-400'>
                Ja possui cadastro na plataforma?
              </Typography>
              <Button className='p-0' type='link' onClick={handleNavigate}>
                Faça já seu login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default SignupPage
