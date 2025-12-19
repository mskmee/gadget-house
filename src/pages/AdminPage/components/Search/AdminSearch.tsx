import React, { FC, useEffect, useState } from 'react';
import { SearchIcon } from '@/assets/icons/SearchIcon';
import { CancelCrossIcon } from '@/assets/icons';
import styles from './admin-search.module.scss';

interface Suggestion {
  title: string;
  category: string;
  productId: string;
  image?: string;
}

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

  selectedItem?: Suggestion | null;
  onClearSelection?: () => void;
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
  selectedItem,
  onClearSelection,
}) => {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = isControlled ? controlledValue : internalValue;

  useEffect(() => {
    if (selectedItem) return;

    const handler = setTimeout(() => {
      onSearch(value);
    }, debounceDelay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, debounceDelay, onSearch, selectedItem]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
  };

  const containerClassName = `${styles.adminSearch} ${className || ''} ${
    selectedItem ? styles['adminSearch--selected'] : ''
  }`.trim();

  return (
    <div className={containerClassName}>
      {selectedItem && (
        <div className={styles.selectedChip}>
          {selectedItem.image && (
            <img
              src={selectedItem.image}
              alt="product"
              className={styles.selectedChipImage}
            />
          )}
          <span className={styles.selectedChipText}>
            {selectedItem.title}, code:
            {selectedItem.category.replace('Code: ', '')}
          </span>
          <button
            type="button"
            onClick={onClearSelection}
            className={styles.clearChipButton}
            aria-label="Remove selected item"
          >
            <CancelCrossIcon style={{ width: '24px' }} />
          </button>
        </div>
      )}

      <input
        type="text"
        value={selectedItem ? '' : value}
        onChange={handleChange}
        placeholder={selectedItem ? '' : placeholder}
        disabled={disabled || !!selectedItem}
        className={`${styles.adminSearch__input} ${
          error ? styles['adminSearch__input--error'] : ''
        }`.trim()}
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
