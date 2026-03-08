import React, { useState } from 'react';
import { Checkbox } from 'antd';
import cn from 'classnames';
import { IOption } from '@/interfaces/interfaces';
import ArrowUpSvg from '@/assets/icons/arrow-up.svg';
import styles from './filters.module.scss';

type OptionType =
  | string
  | {
      id: number;
      name: string;
    };

export const Option = ({
  options,
  title,
  filterKey,
  selectedOptions,
  onOptionChange,
}: IOption) => {
  const [showCategory, setShowCategory] = useState(true);
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const toggleShowMoreOptions = () => {
    setShowMoreOptions((prev) => !prev);
  };

  const toggleShowCategory = () => {
    setShowCategory(!showCategory);
  };

  const handleHeaderKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleShowCategory();
    }
  };

  return (
    <div className={styles.filters__option}>
      <div
        className={cn(
          styles.filters__optionHeader,
          !showCategory && styles.hide,
        )}
        onClick={toggleShowCategory}
        onKeyDown={handleHeaderKeyDown}
        role="button"
        tabIndex={0}
      >
        <h4 className={styles.filters__optionName}>{title}</h4>

        <img
          src={ArrowUpSvg}
          alt="Toggle"
          className={cn(
            styles.filters__optionArrow,
            !showCategory && styles.arrowDown,
          )}
        />
      </div>

      {showCategory && (
        <>
          <Checkbox.Group
            value={selectedOptions[filterKey] || []}
            onChange={(values) =>
              onOptionChange(filterKey, values as string[] | number[])
            }
            className={styles.filters__optionList}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(options as OptionType[])
                .slice(0, showMoreOptions ? options.length : 5)
                .map((option) => {
                  const value = typeof option === 'object' ? option.id : option;

                  const label =
                    typeof option === 'object' ? option.name : option;

                  return (
                    <Checkbox
                      key={`${value}-checkbox`}
                      value={value}
                      className={styles.filters__optionItem}
                    >
                      {label}
                    </Checkbox>
                  );
                })}
            </div>
          </Checkbox.Group>

          {options.length > 5 && (
            <button
              className={cn(
                styles.filters__btnMore,
                showMoreOptions && styles.active,
              )}
              type="button"
              onClick={toggleShowMoreOptions}
            >
              {showMoreOptions ? 'Show less' : 'Show more'}
            </button>
          )}
        </>
      )}
    </div>
  );
};
