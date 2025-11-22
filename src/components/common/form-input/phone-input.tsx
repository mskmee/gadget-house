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
  const [isFocused, setIsFocused] = useState(false);

  function formatPhoneNumber(value: string) {
    const numbers = value.replace(/\D/g, '');

    if (numbers.length === 0) return '';

    let formatted = `(${numbers.slice(0, 3)}`;
    if (numbers.length >= 4) formatted += `)-${numbers.slice(3, 6)}`;
    if (numbers.length >= 7) formatted += `-${numbers.slice(6, 8)}`;
    if (numbers.length >= 9) formatted += `-${numbers.slice(8, 10)}`;
    return formatted;
  }

  const normalizePhoneNumber = (value: string) =>
    value.replace(/\D/g, '').slice(0, 10);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = normalizePhoneNumber(event.target.value);
    field.onChange({ target: { name: field.name, value: rawValue } });
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    const syntheticEvent = {
      ...event,
      target: {
        ...event.target,
        name: field.name,
        value: field.value,
      },
    };
    field.onBlur(syntheticEvent as any);
  };

  const displayValue = isFocused
    ? field.value || ''
    : formatPhoneNumber(field.value || '');

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
        name={field.name}
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        inputMode="numeric"
        placeholder={isFocused ? '__________' : '(___)-___-__-__'}
      />
    </div>
  );
};
