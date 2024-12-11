import { useState } from 'react';

import { filters } from './consts';
import { smartData } from '../Filters/consts';
import { IProduct, SortOrder } from '@/interfaces/interfaces';
import { FiltersMobile } from './FiltersMobile';
import { SortingMobile } from '../Sort/SortingMobile';

import FiltersSvg from '@/assets/icons/filters.svg';
import FilterRateSvg from '@/assets/icons/filter-rate.svg';

import styles from './filters.module.scss';

export const Filters = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);
  const [, setFilteredProducts] = useState<IProduct[]>([]);
  const [, setSortedProducts] = useState<IProduct[]>([]);

  const toggleDrawer = () => setDrawerVisible((prev) => !prev);
  const toggleSort = () => setSortVisible((prev) => !prev);

  const handleFilter = (products: IProduct[]) => {
    setDrawerVisible(false);
    setFilteredProducts(products);
  };

  const handleSort = (sortOrder: SortOrder) => {
    sortProducts(sortOrder);
  };

  const sortProducts = (option: SortOrder) => {
    const sorted = [...smartData];
    switch (option) {
      case 'Popularity':
        sorted.sort((a, b) => b.popular - a.popular);
        break;
      case 'Rating':
        sorted.sort((a, b) => b.rate - a.rate);
        break;
      case 'From Low to High Cost':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'From High to Low Cost':
        sorted.sort((a, b) => b.price - a.price);
        break;
    }
    setSortedProducts(sorted);
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
