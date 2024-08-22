import { Outlet } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Footer from '@/components/footer/footer';
import style from './Layout.module.scss';

export const Layout = () => {
  return (
    <>
      <Header />
      <main className={style['main-content']}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
