import { useState } from 'react';
import { Popover } from 'antd';
import cn from 'classnames';

import { smartData } from '../Filters/consts';
import { IProduct, SortOrder } from '@/interfaces/interfaces';
import { sorting } from './SortingMobile';
import { SortOption } from './SortOption';

import SortSvg from '@/assets/icons/sorting.svg';
import ArrowUpSvg from '@/assets/icons/arrow-up.svg';

import styles from './sort.module.scss';

export const SortingDesk = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<SortOrder>(
    SortOrder.Popularity,
  );
  const [, setSortedProducts] = useState<IProduct[]>([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSortSelection = (sortOrder: SortOrder) => {
    setSelectedSort(sortOrder);
    sortProducts(sortOrder);
    setIsModalOpen(false);
  };

  const content = (
    <div className={styles.sort__radioGroup}>
      {sorting.map((option) => (
        <SortOption
          key={option.value}
          label={option.label}
          value={option.value}
          isSelected={selectedSort === option.value}
          onSelect={handleSortSelection}
          classNames={styles.sortDesk__radio}
        />
      ))}
    </div>
  );

  const sortProducts = (option: SortOrder) => {
    const sorted = [...smartData];
    switch (option) {
      case 'By popularity':
        sorted.sort((a, b) => b.popular - a.popular);
        break;
      case 'By rating':
        sorted.sort((a, b) => b.rate - a.rate);
        break;
      case 'From low to high cost':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'From high to low cost':
        sorted.sort((a, b) => b.price - a.price);
        break;
    }
    setSortedProducts(sorted);
  };

  return (
    <div className={styles.sortDesk}>
      <Popover
        title=""
        trigger="click"
        open={isModalOpen}
        placement="bottomRight"
        className={styles.sortDesk__sortPopover}
        content={content}
      >
        <button onClick={showModal} className={styles.sortDesk__button}>
          <img src={SortSvg} alt="Icon sorting" />
          Sort: {selectedSort}
          <img
            src={ArrowUpSvg}
            alt="Arrow Up Icon"
            className={cn(
              styles.sortDesk__arrow,
              !isModalOpen && styles.arrowDown,
            )}
          />
        </button>
      </Popover>
    </div>
  );
};
