import styles from './Basket.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { LeftArrow } from '@/assets/constants';
import BasketItem from '@/components/BasketItem/BasketItem.tsx';
import { useTypedSelector } from '@/hooks/useTypedSelector.ts';
import { CustomBreadcrumbs } from '@/components/SingleProduct/CustomBreadcrumbs.tsx';
import { convertPriceToReadable } from '@/utils/helpers/product';
import { useEffect, useState } from 'react';
import { SuccessPopUp } from './libs/components/components';
import { SliderNav } from '@/components/SliderNav/SliderNav.tsx';
import Carousels from '@/components/Carousel/Carousel.tsx';
import Benefits from '@/components/benefitsList/benefits.tsx';

export const BasketPage = () => {
  const [isPopUpOpened, setIsPopUpOpened] = useState(false);
  const navigate = useNavigate();

  const { products, cardTotalAmount, currency, locale } = useTypedSelector(
    (state) => state.shopping_card,
  );
  const productsLength = products.reduce((acc, item) => acc + item.quantity, 0);

  const isMobile = innerWidth < 768;

  const onPopUpClose = () => setIsPopUpOpened(false);

  useEffect(() => {
    if (!productsLength) {
      navigate('/');
    }
  }, [productsLength]);

  return (
    <>
      <div className={styles.container}>
        <SuccessPopUp isOpened={isPopUpOpened} onClose={onPopUpClose} />
        <CustomBreadcrumbs />
        <button className={styles.buttonBack} onClick={() => navigate(-1)}>
          <img src={LeftArrow} alt="Right Arrow" />
          Back
        </button>

        <section className={styles.content}>
          <ul className={styles.productList}>
            {products.map((product) => (
              <BasketItem product={product} key={product.id} />
            ))}
          </ul>
          <div className={styles.info}>
            <p>
              Sum{' '}
              <span>
                {convertPriceToReadable(cardTotalAmount, currency, locale)}
              </span>
            </p>
            <p>
              Discount{' '}
              <span> {convertPriceToReadable(0, currency, locale)}</span>
            </p>
            <h3>
              In total{' '}
              <span>
                {convertPriceToReadable(cardTotalAmount, currency, locale)}
              </span>
            </h3>
            <div className={styles.orderBtnWrap}>
              <Link to="/order">Place the order</Link>
            </div>
          </div>
        </section>
      </div>

      <SliderNav
        text={isMobile ? 'Recommendations' : 'Recommendations for you'}
        link="/smartphones"
        isVisibleSeeMoreBtn={isMobile}
      />
      <Carousels classname="smartphone-carousel" />
      <Benefits />
    </>
  );
};
