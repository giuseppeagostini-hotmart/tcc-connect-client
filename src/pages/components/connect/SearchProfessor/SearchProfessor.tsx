/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'

import { ArrowLeftOutlined } from '@ant-design/icons'
import { InvitesEndpoint } from '@src/auth/constants/authEndpoints'
import { useQueryClient } from '@tanstack/react-query'
import { Alert, Button, Modal, Spin, Table, notification } from 'antd'
import type { NotificationPlacement } from 'antd/es/notification/interface'

import { AlertSearchProfessorButton, AlertSearchProfessorDescription } from './constants'
import useCreateInvite from './hook/useCreateInvite/useCreateInvite'
import useGetColumns from './hook/useGetColumns/useGetColumns'
import useGetProfessor from './hook/useGetProfessor/useGetProfessor'
import useGetProfessorByIA from './hook/useGetProfessorByIA/useGetProfessorByIA'

import AlertDescription from '../TccInfo/AlertDescription/AlertDescription'

import './search.css'

interface SelectedItemProps {
  name: string
  id: string
}

interface SearchProfessorProps {
  nextFunction: () => void
  tags: string[]
  title: string
}

const SearchProfessor = ({ nextFunction, tags, title }: SearchProfessorProps) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [listaFiltrada, setListaFiltrada] = useState([])
  const { data: professors, isLoading } = useGetProfessor()
  const [selectedItem, setSelectedItem] = useState<SelectedItemProps | undefined>()
  const columns = useGetColumns()
  const { mutate: mutateCreateInvite, isLoading: createInviteloading } = useCreateInvite()
  const [api, contextHolder] = notification.useNotification()
  const queryClient = useQueryClient()
  const { mutate: mutateGetProfessorIA, isLoading: mutateIsLoading } = useGetProfessorByIA()
  const openNotificationError = (
    placement: NotificationPlacement,
    error: string,
    message: string
  ) => {
    api.error({
      message,
      description: error,
      placement
    })
  }

  const handleClickResetFilter = () => {
    setListaFiltrada([])
  }

  const openNotificationWarning = (placement: NotificationPlacement) => {
    api.warning({
      message: 'Ops, não conseguimos encontrar um professor ideal para você',
      description: 'Talvez trocar a palavra chave e o titulo possa ajudar a encontrarmos para você',
      placement
    })
  }

  const handleClickButton = () => {
    const professorList = professors.map((item: any) => {
      return { id: item.key, name: item.nameValue, interests: item.interests }
    })

    mutateGetProfessorIA(
      { professorList: JSON.stringify(professorList), tags, title },
      {
        onSuccess(data) {
          const resp = JSON.parse(data.resp.text)
          if (!resp || resp.recommended_professors.length === 0) {
            openNotificationWarning('bottomRight')

            return
          }

          const idsSugeridos = new Set(resp.recommended_professors.map((item: any) => item.id))
          const newListProff = professors.filter((item: any) => idsSugeridos.has(item.key))

          setListaFiltrada(newListProff)
        },
        onError() {
          openNotificationError(
            'bottomRight',
            'Tente novamente mais tarde',
            'Ops, tivemos um problema buscar um professor'
          )
        }
      }
    )
  }

  const handleClickConfirm = () => {
    mutateCreateInvite(
      {
        receiver: {
          _id: selectedItem?.id,
          name: selectedItem?.name
        }
      },
      {
        onSuccess() {
          nextFunction()
          queryClient.invalidateQueries({
            // eslint-disable-next-line no-underscore-dangle
            queryKey: [`${InvitesEndpoint.getInviteById}`]
          })
        },
        onError(error) {
          openNotificationError(
            'bottomRight',
            error.message,
            'Ops, tivemos um problema ao enviar o convite'
          )
        }
      }
    )
  }

  return (
    <>
      {contextHolder}
      <Modal
        title={<p className='mr-3 my-0'>{`Convide ${selectedItem?.name} para orienta-lo(a)`}</p>}
        open={isOpenModal}
        okButtonProps={{ loading: createInviteloading }}
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
      <Spin spinning={isLoading || mutateIsLoading} tip='Aguarde um instante'>
        {listaFiltrada.length !== 0 && (
          <div className='flex ml-4'>
            <p className='mr-4'>
              Aqui estão os professores que mais recomendamos para você. Se desejar visualizar a
              lista original, clique no botão ao lado.
            </p>
            <Button className='mr-5' size='small' type='primary' onClick={handleClickResetFilter}>
              <ArrowLeftOutlined />
            </Button>
          </div>
        )}
        <Table
          columns={columns}
          dataSource={listaFiltrada.length === 0 ? professors : listaFiltrada}
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
