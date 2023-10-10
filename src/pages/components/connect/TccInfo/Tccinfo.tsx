import { useEffect, useState } from 'react'

import Tags from '@src/common/components/tags/tags'
import { Alert, Form, Input, Spin, notification } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import type { NotificationPlacement } from 'antd/es/notification/interface'

import AlertDescription from './AlertDescription/AlertDescription'
import { AlertTccInfoDescription, ButtonText } from './constants'
import useGetTccInfoIA from './hooks/useGetTccInfoIA/useGetTccInfoIA'

import PalavraChaveLabel from '../PalavraChaveLabel/PalavraChaveLabel'

interface TccInfoProps {
  setButtonDisabled: (prop: boolean) => void
  setButtonDisabledByTag: (prop: boolean) => void
}

const TccInfo = ({ setButtonDisabled, setButtonDisabledByTag }: TccInfoProps) => {
  const [form] = Form.useForm()
  const [tags, setTags] = useState([] as string[])
  const { mutate: mutateGetTccInfoIa, isLoading } = useGetTccInfoIA()
  const [api, contextHolder] = notification.useNotification()

  const openNotificationError = (placement: NotificationPlacement) => {
    api.error({
      message: `Ops, não foi sugerir um tema por agora`,
      description: 'Tente novamente mais tarde',
      placement
    })
  }

  const handleClickButton = () => {
    mutateGetTccInfoIa(
      {},
      {
        onSuccess() {},
        onError() {
          openNotificationError('bottomRight')
        }
      }
    )
  }

  useEffect(() => {
    setButtonDisabledByTag(Boolean(!tags.length))
  }, [tags, setButtonDisabledByTag])

  const onFormsChange = () => {
    const formValues = form.getFieldsValue()
    const hasEmptyFields = Object.values(formValues).some((value) => !value)

    setButtonDisabled(hasEmptyFields)
  }

  return (
    <>
      {contextHolder}
      <div className='p-4'>
        <Spin spinning={isLoading}>
          <p className='mt-0 mb-6 text-base text-start'>
            Insira os detalhes do seu TCC para compartilhar com seu professor quando se conectar:
          </p>
          <Form
            id='tcc_info'
            form={form}
            layout='vertical'
            name='basic_tcc_info'
            autoComplete='off'
            onFieldsChange={() => onFormsChange()}>
            <Form.Item
              label='Titulo'
              name='title'
              rules={[{ required: true, message: 'Insira o titulo do seu TCC!' }]}>
              <Input placeholder='Insira o titulo do seu TCC' />
            </Form.Item>

            <Form.Item
              label='Descrição'
              name='description'
              rules={[{ required: true, message: 'Insira uma breve descrição do seu projeto!' }]}>
              <TextArea
                rows={3}
                maxLength={2000}
                placeholder='Insira uma breve descrição do seu projeto'
              />
            </Form.Item>

            <PalavraChaveLabel />
            <div className='w-full text-start'>
              <Tags tags={tags} setTags={setTags} />
            </div>
          </Form>

          <Alert
            className='w-full text-start mt-8'
            description={
              <AlertDescription
                handleClickButton={handleClickButton}
                description={AlertTccInfoDescription}
                buttonText={ButtonText}
              />
            }
            type='info'
            showIcon
          />
        </Spin>
      </div>
    </>
  )
}

export default TccInfo
