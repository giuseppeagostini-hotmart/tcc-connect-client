type LoginHeaderProps = {
  description: string
}

const LoginHeader = ({ description }: LoginHeaderProps) => {
  return (
    <>
      <h1 className='font-serif text-gray-700 text-center text-4xl mb-14 mt-2'>TCC Connect</h1>
      <h2 className='text-gray-500 text-center text-2xl font-sans mb-12 font-light'>
        {description}
      </h2>
    </>
  )
}

export default LoginHeader
