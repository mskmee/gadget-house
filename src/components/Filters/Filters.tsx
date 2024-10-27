import { useState } from 'react';

import { filters, smartData } from './consts';
import { FiltersMobile } from './FiltersMobile';

import FiltersSvg from '@/assets/icons/filters.svg';
import FilterRateSvg from '@/assets/icons/filter-rate.svg';

import styles from './filters.module.scss';

export default function Filters() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<object[]>([]);
  console.log('filteredProducts: ', filteredProducts);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const handleFilter = (
    options: Record<string, string[]>,
    priceRange: number[],
    minCameraMP: number,
    maxCameraMP: number,
  ) => {
    const filtered = smartData.filter((product: any) => {
      let isMatch = true;

      // Фильтр по диапазону цен
      if (priceRange.length === 2) {
        const [minPrice, maxPrice] = priceRange;
        isMatch = product.price >= minPrice && product.price <= maxPrice;
      }

      // Фильтр по мегапикселям камеры
      if (minCameraMP !== undefined && maxCameraMP !== undefined) {
        isMatch =
          isMatch &&
          product.cameraMP >= minCameraMP &&
          product.cameraMP <= maxCameraMP;
      }

      // Фильтр по выбранным опциям
      if (Object.keys(options).length > 0) {
        Object.keys(options).forEach((optionKey) => {
          if (options[optionKey].length > 0) {
            options[optionKey].includes(product[optionKey]);
          }
        });
      }

      return isMatch;
    });
    setFilteredProducts(filtered);
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
