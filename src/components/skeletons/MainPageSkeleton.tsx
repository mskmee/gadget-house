import Skeleton from 'react-loading-skeleton'; // Import Skeleton
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './Skeletons.module.scss';

export const MainPageSkeleton = () => {
  return (
    <div className={styles['main-page-container']}>
      <div className={styles['section-container']}>
        <Skeleton height={40} width="25%" />
        <div className={styles['default-carousel-container']}>
          <Skeleton width={305} height={480} />
          <Skeleton width={305} height={480} />
          <Skeleton width={305} height={480} />
          <Skeleton width={305} height={480} />
        </div>
        <div className={styles['arrow-container']}>
          <Skeleton height={40} width="7%" />
        </div>
      </div>
      <div className={styles['section-container']}>
        <div className={styles['brands-carousel-container']}>
          <Skeleton width={245} height={245} />
          <Skeleton width={245} height={245} />
          <Skeleton width={245} height={245} />
          <Skeleton width={245} height={245} />
          <Skeleton width={245} height={245} />
        </div>
        <div className={styles['arrow-container']}>
          <Skeleton height={40} width="7%" />
        </div>
      </div>
      <div className={styles['section-container']}>
        <Skeleton height={40} width="20%" />
        <div className={styles['default-carousel-container']}>
          <Skeleton width={305} height={480} />
          <Skeleton width={305} height={480} />
          <Skeleton width={305} height={480} />
          <Skeleton width={305} height={480} />
        </div>
        <div className={styles['arrow-container']}>
          <Skeleton height={40} width="7%" />
        </div>
      </div>
      <div className={styles['section-container']}>
        <Skeleton height={40} width="35%" />
        <div className={styles['default-carousel-container']}>
          <Skeleton width={305} height={480} />
          <Skeleton width={305} height={480} />
          <Skeleton width={305} height={480} />
          <Skeleton width={305} height={480} />
        </div>
        <div className={styles['arrow-container']}>
          <Skeleton height={40} width="7%" />
        </div>
      </div>
    </div>
  );
};
