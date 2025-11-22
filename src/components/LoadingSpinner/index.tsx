import { FC } from 'react';
import style from './LoadingSpinner.module.scss';

const LoadingSpinner: FC = () => {
  return (
    <div className={style['spinner-container']}>
      <div className={style['spinner']}></div>
    </div>
  );
};

export default LoadingSpinner;