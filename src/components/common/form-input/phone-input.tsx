import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { FieldInputProps } from 'formik';

import { FlagUA } from '@/assets/constants';

import styles from './form-input.module.scss';

type Props = {
  field: FieldInputProps<any>;
  id: string;
};

export const PhoneInput = ({ field, id, ...props }: Props) => {
  const [phone, setPhone] = useState(() => {
    return field.value ? formatPhoneNumber(field.value) : '';
  });

  useEffect(() => {
    if (field.value) setPhone(formatPhoneNumber(field.value));
    else setPhone('');
  }, [field.value]);

  function formatPhoneNumber(value: string) {
    const numbers = value.replace(/\D/g, '');

    if (numbers.length > 0) {
      let formatted = `(${numbers.slice(0, 3)}`;
      if (numbers.length >= 4) formatted += `)-${numbers.slice(3, 6)}`;
      if (numbers.length >= 7) formatted += `-${numbers.slice(6, 8)}`;
      if (numbers.length >= 9) formatted += `-${numbers.slice(8, 10)}`;
      return formatted;
    }

    return numbers;
  }

  const normalizePhoneNumber = (value: string) =>
    value.replace(/\D/g, '').slice(0, 10);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = normalizePhoneNumber(event.target.value);
    const formatted = formatPhoneNumber(rawValue);
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
        inputMode="numeric"
        placeholder="(___)-___-__-__"
      />
    </div>
  );
};
