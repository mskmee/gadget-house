import { useState } from 'react';
import { Popover } from 'antd';

import { smartData } from '../Filters/consts';
import { IProduct, SortOrder } from '@/interfaces/interfaces';
import { sorting } from './SortingMobile';
import { SortOption } from './SortOption';

import SortSvg from '@/assets/icons/sorting.svg';

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
        </button>
      </Popover>
    </div>
  );
};
