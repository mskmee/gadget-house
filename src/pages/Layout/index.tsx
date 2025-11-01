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
import { useDispatch, useSelector } from 'react-redux';
import { DataStatus } from '@/enums/data-status';
import { AppRoute } from '@/enums/Route';
import {
  selectIsGlobalLoading,
  startGlobalLoading,
  stopGlobalLoading,
} from '@/store/ui/ui_slice';

const Layout = () => {
  const isFixedHeader = useIsFixedHeader();
  const { isBasketPopupOpen } = useTypedSelector(
    (state) => state.shopping_card,
  );
  const { closeBasketPopup } = useActions();
  const isGlobalLoading = useSelector(selectIsGlobalLoading);

  const productsDataStatus = useTypedSelector(
    (state) => state.products.dataStatus,
  );
  const dispatch = useDispatch();

  useBodyScrollLock(isBasketPopupOpen);
  const location = useLocation();
  const pathRef = useRef(location.pathname);

  useEffect(() => {
    const authRoutes = [
      AppRoute.SIGN_IN,
      AppRoute.SIGN_UP,
      AppRoute.AUTH_FORGOT_PASSWORD,
      AppRoute.AUTH_CHANGE_PASSWORD,
      AppRoute.LOGIN_ADMIN,
    ];

    const isAuthPage = authRoutes.some((route) =>
      location.pathname.startsWith(route),
    );

    if (!isAuthPage && location.pathname !== pathRef.current) {
      dispatch(startGlobalLoading());
    }

    pathRef.current = location.pathname;
  }, [location.pathname, dispatch]);

  useEffect(() => {
    if (
      productsDataStatus === DataStatus.FULFILLED ||
      productsDataStatus === DataStatus.REJECT
    ) {
      dispatch(stopGlobalLoading());
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
