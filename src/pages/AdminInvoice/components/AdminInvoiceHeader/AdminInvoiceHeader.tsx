import { useNavigate } from 'react-router-dom';

import { AppRoute } from '@/enums/enums';
import { LeftArrow } from '@/assets/icons';
import styles from './admin-invoice-header.module.scss';
import { formatDateToDDMMYYYY } from '@/utils/helpers/format-date';

interface AdminInvoiceHeaderProps {
  orderId?: string;
  createdAt?: string;
}

export const AdminInvoiceHeader = ({
  orderId,
  createdAt,
}: AdminInvoiceHeaderProps) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (window.history.length > 1) {
      return navigate(-1);
    }
    navigate(AppRoute.ROOT);
  };

  return (
    <header className={styles.adminInvoice__header}>
      <div className={styles.adminInvoice__header_title}>
        <button type="button" onClick={handleBackClick}>
          <LeftArrow style={{ width: '12px', height: '24px' }} />
        </button>
        <h2>Order {orderId}</h2>
      </div>
      <span>Date: {formatDateToDDMMYYYY(createdAt || '')}</span>
    </header>
  );
};
