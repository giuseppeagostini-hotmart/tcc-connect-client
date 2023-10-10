/* eslint-disable react/no-unescaped-entities */
import { Spin, Table } from 'antd'

import useGetColumns from '../connect/SearchProfessor/hook/useGetColumns/useGetColumns'
import useGetProfessor from '../connect/SearchProfessor/hook/useGetProfessor/useGetProfessor'

const Busca: React.FC = () => {
  const columns = useGetColumns()
  const { data: professors, isLoading } = useGetProfessor()

  return (
    <div>
      <Spin spinning={isLoading}>
        <h2 className='mt-2 font-sans antialiased text-lg text-gray-800'>
          Visualize nossos professores
        </h2>
        <p className='my-7 font-sans antialiased text-sm text-gray-500 font-medium'>
          Aqui, você pode explorar a lista de professores disponíveis antes de escolher aquele com
          quem deseja se conectar. Quando estiver pronto para fazer sua escolha, vá para a aba
          "Conectar" no menu e inicie seu processo de conexão.
        </p>

        <Table
          columns={columns}
          dataSource={professors}
          pagination={{ defaultPageSize: 5 }}
          bordered
        />
      </Spin>
    </div>
  )
}

export default Busca
