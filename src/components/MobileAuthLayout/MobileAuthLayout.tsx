import { ReactNode } from 'react';
import styles from './MobileAuthLayout.module.scss';

type MobileAuthLayoutProps = {
  children: ReactNode;
};

const MobileAuthLayout = ({ children }: MobileAuthLayoutProps) => {
  return (
    <div className={styles.container}>
      <main>{children}</main>
    </div>
  );
};

export default MobileAuthLayout;
