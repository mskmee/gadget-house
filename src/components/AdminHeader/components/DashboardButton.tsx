import { useTypedSelector } from '@/hooks/useTypedSelector';
import { NavButton } from '../NavButton/NavButton';
import styles from '../NavButton/navbutton.module.scss';

export function DashboardButton() {
  const user = useTypedSelector((state) => state.auth.user);
  const refreshToken = localStorage.getItem('refresh_token');

  if (!refreshToken || !user?.id) {
    return null;
  }

  return (
    <NavButton className={styles.navbutton} href={`/dashboard/${user.id}`}>
      <span>{user?.fullName || 'Dashboard'}</span>
    </NavButton>
  );
}
