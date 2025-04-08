import React, { useEffect, useState } from 'react';

import { SearchIcon } from '@/assets/icons/SearchIcon';

import styles from './admin-search.module.scss';

interface AdminSearchProps {
  // eslint-disable-next-line no-unused-vars
  onSearch: (query: string) => void;
  placeholder?: string;
  onButtonClick?: () => void;
  debounceDelay?: number;
}

const AdminSearch = ({
  onSearch,
  placeholder = 'Search...',
  onButtonClick,
  debounceDelay = 300,
}: AdminSearchProps) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceDelay);

    return () => {
      clearTimeout(handler);
    };
  }, [query, debounceDelay]);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleSearchClick = () => {
    onSearch(query);
    if (onButtonClick) {
      onButtonClick();
    }
  };

  return (
    <div className={styles.adminSearch}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className={styles.adminSearch__input}
      />
      <button
        className={styles.adminSearch__button}
        onClick={handleSearchClick}
      >
        <SearchIcon />
      </button>
    </div>
  );
};

export default AdminSearch;
