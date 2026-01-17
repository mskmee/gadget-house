import styles from './Basket.module.scss';
import { useNavigate } from 'react-router-dom';
import { LeftArrow } from '@/assets/constants';
import BasketItem from '@/components/BasketItem/BasketItem.tsx';
import { useTypedSelector } from '@/hooks/useTypedSelector.ts';
import { convertPriceToReadable } from '@/utils/helpers/product';
import { useEffect, useState } from 'react';
import { SuccessPopUp } from './libs/components/components';
import { SliderNav } from '@/components/SliderNav/SliderNav.tsx';
import Carousels from '@/components/Carousel/Carousel.tsx';
import Benefits from '@/components/benefitsList/benefits.tsx';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
<<<<<<< Updated upstream
import { getAllProducts } from '@/store/products/actions';
import { useAuthRequired } from '@/hooks/useAuthRequired';
import { DataStatus } from '@/enums/data-status';
=======
>>>>>>> Stashed changes
import {
  DEFAULT_PAGE,
  DEFAULT_SIZE_ALL,
  DEFAULT_SIZE_MOBILE,
} from '@/constants/pagination';

export const BasketPage = () => {
  const [isPopUpOpened, setIsPopUpOpened] = useState(false);
  const [isRedirectPending, setIsRedirectPending] = useState(() => {
    return sessionStorage.getItem('pendingOrderRedirect') === 'true';
  });
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { triggerAuthRequired } = useAuthRequired();

  const { products, cardTotalAmount, currency, locale } = useTypedSelector(
    (state) => state.shopping_card,
  );

  const { productsData, loaded: productsLoaded } = useTypedSelector(
    (state) => state.products,
  );

  const { user, userToken, dataStatus } = useTypedSelector(
    (state) => state.auth,
  );
  const isLoading = dataStatus === DataStatus.PENDING;
  const isAuthorized = Boolean(user || userToken);
  const productsLength = products.reduce((acc, item) => acc + item.quantity, 0);
<<<<<<< Updated upstream
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
=======
>>>>>>> Stashed changes

  const onPopUpClose = () => setIsPopUpOpened(false);

  useEffect(() => {
<<<<<<< Updated upstream
    if (isAuthorized && isRedirectPending) {
      const timer = setTimeout(() => {
        sessionStorage.removeItem('pendingOrderRedirect');
        setIsRedirectPending(false);
        navigate('/order');
      }, 1500);
      return () => clearTimeout(timer);
    }
    if (isAuthorized && !isRedirectPending) {
      sessionStorage.removeItem('pendingOrderRedirect');
    }
  }, [isAuthorized, isRedirectPending, navigate]);

  const handleCheckoutClick = () => {
    if (isLoading) return;

    if (!isAuthorized) {
      sessionStorage.setItem('pendingOrderRedirect', 'true');
      setIsRedirectPending(true);
      triggerAuthRequired('order');
    } else {
      navigate('/order');
    }
  };

  useEffect(() => {
    if (!productsLoaded || !productsData) {
      const size = isMobile ? DEFAULT_SIZE_MOBILE : DEFAULT_SIZE_ALL;
      dispatch(getAllProducts({ page: DEFAULT_PAGE, size }));
    }
  }, [dispatch, productsLoaded, productsData, isMobile]);

  useEffect(() => {
=======
>>>>>>> Stashed changes
    if (!productsLength) {
      navigate('/');
    }
  }, [productsLength, navigate]);

  return (
    <>
      <div className={styles.container}>
        <SuccessPopUp isOpened={isPopUpOpened} onClose={onPopUpClose} />

        <button className={styles.buttonBack} onClick={() => navigate(-1)}>
          <img src={LeftArrow} alt="Right Arrow" />
          Basket
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
              <button
                onClick={handleCheckoutClick}
                className={styles.checkoutButton}
              >
                Place the order
              </button>
            </div>
          </div>
        </section>
      </div>

      <SliderNav
        text={isMobile ? 'Recommendations' : 'Recommendations for you'}
        link="/smartphones"
        // isVisibleSeeMoreBtn={isMobile}
      />
      <Carousels classname="smartphone-carousel" />
      <Benefits />
    </>
  );
};
