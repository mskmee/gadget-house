import { CSSProperties } from 'react';

const LoadingSpinner = ({ style = {} }: { style?: CSSProperties }) => {
  return (
    <div className={styles.spinnerContainer} style={{ ...style }}>
      <div className={styles.spinner} />
    </div>
  );
};

export default LoadingSpinner;
