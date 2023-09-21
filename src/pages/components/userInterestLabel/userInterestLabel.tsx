import { InfoCircleOutlined } from '@ant-design/icons'
import TooltipAntd from '@src/common/components/tooltip/tooltip'

const UserInterestLabel: React.FC = () => {
  return (
    <div className='flex justify-items-center items-center mb-3'>
      <div className='flex'>
        <p className='my-0 mr-1 text-red-400'>*</p>
        <p className='my-0 mr-2'>Área de interesse</p>
      </div>
      <TooltipAntd tooltipText='Neste campo, você pode inserir uma ou mais áreas de interesse, tais como frontend, backend, IoT e muito mais...'>
        <InfoCircleOutlined />
      </TooltipAntd>
    </div>
  )
}

export default UserInterestLabel
