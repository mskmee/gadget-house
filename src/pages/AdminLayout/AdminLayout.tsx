import { Outlet, ScrollRestoration } from 'react-router-dom';
import { AdminHeader } from '@/components/AdminHeader/AdminHeader';
import Footer from '@/components/Footer';
import styles from '../Layout/Layout.module.scss';

import { useIsFixedHeader } from '@/hooks/useIsFixedHeader';
import classNames from 'classnames';

const AdminLayout = () => {
  const isFixedHeader = useIsFixedHeader();

  return (
    <>
      <AdminHeader />
      <main
        className={classNames(styles['main-content'], {
          [styles.isFixedHeader]: isFixedHeader,
        })}
      >
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  );
};

export default AdminLayout;
