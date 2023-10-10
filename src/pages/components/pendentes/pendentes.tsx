import React from 'react'

import { Result } from 'antd'

const Pendentes: React.FC = () => (
  <Result
    status='404'
    title='Nenhum convite pendente encontrado'
    subTitle='Parece que ainda não tem convites pendentes. Não se preocupe, você pode enviar um convite de conexão ao seu orientador facilmente! Basta acessar o menu lateral e selecionar a opção "Conectar" para começar a estabelecer conexões.'
  />
)

export default Pendentes
