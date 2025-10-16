import { useCallback, useState } from 'react';

import { AddNewUser } from '@/assets/constants';

import styles from '../../styles/admin-page.module.scss';
import { AdminSearch } from '../Search/AdminSearch';
import { ChangeStatus } from '../StatusChange/ChangeStatus';
import { Filters } from '../Filters/Filters';
import { AddNewAdminModal } from '../Modals/AddNewAdmin';
import { OrderFilterParams } from '@/store/orders/api';

interface AdminPageHeaderProps {
  checkedItems: string[];
  // eslint-disable-next-line no-unused-vars
  onSearch: (search: string) => void;
  // eslint-disable-next-line no-unused-vars
  handleApplyFilter: (filters: OrderFilterParams) => void;
}

export const AdminPageHeader = ({
  checkedItems,
  onSearch,
  handleApplyFilter,
}: AdminPageHeaderProps) => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  const handleModalToggle = useCallback(() => {
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
            <img src={AddNewUser} alt="Add user icon" />
          </button>

          <ChangeStatus checkedItems={checkedItems} />

          <Filters handleApplyFilter={handleApplyFilter} />
        </div>
      </header>

      <AddNewAdminModal isOpen={isAuthModalOpen} onClose={handleModalClose} />
    </>
  );
};
