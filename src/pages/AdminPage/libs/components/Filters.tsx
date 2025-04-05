import React, { FC, useState } from 'react';
import { DatePicker, Flex, InputNumber, Popover, Switch } from 'antd';
import en from 'antd/es/date-picker/locale/en_US';
import cn from 'classnames';

import { OrderStatus } from '@/enums/enums';
import { handleKeyDown } from '@/utils/helpers/checkKeydownEvent';
import {
  handleDateChange,
  handleNumberChange,
} from '@/utils/helpers/handleFormChange';
import { FilterIcon } from '@/assets/icons/FilterIcon';

import styles from './filters.module.scss';

interface IFilters {
  // eslint-disable-next-line no-unused-vars
  onSelectedFilters: (key: string, value: string) => void;
}

export const Filters: FC<IFilters> = ({ onSelectedFilters }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filterVisibility, setFilterVisibility] = useState({
    date: true,
    price: true,
    status: true,
  });

  const [dateFrom, setDateFrom] = useState<string | null>(null);
  const [dateTo, setDateTo] = useState<string | null>(null);
  const [priceFrom, setPriceFrom] = useState<number | null>(null);
  const [priceTo, setPriceTo] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const dateLocale: typeof en = {
    ...en,
    lang: {
      ...en.lang,
      fieldDateFormat: 'DD/MM/BBBB',
      yearFormat: '2025',
      cellYearFormat: '2025',
    },
  };

  const toggleFilter = () => setShowFilters((prev) => !prev);

  const handleSwitchChange =
    (key: keyof typeof filterVisibility) => (checked: boolean) => {
      setFilterVisibility((prev) => ({
        ...prev,
        [key]: checked,
      }));
    };

  const handleApplyFilters = () => {
    if (dateFrom) onSelectedFilters('dateFrom', dateFrom);
    if (dateTo) onSelectedFilters('dateTo', dateTo);
    if (priceFrom !== null)
      onSelectedFilters('priceFrom', priceFrom.toString());
    if (priceTo !== null) onSelectedFilters('priceTo', priceTo.toString());
    if (selectedStatus) onSelectedFilters('status', selectedStatus);
    setShowFilters(false);
  };

  type FilterKey = keyof typeof filterVisibility;

  const filtersConfig: {
    key: FilterKey;
    title: string;
    content: React.ReactNode;
  }[] = [
    {
      key: 'date',
      title: 'Order Date',
      content: (
        <Flex align="center" justify="space-between" gap={12}>
          <span className={styles.admin__filterText}>From</span>
          <DatePicker
            className={styles.admin__filterDatePicker}
            locale={dateLocale}
            onChange={handleDateChange(setDateFrom)}
          />
          <span className={styles.admin__filterDivider}>-</span>
          <span className={styles.admin__filterText}>To</span>
          <DatePicker
            className={styles.admin__filterDatePicker}
            locale={dateLocale}
            onChange={handleDateChange(setDateTo)}
          />
        </Flex>
      ),
    },
    {
      key: 'price',
      title: 'Price',
      content: (
        <Flex align="center" justify="space-between" gap={12}>
          <span className={styles.admin__filterText}>From</span>
          <InputNumber
            className={styles.admin__filterInput}
            addonAfter="₴"
            value={priceFrom ?? undefined}
            min={0}
            max={99999}
            maxLength={5}
            controls={false}
            inputMode="numeric"
            onKeyDown={handleKeyDown}
            onChange={handleNumberChange(setPriceFrom)}
          />
          <span className={styles.admin__filterDivider}>-</span>
          <span className={styles.admin__filterText}>To</span>
          <InputNumber
            className={styles.admin__filterInput}
            addonAfter="₴"
            value={priceTo ?? undefined}
            min={0}
            max={99999}
            maxLength={6}
            controls={false}
            inputMode="numeric"
            onKeyDown={handleKeyDown}
            onChange={handleNumberChange(setPriceTo)}
          />
        </Flex>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      content: (
        <Flex align="center" justify="space-between" gap={12}>
          <Flex gap={10} wrap>
            {Object.values(OrderStatus).map((status) => (
              <label
                key={status}
                className={styles.admin__filterRadio}
                onClick={() => setSelectedStatus(status)}
              >
                <input
                  className={styles.admin__filterRadioInput}
                  type="radio"
                  value={status}
                  name="status"
                />
                <span
                  className={cn(
                    'button__status',
                    styles.admin__filterRadioStatus,
                    `button__status_${status.toLowerCase().replace(' ', '_')}`,
                  )}
                >
                  {status}
                </span>
              </label>
            ))}
          </Flex>
        </Flex>
      ),
    },
  ];

  const content = (
    <div className={styles.admin__filterList}>
      {filtersConfig.map(({ key, title, content }) => (
        <div key={key} className={styles.admin__filterItem}>
          <div
            className={styles.admin__filterLabel}
            style={
              filterVisibility[key] === true
                ? {
                    marginBottom: 8,
                    paddingBottom: 8,
                    borderBottom: '1px solid var(--secondary-background-color)',
                  }
                : {}
            }
          >
            <h3>{title}</h3>
            <div className={styles.admin__filterToggle}>
              <Switch
                checked={filterVisibility[key]}
                onChange={handleSwitchChange(key)}
              />
            </div>
          </div>
          {filterVisibility[key] && content}
        </div>
      ))}

      <button
        className={cn('button button-secondary', styles.admin__filterApply)}
        onClick={handleApplyFilters}
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
