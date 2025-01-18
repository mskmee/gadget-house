import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header/Header';
import Footer from '@/components/Footer';
import styles from './Layout.module.scss';
import { useState } from 'react';
import { BurgerMenu } from '@/components/BurgerMenu';
import { MenuContext } from '@/context/menuContext.ts';
import { useIsFixedHeader } from '@/hooks/useIsFixedHeader';
import classNames from 'classnames';
import { ScrollToTop } from '@/utils/scrollToTop';
import BasketPopup from '@/components/BasketPopup/BasketPopup.tsx';
import { PopUp } from '@/components/PopUp/PopUp.tsx';
import { useTypedSelector } from '@/hooks/useTypedSelector.ts';
import { useActions } from '@/hooks/useActions.ts';

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
        onClose={closeBasketPopup}
        classname="basket-modal"
      >
        <BasketPopup />
      </PopUp>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Layout;
