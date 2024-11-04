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

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isFixedHeader = useIsFixedHeader();

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
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Layout;
