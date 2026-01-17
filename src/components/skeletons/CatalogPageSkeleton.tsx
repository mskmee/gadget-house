import { DEFAULT_SIZE } from '@/constants/pagination';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useMediaQuery } from 'react-responsive';
import styles from './CatalogPageSkeleton.module.scss';
const CatalogPageSkeleton = () => {
  const skeletonCards = Array.from(
    { length: DEFAULT_SIZE },
    (_, index) => index,
  );

  const isMobile767 = useMediaQuery({
    query: '(max-width: 767px)',
  });

  return (
    <div className={styles.skeleton}>
      {isMobile767 ? (
        <div className={styles.skeleton__mobile}>
          <div className={styles.skeleton__mobileList}>
            {skeletonCards.map((_, i) => (
              <div key={i} className={styles.skeleton__item}>
                <Skeleton width="100%" height="100%" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.skeleton__desk}>
          <div className={styles.skeleton__deskList}>
            {skeletonCards.map((_, i) => (
              <div key={i} className={styles.skeleton__item}>
                <Skeleton width="100%" height="100%" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogPageSkeleton;
