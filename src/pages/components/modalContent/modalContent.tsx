import { useEffect, useState } from 'react'

import { useAuthStore } from '@src/auth/hooks/useAuthStore/useAuthStore'
import Tags from '@src/common/components/tags/tags'
import { useUpdateUser } from '@src/services/users/hooks/useUpdateUser/useUpdateUser'
import { Form, Input, Select, notification } from 'antd'
import type { NotificationPlacement } from 'antd/es/notification/interface'

import { campusValues, collageValues } from './constants'

import UserInterestLabel from '../userInterestLabel/userInterestLabel'

interface ModalContentProps {
  setButtonDisabled: (value: boolean) => void
  setButtonDisabledTags: (value: boolean) => void
  setLoadingState: (value: boolean) => void
}

interface FormsProps {
  campus: string
  institution: string
  name: string
}

const ModalContent = ({
  setButtonDisabled,
  setButtonDisabledTags,
  setLoadingState
}: ModalContentProps) => {
  const [form] = Form.useForm()
  const institution = Form.useWatch('institution', form)
  const [tags, setTags] = useState([])
  const [campusSelectDisabled, setCampusSelectDisabled] = useState<boolean>(true)
  const [campusOptions, setCampusOptions] = useState<{ value: string; label: string }[]>([])
  const { updateUser } = useUpdateUser()
  const dispatchUser = useAuthStore((state) => state.dispatchUser)
  const [api, contextHolder] = notification.useNotification()

  const openNotificationError = (placement: NotificationPlacement, error: string) => {
    api.error({
      message: `Ops, nao foi possivel salvar as informações adicionais`,
      description: error,
      placement
    })
  }

  const openNotificationSuccess = (placement: NotificationPlacement) => {
    api.success({
      message: `Informações adicionais salvas com sucesso`,
      description: 'Bem vindo ao TCC Connect!',
      placement
    })
  }

  useEffect(() => {
    setLoadingState(updateUser.isLoading)
  }, [setLoadingState, updateUser.isLoading])

  useEffect(() => {
    form.setFieldsValue({ campus: [] })
    setCampusOptions([])
  }, [form, institution, setButtonDisabled])

  const onFinish = (values: FormsProps) => {
    const payload = {
      ...values,
      interests: [...tags],
      firstTime: false
    }

    updateUser.mutate(payload, {
      onSuccess(data) {
        dispatchUser(data)
        openNotificationSuccess('bottomRight')
      },
      onError(error) {
        openNotificationError('bottomRight', error.message)
      }
    })
  }

  useEffect(() => {
    if (tags && tags.length > 0) {
      setButtonDisabledTags(false)
    } else {
      setButtonDisabledTags(true)
    }
  }, [setButtonDisabledTags, tags])

  const onFormsChange = () => {
    const formValues = form.getFieldsValue()
    const hasEmptyFields = Object.values(formValues).some((value) => !value)
    const emptyCampus = !formValues.campus.length

    setButtonDisabled(hasEmptyFields || emptyCampus)

    if (formValues.institution) {
      setCampusSelectDisabled(false)
      setCampusOptions(campusValues[formValues.institution])
    }
  }

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        id='aditional_infos'
        layout='vertical'
        name='basic'
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete='off'
        onFieldsChange={() => onFormsChange()}>
        <Form.Item
          label='Nome completo'
          name='name'
          rules={[{ required: true, message: 'Insira seu nome completo!' }]}>
          <Input placeholder='Insira seu nome completo' />
        </Form.Item>

        <Form.Item label='Faculdade' name='institution' rules={[{ required: true }]}>
          <Select value={null} placeholder='Selecione sua faculdade' options={collageValues} />
        </Form.Item>

        <Form.Item label='Campus' name='campus' rules={[{ required: true }]}>
          <Select
            disabled={campusSelectDisabled}
            placeholder='Selecione seu campus'
            options={campusOptions}
          />
        </Form.Item>

        <UserInterestLabel />
        <Tags tags={tags} setTags={setTags} />
      </Form>
    </>
  )
}

export default ModalContent
