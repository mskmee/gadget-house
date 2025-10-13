import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Header } from '@/components/Header/Header';
import Footer from '@/components/Footer';
import styles from './Layout.module.scss';

import { useIsFixedHeader } from '@/hooks/useIsFixedHeader';
import classNames from 'classnames';
import BasketPopup from '@/components/BasketPopup/BasketPopup.tsx';
import { PopUp } from '@/components/PopUp/PopUp.tsx';
import { useTypedSelector } from '@/hooks/useTypedSelector.ts';
import { useActions } from '@/hooks/useActions.ts';

import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';

const Layout = () => {
  const isFixedHeader = useIsFixedHeader();
  const { isBasketPopupOpen } = useTypedSelector(
    (state) => state.shopping_card,
  );
  const { closeBasketPopup } = useActions();

  //if modal open - block scroll body
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
      <PopUp
        isOpened={isBasketPopupOpen}
        onClose={handleClosePopup}
        classname="basket-modal"
      >
        <BasketPopup />
      </PopUp>
      <Footer />
      <ScrollRestoration />
    </>
  );
};

export default Layout;
