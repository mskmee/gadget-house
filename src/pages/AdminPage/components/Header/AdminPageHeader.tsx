import { useCallback, useState } from 'react';
import { AddNewUserIcon } from '@/assets/icons';

import styles from '../../styles/admin-page.module.scss';
import { AdminSearch } from '../Search/AdminSearch';
import { ChangeStatus } from '../StatusChange/ChangeStatus';
import { Filters } from '../Filters/Filters';
import { AddNewAdminModal } from '../Modals/AddNewAdmin';
import { OrderFilterParams, usePatchOrderMutation } from '@/store/orders/api';

interface AdminPageHeaderProps {
  checkedItems: string[];
  // eslint-disable-next-line no-unused-vars
  onSearch: (search: string) => void;
  // eslint-disable-next-line no-unused-vars
  handleApplyFilter: (filters: OrderFilterParams) => void;
  // eslint-disable-next-line no-unused-vars
  patchOrder: ReturnType<typeof usePatchOrderMutation>[0];
  onClearSelection: () => void;
}
type ActivePopover = 'status' | 'filters' | null;

export const AdminPageHeader = ({
  checkedItems,
  onSearch,
  handleApplyFilter,
  patchOrder,
  onClearSelection,
}: AdminPageHeaderProps) => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [activePopover, setActivePopover] = useState<ActivePopover>(null);

  const togglePopover = useCallback(
    (popover: ActivePopover) => {
      if (activePopover === popover) {
        setActivePopover(null);
      } else {
        setActivePopover(popover);
      }
    },
    [activePopover],
  );

  const handleStatusToggle = () => togglePopover('status');
  const handleFiltersToggle = () => togglePopover('filters');

  const handleModalToggle = useCallback(() => {
    setActivePopover(null);
    setAuthModalOpen((prev) => !prev);
  }, []);

  const handleModalClose = useCallback(() => {
    setAuthModalOpen(false);
  }, []);

  return (
    <>
      <header className={styles.admin__header}>
        <div className={styles.admin__title__container}>
          <h2 className={styles.admin__title}>Invoice</h2>
        </div>

        <div className={styles.admin__search}>
          <AdminSearch placeholder="Searching..." onSearch={onSearch} />
        </div>

        <div className={styles.admin__buttons}>
          <button
            className={styles.admin__buttonsAdd}
            onClick={handleModalToggle}
          >
            <AddNewUserIcon />
          </button>

          <ChangeStatus
            patchOrder={patchOrder}
            checkedItems={checkedItems}
            isOpen={activePopover === 'status'}
            onToggle={handleStatusToggle}
            onClose={() => setActivePopover(null)}
            onStatusChanged={onClearSelection}
          />

          <Filters
            handleApplyFilter={handleApplyFilter}
            isOpen={activePopover === 'filters'}
            onToggle={handleFiltersToggle}
            onClose={() => setActivePopover(null)}
          />
        </div>
      </header>

      <AddNewAdminModal isOpen={isAuthModalOpen} onClose={handleModalClose} />
    </>
  );
};
