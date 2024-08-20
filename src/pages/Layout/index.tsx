import { Outlet } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Footer from '@/components/footer/footer';

export const Layout = () => {
  return (
    <>
      <Header />
      <main style={{ flexGrow: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
