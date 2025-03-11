import React, { useState } from 'react';
import { Checkbox } from 'antd';
import cn from 'classnames';

import { IOption } from '@/interfaces/interfaces';

import ArrowUpSvg from '@/assets/icons/arrow-up.svg';

import styles from './filters.module.scss';

export const Option = ({
  options,
  title,
  filterKey,
  selectedOptions,
  setSelectedOptions = () => {},
}: IOption) => {
  const [showCategory, setShowCategory] = useState(true);
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const toggleShowMoreOptions = () => {
    setShowMoreOptions((prev) => !prev);
  };

  const toggleShowCategory = () => {
    setShowCategory(!showCategory);
  };

  const handleOptionChange = (checkedValues: string[]) => {
    setSelectedOptions((prev: Record<string, string[]> | undefined) => {
      const updatedState = {
        ...(prev ?? {}),
        [filterKey as string]: checkedValues.length ? checkedValues : [],
      };

      return updatedState;
    });
  };

  return (
    <div className={styles.filters__option}>
      <div
        className={cn(
          styles.filters__optionHeader,
          !showCategory && styles.hide,
        )}
        onClick={toggleShowCategory}
      >
        <h4 className={styles.filters__optionName}>{title}</h4>

        <img
          src={ArrowUpSvg}
          alt="Arrow Up Icon"
          className={cn(
            styles.filters__optionArrow,
            !showCategory && styles.arrowDown,
          )}
        />
      </div>

      {showCategory && (
        <>
          <Checkbox.Group
            options={options ?? []}
            value={selectedOptions[filterKey] || []}
            onChange={(values) => handleOptionChange(values as string[])}
            className={cn(
              styles.filters__optionList,
              filterKey === 'memorySlot' ? 'filters__memorySlot' : '',
            )}
            data-label={filterKey}
          >
            {options
              .slice(0, showMoreOptions ? options.length : 5)
              .map((option) => (
                <Checkbox
                  key={option}
                  value={option}
                  className={styles.filters__optionItem}
                  style={
                    {
                      '--color-value': option.toLowerCase(),
                    } as React.CSSProperties
                  }
                >
                  {option}
                </Checkbox>
              ))}
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
