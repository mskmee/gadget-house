import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { Header } from '@/components/Header/Header';
import Footer from '@/components/Footer';
import styles from './Layout.module.scss';
import Loader from '@/components/Loader/Loader';
import { useIsFixedHeader } from '@/hooks/useIsFixedHeader';
import classNames from 'classnames';
import BasketPopup from '@/components/BasketPopup/BasketPopup';
import { PopUp } from '@/components/PopUp/PopUp';
import { useTypedSelector } from '@/hooks/useTypedSelector.ts';
import { useActions } from '@/hooks/useActions.ts';
import AuthPortals from '@/pages/Auth/AuthPortals/AuthPortals';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setGlobalLoading } from '@/store/ui/ui_slice';
import { DataStatus } from '@/enums/data-status';

const Layout = () => {
  const isFixedHeader = useIsFixedHeader();
  const { isBasketPopupOpen } = useTypedSelector(
    (state) => state.shopping_card,
  );
  const { closeBasketPopup } = useActions();
  const isGlobalLoading = useTypedSelector((state) => state.ui.isGlobalLoading);
  const productsDataStatus = useTypedSelector(
    (state) => state.products.dataStatus,
  );
  const dispatch = useDispatch();

  useBodyScrollLock(isBasketPopupOpen);
  const location = useLocation();
  const pathRef = useRef(location.pathname);
  useEffect(() => {
    if (location.pathname !== pathRef.current) {
      dispatch(setGlobalLoading(true));
      pathRef.current = location.pathname;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (
      productsDataStatus === DataStatus.FULFILLED ||
      productsDataStatus === DataStatus.REJECT
    ) {
      dispatch(setGlobalLoading(false));
    }
  }, [productsDataStatus, dispatch]);
  const handleClosePopup = () => {
    closeBasketPopup();
  };

  return (
    <>
      <Header />
      <main
        className={classNames(styles['main-content'], {
          [styles.isFixedHeader]: isFixedHeader,
        })}
      >
        <Outlet />
      </main>
      <Loader isVisible={isGlobalLoading} />
      <PopUp
        isOpened={isBasketPopupOpen}
        onClose={handleClosePopup}
        classname="basket-modal"
      >
        <BasketPopup />
      </PopUp>
      <Footer />
      <AuthPortals />
      <ScrollRestoration />
    </>
  );
};

export default Layout;
