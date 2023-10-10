import React from 'react'

import { InfoCircleOutlined } from '@ant-design/icons'
import TooltipAntd from '@src/common/components/tooltip/tooltip'

const PalavraChaveLabel: React.FC = () => {
  return (
    <div className='flex justify-items-center items-center mb-3'>
      <div className='flex'>
        <p className='my-0 mr-1 text-red-400'>*</p>
        <p className='my-0 mr-2'>Palavras Chave</p>
      </div>
      <TooltipAntd tooltipText='Neste campo, você pode inserir uma ou mais palavras chaves que representam seu projeto'>
        <InfoCircleOutlined />
      </TooltipAntd>
    </div>
  )
}

export default PalavraChaveLabel
