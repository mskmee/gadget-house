import { FC, useState } from 'react';
import { DatePicker, Flex, InputNumber, Popover, Switch } from 'antd';
import en from 'antd/es/date-picker/locale/en_US';
import { DatePickerProps } from 'antd/es/date-picker';
import cn from 'classnames';

import { OrderStatus } from '@/enums/enums';
import { handleKeyDown } from '@/utils/helpers/checkKeydownEvent';
import { FilterIcon } from '@/assets/icons/FilterIcon';

import styles from './filters.module.scss';

interface IFilters {
  // eslint-disable-next-line no-unused-vars
  onSelectedFilters: (key: string, value: string) => void;
}

export const Filters: FC<IFilters> = ({ onSelectedFilters }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showOptions, setShowOptions] = useState(true);

  const toggleFilter = () => setShowFilters(!showFilters);

  const handleFilterChange = (key: string, value: string) => {
    onSelectedFilters(key, value);
  };

  const onChangeToggle = (checked: boolean) => {
    setShowOptions(checked);
  };

  const onChangeDate: DatePickerProps['onChange'] = (_, dateStr) => {
    console.log('onChange:', dateStr);
  };

  const dateLocale: typeof en = {
    ...en,
    lang: {
      ...en.lang,
      fieldDateFormat: 'DD/MM/BBBB',
      yearFormat: '2025',
      cellYearFormat: '2025',
    },
  };

  const content = (
    <div className={styles.admin__filterList}>
      <div className={styles.admin__filterItem}>
        <div
          className={styles.admin__filterLabel}
          style={
            showOptions
              ? {
                  marginBottom: '8px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid var(--secondary-background-color)',
                }
              : {}
          }
        >
          <h3>Order Date</h3>

          <div className={styles.admin__filterToggle}>
            <Switch defaultChecked={showOptions} onChange={onChangeToggle} />
          </div>
        </div>

        {showOptions && (
          <Flex align="center" justify="space-between" gap={12}>
            <span className={styles.admin__filterText}>From</span>

            <DatePicker
              className={styles.admin__filterDatePicker}
              locale={dateLocale}
              onChange={onChangeDate}
            />

            <span className={styles.admin__filterDivider}>-</span>

            <span className={styles.admin__filterText}>To</span>

            <DatePicker
              className={styles.admin__filterDatePicker}
              locale={dateLocale}
              onChange={onChangeDate}
            />
          </Flex>
        )}
      </div>

      <div className={styles.admin__filterItem}>
        <div
          className={styles.admin__filterLabel}
          style={
            showOptions
              ? {
                  marginBottom: '8px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid var(--secondary-background-color)',
                }
              : {}
          }
        >
          <h3>Price</h3>

          <div className={styles.admin__filterToggle}>
            <Switch defaultChecked={showOptions} onChange={onChangeToggle} />
          </div>
        </div>

        {showOptions && (
          <Flex align="center" justify="space-between" gap={12}>
            <span className={styles.admin__filterText}>From</span>

            <InputNumber
              className={styles.admin__filterInput}
              addonAfter="₴"
              defaultValue={50}
              min={0}
              max={99999}
              maxLength={5}
              controls={false}
              inputMode="numeric"
              stringMode={false}
              onKeyDown={handleKeyDown}
            />

            <span className={styles.admin__filterDivider}>-</span>

            <span className={styles.admin__filterText}>To</span>

            <InputNumber
              className={styles.admin__filterInput}
              addonAfter="₴"
              defaultValue={100}
              min={0}
              max={100000}
              maxLength={6}
              controls={false}
              inputMode="numeric"
              stringMode={false}
              onKeyDown={handleKeyDown}
            />
          </Flex>
        )}
      </div>

      <div className={styles.admin__filterItem}>
        <div
          className={styles.admin__filterLabel}
          style={
            showOptions
              ? {
                  marginBottom: '8px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid var(--secondary-background-color)',
                }
              : {}
          }
        >
          <h3>Status</h3>

          <div className={styles.admin__filterToggle}>
            <Switch defaultChecked={showOptions} onChange={onChangeToggle} />
          </div>
        </div>

        {showOptions && (
          <Flex align="center" justify="space-between" gap={12}>
            <Flex gap={10} wrap>
              {Object.values(OrderStatus).map((status) => (
                <button
                  key={status}
                  className={cn(
                    'button__status',
                    styles.admin__filterStatus,
                    `button__status_${status.toLocaleLowerCase().replace(' ', '_')}`,
                  )}
                  onClick={() => handleFilterChange('status', status)}
                >
                  {status}
                </button>
              ))}
            </Flex>
          </Flex>
        )}
      </div>

      <button
        className={cn('button button-secondary', styles.admin__filterApply)}
      >
        Apply
      </button>
    </div>
  );

  return (
    <div className={styles.admin__filter}>
      <Popover
        title=""
        trigger="click"
        open={showFilters}
        placement="bottomRight"
        content={content}
        overlayInnerStyle={{
          width: '502px',
          padding: '32px',
          marginTop: '15px',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(234, 228, 238, 0.8)',
        }}
      >
        <button className={styles.admin__filterBtn} onClick={toggleFilter}>
          <FilterIcon /> Filters
        </button>
      </Popover>
    </div>
  );
};
