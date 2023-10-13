import { Badge, Card } from 'antd'

interface CardInvitesProps {
  name: string
}

const CardInvites = ({ name }: CardInvitesProps) => {
  return (
    <Badge.Ribbon text='Pendente' color='rgb(234 179 8)'>
      <Card title={name} size='small'>
        Aguarde o professor avaliar seu convite!
      </Card>
    </Badge.Ribbon>
  )
}

export default CardInvites
