import { Drawer } from 'antd';
import { DrawerStyles } from 'antd/es/drawer/DrawerPanel';

import { Sort } from '@/enums/enums';
import { RootState } from '@/store';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { ISortProps } from '@/interfaces/interfaces';
import { SortOption } from './SortOption';

import BtnCloseSvg from '@/assets/icons/btn-close-sort.svg';

import styles from './sort.module.scss';

export const SortingMobile = ({
  sortVisible,
  toggleSort,
  onSort,
}: ISortProps) => {
  const { selectedSort } = useTypedSelector(
    (state: RootState) => state.filters,
  );

  const handleSortSelection = (value: string) => {
    toggleSort();
    onSort(value);
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
          {Object.values(Sort).map((option) => (
            <SortOption
              key={option.value}
              name={option.name}
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
