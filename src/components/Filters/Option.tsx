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

  const handleOptionChange = (checkedValues: string[]) => {
    onOptionChange(filterKey, checkedValues);
  };

  const handleHeaderKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleShowCategory();
    }
  };

  const handleMoreButtonKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleShowMoreOptions();
    }
  };

  const handleCheckboxKeyDown = (
    e: React.KeyboardEvent<HTMLElement>,
    optionValue: string,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const currentSelected = selectedOptions[filterKey] || [];
      const isChecked = currentSelected.includes(optionValue);
      let newSelected: string[];

      if (isChecked) {
        newSelected = currentSelected.filter((val) => val !== optionValue);
      } else {
        newSelected = [...currentSelected, optionValue];
      }
      handleOptionChange(newSelected);
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
        aria-expanded={showCategory}
        aria-controls={`filter-${filterKey}`}
      >
        <h4
          className={styles.filters__optionName}
          id={`filter-title-${filterKey}`}
        >
          {title}
        </h4>

        <img
          src={ArrowUpSvg}
          alt={showCategory ? 'Collapse section' : 'Expand section'}
          className={cn(
            styles.filters__optionArrow,
            !showCategory && styles.arrowDown,
          )}
        />
      </div>

      {showCategory && (
        <div id={`filter-${filterKey}`}>
          <Checkbox.Group
            value={selectedOptions[filterKey] || []}
            onChange={(values) => handleOptionChange(values as string[])}
            className={cn(
              styles.filters__optionList,
              filterKey === 'memorySlot' ? 'filters__memorySlot' : '',
            )}
          >
            <div
              data-label={filterKey}
              role="group"
              aria-labelledby={`filter-title-${filterKey}`}
              style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              {options
                .slice(0, showMoreOptions ? options.length : 5)
                .map((option) => (
                  <Checkbox
                    key={`${option}-checkbox`}
                    value={option}
                    className={styles.filters__optionItem}
                    style={
                      {
                        '--color-value': option.toLowerCase(),
                      } as React.CSSProperties
                    }
                    onKeyDown={(e) => handleCheckboxKeyDown(e, option)}
                  >
                    {option}
                  </Checkbox>
                ))}
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
              onKeyDown={handleMoreButtonKeyDown}
              aria-expanded={showMoreOptions}
            >
              {showMoreOptions ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
