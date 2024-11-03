import { useState } from 'react';

import { filters } from './consts';
import { IProduct } from '@/interfaces/interfaces';
import { FiltersMobile } from './FiltersMobile';

import FiltersSvg from '@/assets/icons/filters.svg';
import FilterRateSvg from '@/assets/icons/filter-rate.svg';

import styles from './filters.module.scss';

export const Filters = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [, setSortVisible] = useState(false);
  const [, setFilteredProducts] = useState<IProduct[]>([]);

  const toggleDrawer = () => setDrawerVisible((prev) => !prev);
  const toggleSort = () => setSortVisible((prev) => !prev);

  const handleFilter = (products: IProduct[]) => {
    setDrawerVisible(false);
    setFilteredProducts(products);
  };

  return (
    <div className={styles.filtersMobile}>
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
        onClick={toggleSort}
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
  );
};
