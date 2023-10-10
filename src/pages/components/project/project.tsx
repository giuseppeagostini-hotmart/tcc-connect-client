import React from 'react'

import { Result } from 'antd'

const Project: React.FC = () => (
  <Result
    status='403'
    title='Nenhum projeto ativo encontrado'
    subTitle='Parece que você ainda não possui nenhum projeto ativo. Não se preocupe, é fácil começar! Basta conectar-se com um professor e aguardar a aceitação do convite. Assim que o convite for aceito, você terá acesso a esta aba e poderá iniciar seu projeto.'
  />
)

export default Project
