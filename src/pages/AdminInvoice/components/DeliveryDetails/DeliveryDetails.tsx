import cn from 'classnames';
import { Input, Form } from 'antd';
import React from 'react';

import styles from '../../admin-invoice.module.scss';
import { IOrderItemAddress } from '@/utils/packages/orders/libs/types/order-item-response-dto';
import { formatKeyToLabel } from '@/utils/helpers/formatKeyToLabel';
import { OrderDto } from '@/utils/packages/orders/libs/types/order-item';
import { formatTitle } from '@/utils/helpers/formatTitle';
import { UkrainianFlagIcon } from '@/assets/icons';

interface DeliveryDetailsProps {
  fullName?: string;
  phoneNumber?: string;
  address?: IOrderItemAddress;
  comment?: string;
  delivery?: string;
  // eslint-disable-next-line no-unused-vars
  onFieldChange: (field: keyof OrderDto, value: any) => void;
}

export const DeliveryDetails = ({
  fullName,
  phoneNumber,
  address,
  comment,
  delivery,
  onFieldChange,
}: DeliveryDetailsProps) => {
  const handleAddressChange = (key: string, value: string) => {
    onFieldChange('address', {
      ...address,
      [key]: value,
    });
  };

  const formatPhoneForDisplay = (phone: string): string => {
    if (!phone) return '';

    const cleanPhone = phone.replace('+38', '');
    const digits = cleanPhone.replace(/\D/g, '');

    if (digits.length === 0) return '';
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)})-${digits.slice(3)}`;
    if (digits.length <= 8)
      return `(${digits.slice(0, 3)})-${digits.slice(3, 6)}-${digits.slice(6)}`;

    return `(${digits.slice(0, 3)})-${digits.slice(3, 6)}-${digits.slice(6, 8)}-${digits.slice(8, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const digits = input.replace(/\D/g, '');

    const limitedDigits = digits.slice(0, 10);

    onFieldChange('phoneNumber', limitedDigits ? `+38${limitedDigits}` : '');
  };

  const displayPhone = formatPhoneForDisplay(phoneNumber || '');

  return (
    <section
      className={cn(
        styles.adminInvoice__delivery,
        styles.adminInvoice__wrapper,
        styles.adminInvoice__container,
      )}
    >
      <div className={styles.adminInvoice__deliveryHeader}>
        <h3 className={styles.adminInvoice__header}>
          Delivery details{' '}
          <span
            className={styles.adminInvoice__deliveryMethod}
          >{`(by ${delivery?.toLowerCase()})`}</span>
        </h3>
      </div>

      <Form layout="vertical">
        <Form.Item
          label="Full name"
          className={styles.adminInvoice__deliveryInput}
        >
          <Input
            value={fullName || ''}
            name="fullName"
            onChange={(e) => onFieldChange('fullName', e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Phone number"
          className={styles.adminInvoice__deliveryInput}
        >
          <div className={styles.adminInvoice__phoneWrapper}>
            <div className={styles.adminInvoice__phonePrefix}>
              <div className={styles.adminInvoice__phoneFlag}>
                <UkrainianFlagIcon />
              </div>
              <span className={styles.adminInvoice__phoneCode}>+38</span>
            </div>
            <Input
              value={displayPhone}
              onChange={handlePhoneChange}
              name="phoneNumber"
              placeholder="(063)-333-33-33"
              maxLength={15}
              className={styles.adminInvoice__phoneInput}
            />
          </div>
        </Form.Item>

        {address &&
          Object.entries(address)
            .filter(([key]) => key !== 'addressLine')
            .map(([key, value]) => (
              <Form.Item
                key={key}
                label={formatTitle(formatKeyToLabel(key))}
                className={styles.adminInvoice__deliveryInput}
              >
                <Input
                  value={value || ''}
                  name={key}
                  onChange={(e) => handleAddressChange(key, e.target.value)}
                />
              </Form.Item>
            ))}
      </Form>

      <div className={styles.adminInvoice__comment}>
        {comment ? (
          <>
            <h4 className={styles.adminInvoice__commentTitle}>Comment</h4>
            <p className={styles.adminInvoice__commentText}>{comment}</p>
          </>
        ) : null}
      </div>
    </section>
  );
};
