import { useState } from 'react'

import { Button, Form, Steps, theme } from 'antd'

import SearchProfessor from './SearchProfessor/SearchProfessor'
import Success from './Success/Success'
import TccInfo from './TccInfo/Tccinfo'

const steps = [
  {
    title: 'Dados Iniciais do TCC'
  },
  {
    title: 'Buscar Orientador'
  },
  {
    title: 'Concluido'
  }
]

const Connect: React.FC = () => {
  const { token } = theme.useToken()
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)
  const [buttonDisabledByTag, setButtonDisabledByTag] = useState<boolean>(true)
  const [buttonDisabledByLoading, setButtonDisabledByLoading] = useState<boolean>(true)
  const [tags, setTags] = useState([] as string[])
  const [form] = Form.useForm()

  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  const components: { [key: number]: JSX.Element } = {
    0: (
      <TccInfo
        setButtonDisabled={setButtonDisabled}
        setButtonDisabledByTag={setButtonDisabledByTag}
        setButtonDisabledByLoading={setButtonDisabledByLoading}
        form={form}
        setTags={setTags}
        tags={tags}
      />
    ),
    1: <SearchProfessor nextFunction={next} tags={tags} />,
    2: <Success />
  }

  const items = steps.map((item) => ({ key: item.title, title: item.title }))

  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16
  }

  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{components[current]}</div>
      <div style={{ marginTop: 24 }}>
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Voltar
          </Button>
        )}
        {current === 0 && (
          <Button
            disabled={buttonDisabled || buttonDisabledByTag || buttonDisabledByLoading}
            type='primary'
            onClick={() => next()}>
            Próximo
          </Button>
        )}
      </div>
    </>
  )
}

export default Connect
