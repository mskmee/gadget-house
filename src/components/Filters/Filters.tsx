import { useState } from 'react';

import { filters } from './consts';
import { FiltersMobile } from './FiltersMobile';

import FiltersSvg from '@/assets/icons/filters.svg';
import FilterRateSvg from '@/assets/icons/filter-rate.svg';

import styles from './filters.module.scss';

export default function Filters() {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const handleFilter = (
    options: Record<string, string[]>,
    priceRange: number[],
    minCameraMP: number,
    maxCameraMP: number,
  ) => {
    console.log('Selected Options:', options);
    console.log('Selected Price Range:', priceRange);
    console.log('minCameraMP: ', minCameraMP);
    console.log('maxCameraMP: ', maxCameraMP);
  };

  return (
    <div className={styles.filtersMobile}>
      <div className={styles.filtersMobile__container}>
        <button
          type="button"
          onClick={toggleDrawer}
          className={styles.filtersMobile__btn}
        >
          <span className={styles.filtersMobile__btnIcon}>
            <img src={FiltersSvg} alt="Icon Filters" />
          </span>
          <span className={styles.filtersMobile__btnText}>Filters</span>
        </button>

        <button
          type="button"
          onClick={toggleDrawer}
          className={styles.filtersMobile__btn}
        >
          <span className={styles.filtersMobile__btnIcon}>
            <img src={FilterRateSvg} alt="Icon Filters Rate" />
          </span>
        </button>

        <FiltersMobile
          filters={filters}
          drawerVisible={drawerVisible}
          onFilter={handleFilter}
          toggleDrawer={toggleDrawer}
        />
      </div>
    </div>
  );
}
