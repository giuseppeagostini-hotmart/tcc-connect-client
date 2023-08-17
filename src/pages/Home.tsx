/* eslint-disable no-console */
import useLogout from '@src/auth/hooks/useLogout/useLogout'
import { Button } from 'antd'

function Home() {
  const { mutate: logoutMutate } = useLogout()

  const handleClick = () => {
    logoutMutate(
      {},
      {
        onSuccess() {
          window.location.reload()
        },
        onError() {
          console.log('deu erro')
        }
      }
    )
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
