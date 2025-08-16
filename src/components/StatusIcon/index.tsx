import classNames from 'classnames';
import styles from './styles.module.scss';
import Checkmark from '@/assets/icons/checkmark.svg';
import CheckmarkWhite from '@/assets/icons/checkmark-white.svg';

export const StatusIcon = ({ status }: { status: boolean }) => {
  const isActive = status === true;

  return (
    <div
      className={classNames(styles.orderStatusIcon, {
        [styles.completed]: isActive,
        [styles.pending]: !isActive,
      })}
    >
      <img
        src={isActive ? CheckmarkWhite : Checkmark}
        className={styles.orderStatusIcon__icon}
        alt={isActive ? 'Active icon' : 'Idle icon'}
      />
    </div>
  );
};
