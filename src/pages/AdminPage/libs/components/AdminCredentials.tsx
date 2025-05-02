import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AppRoute } from '@/enums/Route';
import { AppDispatch } from '@/store';
import { logout } from '@/store/auth/auth-slice';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { User } from '@/pages/Auth/libs/types/user-dto';

import styles from './admin-credentials.module.scss';

import { ExitIcon } from '@/assets/constants';

interface IAdminCredentialsProps {
  user: User;
}

const AdminCredentials: FC<IAdminCredentialsProps> = ({ user }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useTypedSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(AppRoute.ROOT);
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.adminCredentials}>
      <p>{user.fullName}</p>

      <button onClick={onLogout}>
        <img src={ExitIcon} alt="Exit icon" />
        Exit
      </button>
    </div>
  );
};

export { AdminCredentials };
