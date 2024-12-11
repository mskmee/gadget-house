import { useState } from 'react';
import { Drawer } from 'antd';
import { DrawerStyles } from 'antd/es/drawer/DrawerPanel';

import { ISortProps, SortOrder } from '@/interfaces/interfaces';
import { SortOption } from './SortOption';

import BtnCloseSvg from '@/assets/icons/btn-close-sort.svg';

import styles from './sort.module.scss';

export const sorting = [
  { label: 'By popularity', value: SortOrder.Popularity },
  { label: 'By rating', value: SortOrder.Rating },
  { label: 'From low to high cost', value: SortOrder.LowToHigh },
  { label: 'From high to low cost', value: SortOrder.HighToLow },
];

export const SortingMobile = ({
  sortVisible,
  toggleSort,
  onSort,
}: ISortProps) => {
  const [selectedSort, setSelectedSort] = useState<SortOrder>(
    SortOrder.Popularity,
  );

  const handleSortSelection = (sortOrder: SortOrder) => {
    setSelectedSort(sortOrder);
    toggleSort();
    onSort(selectedSort);
  };

  const drawerStyles: DrawerStyles = {
    mask: {
      background: 'rgba(28, 24, 23, 0.3)',
    },
    body: {
      background: '#fff',
      overflowY: 'auto',
      border: '1px solid var(--background)',
      borderRadius: '18px',
      padding: '24px 25px',
      width: '358px',
    },
    header: {
      height: '60px',
      background: 'transparent',
    },
  };

  return (
    <>
      <Drawer
        title=""
        placement="bottom"
        onClose={toggleSort}
        open={sortVisible}
        height={325}
        className={styles.sort__sortDrawer}
        styles={drawerStyles}
      >
        <button onClick={toggleSort} className={styles.sort__buttonClose}>
          <img src={BtnCloseSvg} className="btn-close" alt="Close Sort Icon" />
        </button>

        <div className={styles.sort__radioGroup}>
          {sorting.map((option) => (
            <SortOption
              key={option.value}
              label={option.label}
              value={option.value}
              isSelected={selectedSort === option.value}
              onSelect={handleSortSelection}
              classNames={styles.sort__radioButton}
            />
          ))}
        </div>
      </Drawer>
    </>
  );
};
