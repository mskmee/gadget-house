import { Pagination } from 'antd';

import styles from '../../styles/admin-page.module.scss';

interface AdminPaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  // eslint-disable-next-line no-unused-vars
  onPageChange: (page: number) => void;
}

export const AdminPagination = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}: AdminPaginationProps) => {
  return (
    <div className="container">
      <Pagination
        showSizeChanger={false}
        showTitle={false}
        current={currentPage}
        total={totalItems}
        pageSize={pageSize}
        onChange={onPageChange}
        className={styles.admin__pagination}
      />
    </div>
  );
};
