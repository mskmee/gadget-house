import React from 'react';

import { ISortOptionProps } from '@/interfaces/interfaces';

import styles from './sort.module.scss';

export const SortOption: React.FC<ISortOptionProps> = ({
  name,
  value,
  isSelected,
  onSelect,
  classNames,
}) => (
  <button
    type="button"
    className={`${classNames} ${isSelected ? styles.sort__active : ''}`}
    onClick={() => onSelect(value)}
  >
    {isSelected && (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.sort__checkIcon}
      >
        <path
          d="M6.66675 16.6667L12.8894 22.6667L25.3334 10.6667"
          stroke="#00820D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}

    {name}
  </button>
);
