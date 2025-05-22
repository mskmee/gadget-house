import classNames from 'classnames';
import styles from './styles.module.scss';
import Checkmark from '@/assets/icons/checkmark.svg';
import CheckmarkWhite from '@/assets/icons/checkmark-white.svg';

export const StatusIcon = ({ status }: { status: string }) => {
  return (
    <div className={styles.orderStatusIcon}>
      {status === 'COMPLETED' ? (
        <img
          src={CheckmarkWhite}
          className={classNames(styles.orderStatusIcon__icon, styles.completed)}
          alt="Completed"
        />
      ) : (
        <img
          src={Checkmark}
          className={classNames(styles.orderStatusIcon__icon, styles.pending)}
          alt="Pending"
        />
      )}
    </div>
  );
};
