import Image from 'next/image'

const WrapperCard = ({ icon, title, children }) => {
  return (
    <section className='wrapper-dinamic-card'>
      <div className='wrapper-dinamic-card__title'>
        {icon && (
          <div className='wrapper-dinamic-card__title-icon'>
            <div><Image src={icon} alt='Icono principal de la card' layout='responsive' /></div>
          </div>
        )}
        {title && (
          <h2>{title}</h2>
        )}
      </div>
      {children}
    </section>
  )
}

export default WrapperCard
