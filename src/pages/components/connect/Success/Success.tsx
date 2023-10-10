/* eslint-disable react/no-unescaped-entities */
import React from 'react'

import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

const Success: React.FC = () => {
  const navigate = useNavigate()

  const handleClickButton = () => {
    navigate('/connections/pending')
  }

  return (
    <>
      <Result
        status='success'
        title='Convite enviado com sucesso!!'
        subTitle='Para verificar os convites pendentes, por favor, clique no botão abaixo. Ao clicar neste botão, os dados inseridos anteriormente serão perdidos.'
        extra={[
          <Button type='primary' key='console' onClick={() => handleClickButton()}>
            Verificar convites
          </Button>
        ]}
      />
      <p className='my-4'>
        Se quiser se conectar com mais algum professor, basta clicar no botão "Voltar".
      </p>
    </>
  )
}

export default Success
