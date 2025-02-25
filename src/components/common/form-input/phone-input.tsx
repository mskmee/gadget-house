import React, { useState } from 'react';
import { Input } from 'antd';
import { FieldInputProps } from 'formik';

import { FlagUA } from '@/assets/constants';

import styles from './form-input.module.scss';

type Props = {
  field: FieldInputProps<any>;
  id: string;
};

export const PhoneInput = ({ field, id, ...props }: Props) => {
  const [phone, setPhone] = useState(field.value || '');

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 10);
    const formatted =
      numbers.length > 2
        ? `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 8)}-${numbers.slice(8, 10)}`
        : numbers;
    return formatted;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(event.target.value);
    setPhone(formatted);
    field.onChange({ target: { name: field.name, value: formatted } });
  };

  return (
    <div className={styles.phoneInput}>
      <div className={styles.phoneInput__prefix}>
        <span className={styles.phoneInput__flag}>
          <FlagUA />
        </span>
        <span className={styles.phoneInput__code}>+38</span>
      </div>
      <Input
        {...props}
        id={id}
        value={phone}
        onChange={handleChange}
        placeholder="(___)-___-__-__"
      />
    </div>
  );
};
