import { Button } from 'antd'

interface AlertDescriptionProps {
  handleClickButton: () => void
  description: string
  buttonText: string
}

const AlertDescription = ({
  handleClickButton,
  description,
  buttonText
}: AlertDescriptionProps) => {
  return (
    <div>
      <p className='mt-0'>{description}</p>
      <Button size='small' type='primary' onClick={handleClickButton}>
        {buttonText}
      </Button>
    </div>
  )
}

export default AlertDescription
