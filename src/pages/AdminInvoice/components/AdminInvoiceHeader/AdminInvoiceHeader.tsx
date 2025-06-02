import { useNavigate } from 'react-router-dom';

import { AppRoute } from '@/enums/enums';
import { LeftArrow } from '@/assets/constants';

import styles from './admin-invoice-header.module.scss';

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
          <img src={LeftArrow} alt="Left Arrow Icon" />
        </button>
        <h2>Order {orderId}</h2>
      </div>
      <span>Date: {createdAt}</span>
    </header>
  );
};
