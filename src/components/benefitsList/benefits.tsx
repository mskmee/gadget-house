import './benefits.scss'
import { image1, image2, image3, image4 } from '../../assets/benefits/images'

const Benefits = () => {
  return (
    <section className='benefits-wrapper'>
      <div className="benefits-card">
        <div className='benefit-image'>
          <img src={image1} alt="Returns and exchanges" />
        </div>
        <p className="benefit-text">
          Returns and exchanges
        </p>
      </div>

      <div className="benefits-card">
        <div className='benefit-image'>
          <img src={image2} alt="Bonuses for purchases" />
        </div>
        <p className="benefit-text">
          Bonuses for purchases
        </p>
      </div>

      <div className="benefits-card">
        <div className='benefit-image'>
          <img src={image3} alt="Certified products" />
        </div>
        <p className="benefit-text">
          Certified products
        </p>
      </div>

      <div className="benefits-card">
        <div className='benefit-image'>
          <img src={image4} alt="Free shipping" />
        </div>
        <p className="benefit-text">
          Free shipping
        </p>
      </div>      
    </section>
  )
}

export default Benefits
