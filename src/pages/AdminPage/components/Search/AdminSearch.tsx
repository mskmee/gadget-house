import React, { FC, useEffect, useState } from 'react';
import { SearchIcon } from '@/assets/icons/SearchIcon';
import styles from './admin-search.module.scss';

interface IAdminSearchProps {
  // eslint-disable-next-line no-unused-vars
  onSearch: (query: string) => void;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  debounceDelay?: number;
  className?: string;
}

const AdminSearch: FC<IAdminSearchProps> = ({
  onSearch,
  placeholder = 'Search...',
  defaultValue = '',
  value: controlledValue,
  disabled = false,
  error = false,
  errorMessage,
  debounceDelay = 300,
  className,
}) => {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = isControlled ? controlledValue : internalValue;

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(value);
    }, debounceDelay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, debounceDelay, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
  };

  const inputClassName = `${styles.adminSearch__input} ${
    error ? styles['adminSearch__input--error'] : ''
  }`.trim();

  const containerClassName = `${styles.adminSearch} ${className || ''}`.trim();

  return (
    <div className={containerClassName}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClassName}
        aria-invalid={error}
        aria-describedby={error && errorMessage ? 'search-error' : undefined}
      />
      <button
        className={styles.adminSearch__button}
        disabled={disabled}
        tabIndex={-1}
        aria-hidden="true"
      >
        <SearchIcon />
      </button>
    </div>
  );
};

export { AdminSearch };
