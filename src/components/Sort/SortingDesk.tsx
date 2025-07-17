import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Popover } from 'antd';
import cn from 'classnames';

import { Sort } from '@/enums/enums';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { AppDispatch, RootState } from '@/store';
import { setSelectedSort } from '@/store/filters/filters_slice';
import { SortOption } from './SortOption';

import SortSvg from '@/assets/icons/sorting.svg';
import ArrowUpSvg from '@/assets/icons/arrow-up.svg';

import styles from './sort.module.scss';
import { setPageNumber } from '@/store/products/products_slice';

export const SortingDesk = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { selectedSort } = useTypedSelector(
    (state: RootState) => state.filters,
  );
  const selectedSortName = Object.values(Sort).find(
    (s) => s.value === selectedSort,
  )?.name;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSortSelection = (value: string) => {
    dispatch(setSelectedSort(value));
    dispatch(setPageNumber(0));
    setIsModalOpen(false);
  };

  const content = (
    <div className={styles.sort__radioGroup}>
      {Object.values(Sort).map((option) => (
        <SortOption
          key={option.value}
          name={option.name}
          value={option.value}
          isSelected={selectedSort === option.value}
          onSelect={handleSortSelection}
          classNames={styles.sortDesk__radio}
        />
      ))}
    </div>
  );

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
          Sort: {selectedSortName}
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
