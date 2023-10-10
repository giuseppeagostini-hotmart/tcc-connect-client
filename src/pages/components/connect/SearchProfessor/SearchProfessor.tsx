/* eslint-disable no-console */
import { useState } from 'react'

import { Alert, Modal, Spin, Table } from 'antd'

import { AlertSearchProfessorButton, AlertSearchProfessorDescription } from './constants'
import useGetColumns from './hook/useGetColumns/useGetColumns'
import useGetProfessor from './hook/useGetProfessor/useGetProfessor'

import AlertDescription from '../TccInfo/AlertDescription/AlertDescription'

import './search.css'

interface SelectedItemProps {
  name: string
  id: string
}

interface SearchProfessorProps {
  nextFunction: () => void
}

const SearchProfessor = ({ nextFunction }: SearchProfessorProps) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const { data: professors, isLoading } = useGetProfessor()
  const [selectedItem, setSelectedItem] = useState<SelectedItemProps | undefined>()
  const columns = useGetColumns()

  const handleClickButton = () => {
    // eslint-disable-next-line no-console
    console.log('click!!')
  }

  const handleClickConfirm = () => {
    nextFunction()
    console.log(selectedItem)
  }

  return (
    <>
      <Modal
        title={<p className='mr-3 my-0'>{`Convide ${selectedItem?.name} para orienta-lo(a)`}</p>}
        open={isOpenModal}
        onOk={() => handleClickConfirm()}
        onCancel={() => setIsOpenModal(false)}
        okText='Confirmar'
        cancelText='Cancelar'
        centered>
        <p className='my-5'>
          Ao confirmar, enviaremos um convite ao professor com seus detalhes, informando seu
          interesse em tê-lo como orientador para o seu Trabalho de Conclusão de Curso.
        </p>
      </Modal>
      <Spin spinning={isLoading}>
        <Table
          columns={columns}
          dataSource={professors}
          pagination={{ defaultPageSize: 5 }}
          rowClassName={() => 'table-row-config'}
          onRow={(record) => {
            return {
              onClick: () => {
                setSelectedItem({ name: record.nameValue as string, id: String(record.key) })
                setIsOpenModal(true)
              }
            }
          }}
          bordered
        />
        <div className='p-4'>
          <Alert
            className='w-full text-start mt-2'
            description={
              <AlertDescription
                handleClickButton={handleClickButton}
                description={AlertSearchProfessorDescription}
                buttonText={AlertSearchProfessorButton}
              />
            }
            type='info'
            showIcon
          />
        </div>
      </Spin>
    </>
  )
}

export default SearchProfessor
