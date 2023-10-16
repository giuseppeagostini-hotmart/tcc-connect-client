import React from 'react'

import { Result, Spin } from 'antd'

import CardInvites from './CardInvites/CardInvites'
import useGetInvites from './hooks/useGetInvites/useGetInvites'

import type { CreateInvitePayload } from '../connect/SearchProfessor/hook/useCreateInvite/useCreateInvite'

const Pendentes: React.FC = () => {
  const { data, isError, isLoading } = useGetInvites()

  if (isError || data?.data?.length === 0) {
    return (
      <Result
        status='404'
        title='Nenhum convite pendente encontrado'
        subTitle='Parece que ainda não tem convites pendentes. Não se preocupe, você pode enviar um convite de conexão ao seu orientador facilmente! Basta acessar o menu lateral e selecionar a opção "Conectar" para começar a estabelecer conexões.'
      />
    )
  }

  if (isLoading) {
    return <Spin />
  }

  return (
    <>
      <h1 className='font-sans mt-0 text-gray-600 text-lg'>
        Acompanhe o status de seus convites por aqui
      </h1>
      <p className='font-sans text-gray-500 mb-7 '>
        Verifique o status dos convites enviados aos orientadores. Acompanhe facilmente se foram
        aceitos, recusados ou se ainda estão pendentes.
      </p>
      {data.data.map((item: CreateInvitePayload) => {
        return (
          <div key={item.receiver.name} className='mb-5'>
            <CardInvites name={item.receiver.name as string} />
          </div>
        )
      })}
    </>
  )
}

export default Pendentes
