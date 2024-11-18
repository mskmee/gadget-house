import { FiltersDesk } from '@/components/Filters/FiltersDesk';
import { Filters } from '@/components/Filters/Filters';
import { SortingDesk } from '@/components/Sort/SortingDesk';

import styles from './smartphones.module.scss';

export default function Smartphones() {
  return (
    <div className={styles.smartpnones}>
      <div className={styles.smartpnones_mobile}>
        <div className={`container ${styles.smartpnones__container}`}>
          <div className={styles.smartpnones__wrapper}>
            <h2 className={styles.smartpnones__title}>Smartphone</h2>
          </div>

          <Filters />
        </div>
      </div>

      <div className={styles.smartpnones_desk}>
        <div className={styles.smartpnones__header}>
          <div className={`container ${styles.smartpnones__container}`}>
            <div className={styles.smartpnones__wrapper}>
              <h2 className={styles.smartpnones__title}>Smartphone</h2>
              <SortingDesk />
            </div>

            <FiltersDesk />
          </div>
        </div>
      </div>
    </div>
  );
}
