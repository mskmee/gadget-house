import { Outlet } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';
import style from './Layout.module.scss';

const Layout = () => {
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

export default Layout;
