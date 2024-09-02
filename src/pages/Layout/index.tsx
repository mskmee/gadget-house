import { Outlet } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Footer from '@/components/footer/footer';
import style from './Layout.module.scss';
import { useState } from 'react';
import BurgerMenu from '@/components/BurgerMenu/BurgerMenu.tsx';
import { MenuContext } from '@/context/menuContext.ts';

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

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

      <main className={style['main-content']}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
