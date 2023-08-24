/* eslint-disable no-console */
import { useAuth } from '@src/app/hooks/useAuth/useAuth'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

function Home() {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleClick = () => {
    signOut()
    navigate('login')
  }

  return (
    <>
      <div>
        <p className='text-blue-900'>Giuseppe</p>
      </div>
      <div>
        <p>Matheus</p>
      </div>
      <Button onClick={handleClick}>Logout</Button>
    </>
  )
}

export default Home
