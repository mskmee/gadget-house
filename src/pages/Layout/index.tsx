import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header/Header';
import Footer from '@/components/Footer';
import styles from './Layout.module.scss';
import { useState } from 'react';
import { BurgerMenu } from '@/components/BurgerMenu';
import { MenuContext } from '@/context/menuContext.ts';
import { ScrollToTop } from '@/utils/scrollToTop';
import { useIsFixedHeader } from '@/hooks/useIsFixedHeader';
import classNames from 'classnames';
import BasketPopup from '@/components/BasketPopup/BasketPopup.tsx';
import { BasketPopupContext } from '@/context/basketPopupContext.tsx';
import { PopUp } from '@/components/PopUp/PopUp.tsx';

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBasketPopupOpen, setIsBasketPopupOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(0);
  const isFixedHeader = useIsFixedHeader();

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };
  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };
  const openBasketPopup = (id) => {
    setIsBasketPopupOpen(true);
    setSelectedProductId(id);
  };
  const closeBasketPopup = () => {
    setIsBasketPopupOpen(false);
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
      <BasketPopupContext.Provider
        value={{
          isBasketPopupOpen,
          openBasketPopup,
          closeBasketPopup,
          selectedProductId,
        }}
      >
        <main
          className={classNames(styles['main-content'], {
            [styles.isFixedHeader]: isFixedHeader,
          })}
        >
          <Outlet />
        </main>
        <PopUp
          isOpened={isBasketPopupOpen}
          onClose={closeBasketPopup}
          classname="basket-modal"
        >
          <BasketPopup />
        </PopUp>
      </BasketPopupContext.Provider>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Layout;
