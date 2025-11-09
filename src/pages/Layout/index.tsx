import { Outlet, ScrollRestoration } from 'react-router-dom';
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
import { useSelector } from 'react-redux';
import { selectIsGlobalLoading } from '@/store/ui/ui_slice';

const Layout = () => {
  const isFixedHeader = useIsFixedHeader();
  const { isBasketPopupOpen } = useTypedSelector(
    (state) => state.shopping_card,
  );
  const { closeBasketPopup } = useActions();
  const isGlobalLoading = useSelector(selectIsGlobalLoading);

  useBodyScrollLock(isBasketPopupOpen);
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
