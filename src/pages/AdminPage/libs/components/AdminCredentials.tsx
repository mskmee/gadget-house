import { FC } from 'react';

import { User } from '@/pages/Auth/libs/types/user-dto';
import { logout } from '@/store/auth/auth-slice';
import {
  LocalStorageKey,
  localStorageService,
} from '@/utils/packages/local-storage';

import styles from './admin-credentials.module.scss';

import { ExitIcon } from '@/assets/constants';

interface IAdminCredentialsProps {
  user: User;
}

const AdminCredentials: FC<IAdminCredentialsProps> = ({ user }) => {
  const onLogout = () => {
    localStorageService.removeItem(LocalStorageKey.ACCESS_TOKEN);
    localStorageService.removeItem(LocalStorageKey.REFRESH_TOKEN);
    logout();
  };

  return (
    <div className={styles.adminCredentials}>
      <p>{user.email}</p>

      <button onClick={onLogout}>
        <img src={ExitIcon} alt="Exit icon" />
        Exit
      </button>
    </div>
  );
};

export { AdminCredentials };
