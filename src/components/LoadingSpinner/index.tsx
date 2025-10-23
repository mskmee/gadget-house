import { CSSProperties } from 'react';
import styles from './LoadingSpinner.module.scss';

const LoadingSpinner = ({ style = {} }: { style?: CSSProperties }) => {
  return (
    <div className={styles.spinnerContainer} style={{ ...style }}>
      <div className={styles.spinner} />
    </div>
  );
};

export default LoadingSpinner;
