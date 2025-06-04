import { FC } from 'react';
import styles from './auth-loader.module.scss';

interface LoaderProps {
  size?: number;
  color?: string;
}

export const AuthLoader: FC<LoaderProps> = ({
  size = 24,
  color = 'var(--theme-color)',
}) => {
  return (
    <div className={styles.loader}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className={styles.loader__circle}
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke={color}
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};
