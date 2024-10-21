import { useState } from 'react';
import cn from 'classnames';

import { IOption } from '@/interfaces/interfaces';

import styles from './filters.module.scss';

export const Option = ({
  data,
  title,
  btnMore,
  option,
  optionChange,
}: IOption) => {
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const toggleShowMoreOptions = () => {
    setShowMoreOptions(!showMoreOptions);
  };

  return (
    <div className={styles.filters__option}>
      <h4 className={styles.filters__optionName}>{title}</h4>
      <ul className={styles.filters__optionList}>
        {data
          .slice(0, showMoreOptions ? data.length : 5)
          .map((item: string) => (
            <li key={item}>
              <label
                className={cn(
                  styles.filters__optionCheckbox,
                  option === 'memorySlot' ? 'filters__memorySlot' : '',
                )}
                onChange={() => optionChange(option, item)}
              >
                <input
                  className={styles.filters__optionInput}
                  type="checkbox"
                  name={item}
                />
                <span
                  className={styles.filters__optionText}
                  data-label={option}
                >
                  {option === 'colors' ? (
                    <span
                      style={{
                        width: '18px',
                        height: '18px',
                        display: 'inline-block',
                        marginRight: '8px',
                        marginTop: '5px',
                        borderRadius: ' 3px',
                        border: '1px solid #1c1817',
                        backgroundColor: item,
                        lineHeight: 1,
                      }}
                    ></span>
                  ) : null}
                  {item}
                </span>
              </label>
            </li>
          ))}
      </ul>

      {btnMore ? (
        <button
          className={styles.filters__btnMore}
          type="button"
          onClick={toggleShowMoreOptions}
        >
          {showMoreOptions ? 'Show less' : 'Show more'}
        </button>
      ) : null}
    </div>
  );
};
