import cn from 'classnames';
import FilterWrapper from '@/components/FilterWrapper/FilterWrapper';
import { Checkbox } from 'antd';
import type { FilterProps } from '@/types/catalog.types';
import styles from './Filter.module.scss';

export default function Filter({
  title,
  options,
  afterOption,
  hasColor = false,
  handleChange,
}: FilterProps) {
  return (
    <FilterWrapper title={title}>
      <ul className={styles.list}>
        {options.map((option) => (
          <li key={option}>
            <Checkbox
              value={option}
              onChange={handleChange}
              className={styles.checkboxContent}
            >
              <div className={styles.label}>
                {hasColor && (
                  <div className={cn(styles.color, styles[option])} />
                )}
                {option}
                {afterOption}
              </div>
            </Checkbox>
          </li>
        ))}
      </ul>
    </FilterWrapper>
  );
}
