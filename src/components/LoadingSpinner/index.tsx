import { FC, React } from 'react';
import styles from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {
  style?: React.CSSProperties;
}

const LoadingSpinner: FC = ({ style }: LoadingSpinnerProps) => {
  return (
    <div style={style} className={styles['spinner-container']}>
      <div className={styles['spinner']}></div>
    </div>
  );
};

export default LoadingSpinner;
