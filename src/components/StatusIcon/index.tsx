import classNames from 'classnames';
import styles from './styles.module.scss';
import Checkmark from '@/assets/icons/checkmark.svg';
import CheckmarkWhite from '@/assets/icons/checkmark-white.svg';

export const StatusIcon = ({ status }: { status: string }) => {
  const isCompleted = status === 'COMPLETED';

  return (
    <div
      className={classNames(styles.orderStatusIcon, {
        [styles.completed]: isCompleted,
        [styles.pending]: !isCompleted,
      })}
    >
      <img
        src={isCompleted ? CheckmarkWhite : Checkmark}
        className={styles.orderStatusIcon__icon}
        alt={isCompleted ? 'Completed' : 'Pending'}
      />
    </div>
  );
};
