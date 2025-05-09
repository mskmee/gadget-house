import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Header } from '@/components/Header/Header';
import Footer from '@/components/Footer';
import styles from './Layout.module.scss';
import { useState } from 'react';
import { BurgerMenu } from '@/components/BurgerMenu';
import { MenuContext } from '@/context/menuContext.ts';
import { useIsFixedHeader } from '@/hooks/useIsFixedHeader';
import classNames from 'classnames';
import BasketPopup from '@/components/BasketPopup/BasketPopup.tsx';
import { PopUp } from '@/components/PopUp/PopUp.tsx';
import { useTypedSelector } from '@/hooks/useTypedSelector.ts';
import { useActions } from '@/hooks/useActions.ts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isFixedHeader = useIsFixedHeader();
  const { isBasketPopupOpen } = useTypedSelector(
    (state) => state.shopping_card,
  );
  const { closeBasketPopup } = useActions();
  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };
  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleClosePopup = () => {
    closeBasketPopup();
  };

  return (
    <>
      <MenuContext.Provider
        value={{
          isMenuOpen,
          onMenuOpen: handleMenuOpen,
          onMenuClose: handleMenuClose,
        }}
      >
        {!isMenuOpen && <Header />}
        <BurgerMenu />
      </MenuContext.Provider>
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
      <ToastContainer />
    </>
  );
};

export default Layout;
