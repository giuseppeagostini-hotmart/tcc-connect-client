import { useState } from 'react'

import { useAuthStore } from '@src/auth/hooks/useAuthStore/useAuthStore'
import { Modal } from 'antd'

import ContentHome from './contentHome/contentHome'
import ModalContent from './modalContent/modalContent'

const App: React.FC = () => {
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)
  const [buttonDisabledTags, setButtonDisabledTags] = useState<boolean>(true)
  const [loadingState, setLoadingState] = useState<boolean>(false)

  const firstTime = useAuthStore((state) => state.user?.firstTime)

  return (
    <>
      <ContentHome />
      <Modal
        title={
          <p className='font-sans text-base font-light text-gray-700 mt-0 mb-8'>
            Insira algumas informações adicionais para poder continuar
          </p>
        }
        open={firstTime}
        closable={false}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{
          loading: loadingState,
          form: 'aditional_infos',
          htmlType: 'submit',
          disabled: buttonDisabled || buttonDisabledTags
        }}>
        <ModalContent
          setButtonDisabled={setButtonDisabled}
          setButtonDisabledTags={setButtonDisabledTags}
          setLoadingState={setLoadingState}
        />
      </Modal>
    </>
  )
}

export default App
