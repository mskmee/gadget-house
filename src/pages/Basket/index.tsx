import styles from './Basket.module.scss';
import { useNavigate } from 'react-router-dom';
import { LeftArrow } from '@/assets/constants';
import BasketItem from '@/components/BasketItem/BasketItem.tsx';
import { useTypedSelector } from '@/hooks/useTypedSelector.ts';
import { CustomBreadcrumbs } from '@/components/SingleProduct/CustomBreadcrumbs.tsx';
import { convertPriceToReadable } from '@/utils/helpers/product';
import { useState } from 'react';
import { SuccessPopUp } from './libs/components/components';
import { useActions } from '@/hooks/useActions';
import { SliderNav } from '@/components/SliderNav/SliderNav.tsx';
import Carousels from '@/components/Carousel/Carousel.tsx';
import Benefits from '@/components/benefitsList/benefits.tsx';

export const BasketPage = () => {
  const [isPopUpOpened, setIsPopUpOpened] = useState(false);
  const navigate = useNavigate();
  const { clearCart } = useActions();

  const { products, cardTotalAmount, currency, locale } = useTypedSelector(
    (state) => state.shopping_card,
  );

  const onPopUpClose = () => setIsPopUpOpened(false);
  const handleOrderConfirm = () => {
    setIsPopUpOpened(true);
    clearCart();
  };

  return (
    <>
      <div className={styles.container}>
        <SuccessPopUp isOpened={isPopUpOpened} onClose={onPopUpClose} />
        <CustomBreadcrumbs />
        <button className={styles.buttonBack} onClick={() => navigate(-1)}>
          <img src={LeftArrow} alt="Right Arrow" />
          Back
        </button>

        {products.length === 0 ? (
          <p>Your basket is empty</p>
        ) : (
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
                Discount <span></span>
              </p>
              <h3>
                In total{' '}
                <span>
                  {convertPriceToReadable(cardTotalAmount, currency, locale)}
                </span>
              </h3>
              <button onClick={handleOrderConfirm}>Place the order</button>
            </div>
          </section>
        )}
      </div>

      <SliderNav
        text="Recommendations for you"
        link="/smartphones"
        isVisibleSeeMoreBtn={false}
      />
      <Carousels classname="smartphone-carousel"/>
      <Benefits />
    </>
  );
};
