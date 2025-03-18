import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { filters } from './consts';
import { AppDispatch } from '@/store';
import { setSelectedSort } from '@/store/filters/filters_slice';
import { FiltersMobile } from './FiltersMobile';
import { SortingMobile } from '../Sort/SortingMobile';

import FiltersSvg from '@/assets/icons/filters.svg';
import FilterRateSvg from '@/assets/icons/filter-rate.svg';

import styles from './filters.module.scss';

export const Filters = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const toggleDrawer = () => setDrawerVisible((prev) => !prev);
  const toggleSort = () => setSortVisible((prev) => !prev);

  const handleFilter = () => {
    setDrawerVisible(false);
  };

  const handleSort = (value: string) => {
    dispatch(setSelectedSort(value));
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

      <SortingMobile
        sortVisible={sortVisible}
        toggleSort={toggleSort}
        onSort={handleSort}
      />
    </div>
  );
};
