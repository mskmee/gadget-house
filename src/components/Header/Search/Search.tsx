import React, { useState } from 'react';
import styles from './search.module.scss';
import { Input } from 'antd';
import SearchIcon from './SearchIcon';
import DOMPurify from 'dompurify';
import { StatusSearch } from '@/types/StatusSearch';
import { SearchFieldProps } from '@/interfaces/interfaces';

function SearchField({ status, onHover }: SearchFieldProps) {
  const [searchValue, setSeachValue] = useState('');
  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedSearchValue = DOMPurify.sanitize(e.target.value);
    setSeachValue(sanitizedSearchValue);
  };

  const getStatusProps = (status: StatusSearch) => {
    switch (status) {
      case 'Active':
      case 'Hover':
        return {
          style: { borderColor: '#fff' },
          suffix: (
            <SearchIcon
              width={'24px'}
              height={'24px'}
              color={'#6a0dad'}
              style={{ cursor: 'pointer' }}
            />
          ),
        };
      case 'Disable':
        return {
          suffix: (
            <SearchIcon
              width={'24px'}
              height={'24px'}
              color="#A5A5A5"
              style={{ cursor: 'not-allowed' }}
            />
          ),
        };
      default:
        return {};
    }
  };
  return (
    <div
      className={styles.headerBottomSearch}
      onMouseEnter={() => onHover('Hover')}
      onMouseLeave={() =>
        onHover((prev) => (prev === 'Active' ? 'Active' : 'Disable'))
      }
    >
      <Input
        name="header_search"
        onFocus={() => onHover('Active')}
        onBlur={() => onHover('Disable')}
        placeholder={status === 'Active' ? undefined : 'Searching...'}
        {...getStatusProps(status)}
        value={searchValue}
        className={styles.headerBottomSearchInput}
        onChange={handleSearchValueChange}
        size="large"
        required
      />
    </div>
  );
}

export default function Search() {
  const [status, setStatus] = useState<StatusSearch>('Disable');

  return (
    <>
      <SearchField status={status} onHover={setStatus} />
    </>
  );
}
