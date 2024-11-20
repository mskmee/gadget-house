import { FiltersDesk } from '@/components/Filters/FiltersDesk';
import { Filters } from '@/components/Filters/Filters';
import { useMediaQuery } from 'react-responsive';

import styles from './smartphones.module.scss';
import { Catalog } from '@/components/Catalog/Catalog';

export default function Smartphones() {
  const isMobile = useMediaQuery({ query: '(max-width: 1070px)' });

  return (
    <div className={styles.smartpnones}>
      <div className={`container ${styles.smartpnones__container}`}>
        <h2 className={styles.smartpnones__title}>Smartphones</h2>

        <div className={styles.smartpnones__content}>
          {isMobile ? <Filters /> : <FiltersDesk />}

          <Catalog />
        </div>
      </div>
    </div>
  );
}
