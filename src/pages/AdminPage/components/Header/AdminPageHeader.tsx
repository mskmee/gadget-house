// components/AdminPage/AdminPageHeader.tsx
import { useCallback, useState } from 'react';

import { IProductCard } from '@/interfaces/interfaces';
import { AddNewUser } from '@/assets/constants';

import styles from '../../styles/admin-page.module.scss';
import { AdminSearch } from '../Search/AdminSearch';
import { ChangeStatus } from '../StatusChange/ChangeStatus';
import { Filters } from '../Filters/Filters';
import { AddNewAdminModal } from '../Modals/AddNewAdmin';

interface AdminPageHeaderProps {
  productsData?: IProductCard[];
  checkedItems: string[];
  // eslint-disable-next-line no-unused-vars
  onSearch: (filteredProducts: IProductCard[]) => void;
}

export const AdminPageHeader = ({
  productsData,
  checkedItems,
  onSearch,
}: AdminPageHeaderProps) => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  const handleSearch = useCallback(
    (query: string) => {
      const normalized = query.trim().toLowerCase();

      const filteredProducts = productsData?.filter(
        (product) =>
          product.name?.toLowerCase().includes(normalized) ||
          product.code?.toLowerCase().includes(normalized),
      );

      onSearch(filteredProducts || []);
    },
    [productsData, onSearch],
  );

  const handleModalToggle = useCallback(() => {
    setAuthModalOpen((prev) => !prev);
  }, []);

  const handleModalClose = useCallback(() => {
    setAuthModalOpen(false);
  }, []);

  return (
    <>
      <header className={styles.admin__header}>
        <h2 className={styles.admin__title}>Invoice</h2>

        <div className={styles.admin__search}>
          <AdminSearch placeholder="Searching..." onSearch={handleSearch} />
        </div>

        <div className={styles.admin__buttons}>
          <button
            className={styles.admin__buttonsAdd}
            onClick={handleModalToggle}
          >
            <img src={AddNewUser} alt="Add user icon" />
          </button>

          <ChangeStatus checkedItems={checkedItems} />

          <Filters />
        </div>
      </header>

      <AddNewAdminModal isOpen={isAuthModalOpen} onClose={handleModalClose} />
    </>
  );
};
