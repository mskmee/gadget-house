import { ExitIcon } from '@/assets/icons';
import styles from '../NavButton/navbutton.module.scss';
import { NavButton } from '../NavButton/NavButton';
import { useActions } from '@/hooks/useActions';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '@/enums/Route';

export function LogoutButton() {
  const { logout } = useActions();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(AppRoute.ROOT);
  };

  return (
    <NavButton className={styles.navbutton} onClick={handleLogout}>
      <ExitIcon />
      <span>Exit</span>
    </NavButton>
  );
}
