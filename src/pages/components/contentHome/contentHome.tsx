import teste from '@src/assets/noback.png'
import ScreenSizes from '@src/common/constants/screenSizes'
import { useMediaQuery } from '@src/common/hooks/useMediaQuery'
import clsx from 'clsx'

const ContentHome: React.FC = () => {
  const isMobile = useMediaQuery(`(max-width: ${ScreenSizes.sm})`)

  const descriptionClass = clsx('text-sm text-gray-500 antialiased font-sans', {
    'pb-20': !isMobile,
    'pb-6': isMobile
  })

  const titleClass = clsx('text-3xl font-serif text-gray-700 antialiased', {
    'pb-5': !isMobile,
    'pb-4': isMobile
  })

  return (
    <>
      <h1 className={titleClass}>Bem-vindo ao TCC Connect!</h1>
      <h2 className={descriptionClass}>
        A plataforma que simplifica a escolha de temas e a conexão com orientadores, tornando sua
        jornada acadêmica mais eficaz e descomplicada. Para começar a explorar, dê uma olhada no
        menu para descobrir todas as funcionalidades que criamos especialmente para você!
      </h2>
      <div className='flex justify-center'>
        <img src={teste} alt='test' style={{ height: '40vh' }} />
      </div>
    </>
  )
}

export default ContentHome
