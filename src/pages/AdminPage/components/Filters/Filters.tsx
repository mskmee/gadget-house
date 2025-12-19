import React, { useState } from 'react';
import { DatePicker, Flex, InputNumber, Popover, Switch } from 'antd';
import en from 'antd/es/date-picker/locale/en_US';
import cn from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import { OrderStatus } from '@/enums/enums';
import { handleKeyDown } from '@/utils/helpers/checkKeydownEvent';
import {
  handleDateChange,
  handleNumberChange,
} from '@/utils/helpers/handleFormChange';
import { FilterIcon } from '@/assets/icons/FilterIcon';
import { CalendarIcon } from '@/assets/icons';

import styles from './filters.module.scss';
import { OrderFilterParams } from '@/store/orders/api';
import { formatTitle } from '@/utils/helpers/formatTitle';

interface FiltersProps {
  // eslint-disable-next-line no-unused-vars
  handleApplyFilter: (appliedFilters: OrderFilterParams) => void;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const Filters = ({
  handleApplyFilter,
  isOpen,
  onToggle,
  onClose,
}: FiltersProps) => {
  const [filters, setFilters] = useState<OrderFilterParams>({
    createdAfter: null,
    createdBefore: null,
    totalMore: null,
    totalLess: null,
    statuses: null,
  });

  const [filterVisibility, setFilterVisibility] = useState({
    date: true,
    price: true,
    status: true,
  });

  const dateLocale: typeof en = {
    ...en,
    lang: {
      ...en.lang,
      fieldDateFormat: 'DD/MM/YYYY',
    },
  };

  const handleSwitchChange =
    (key: keyof typeof filterVisibility) => (checked: boolean) => {
      setFilterVisibility((prev) => ({
        ...prev,
        [key]: checked,
      }));
    };

  const updateFilter = <K extends keyof typeof filters>(
    key: K,
    value: (typeof filters)[K],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const disabledEndDate = (current: Dayjs) => {
    const createdAfterDate = filters.createdAfter
      ? dayjs(filters.createdAfter, 'DD/MM/YYYY')
      : null;
    if (createdAfterDate) {
      return current.isBefore(createdAfterDate.startOf('day'));
    }
    return false;
  };

  const disabledStartDate = (current: Dayjs) => {
    const createdBeforeDate = filters.createdBefore
      ? dayjs(filters.createdBefore, 'DD/MM/YYYY')
      : null;
    if (createdBeforeDate) {
      return current.isAfter(createdBeforeDate.startOf('day'));
    }
    return false;
  };

  const handleApplyFilters = () => {
    const appliedFilters: OrderFilterParams = {
      createdAfter: filterVisibility.date ? filters.createdAfter : undefined,
      createdBefore: filterVisibility.date ? filters.createdBefore : undefined,
      totalMore: filterVisibility.price ? filters.totalMore : undefined,
      totalLess: filterVisibility.price ? filters.totalLess : undefined,
      statuses: filterVisibility.status
        ? filters.statuses?.map((item) => item.toUpperCase())
        : undefined,
    };

    handleApplyFilter(appliedFilters);
    onClose();
  };
  const handleDateKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    const allowedKeys = [
      'Backspace',
      'Delete',
      'Tab',
      'Escape',
      'Enter',
      'ArrowLeft',
      'ArrowRight',
    ];
    if (allowedKeys.includes(e.key)) {
      return;
    }
    if (!/^[0-9./]$/.test(e.key)) {
      e.preventDefault();
    }
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
          <span>From</span>
          <DatePicker
            className={styles.admin__filterDatePicker}
            locale={dateLocale}
            value={
              filters.createdAfter
                ? dayjs(filters.createdAfter, ['DD/MM/YYYY', 'DD.MM.YYYY'])
                : null
            }
            onChange={handleDateChange((value) =>
              updateFilter('createdAfter', value || undefined),
            )}
            format={['DD/MM/YYYY', 'DD.MM.YYYY']}
            popupClassName={styles.admin__filterDatePopup}
            allowClear
            suffixIcon={<CalendarIcon />}
            onKeyDown={handleDateKeyDown}
            disabledDate={disabledStartDate}
          />
          <span>-</span>
          <span>To</span>
          <DatePicker
            className={styles.admin__filterDatePicker}
            locale={dateLocale}
            value={
              filters.createdBefore
                ? dayjs(filters.createdBefore, ['DD/MM/YYYY', 'DD.MM.YYYY'])
                : null
            }
            onChange={handleDateChange((value) =>
              updateFilter('createdBefore', value || undefined),
            )}
            format={['DD/MM/YYYY', 'DD.MM.YYYY']}
            popupClassName={styles.admin__filterDatePopup}
            allowClear
            suffixIcon={<CalendarIcon />}
            onKeyDown={handleDateKeyDown}
            disabledDate={disabledEndDate}
          />
        </Flex>
      ),
    },
    {
      key: 'price',
      title: 'Price',
      content: (
        <Flex align="center" justify="space-between" gap={12}>
          <span>From</span>
          <InputNumber
            className={styles.admin__filterInput}
            addonAfter="₴"
            value={filters.totalMore ?? undefined}
            min={0}
            max={99999}
            maxLength={5}
            controls={false}
            inputMode="numeric"
            onKeyDown={handleKeyDown}
            onChange={handleNumberChange((value) =>
              updateFilter('totalMore', value || undefined),
            )}
          />
          <span>-</span>
          <span>To</span>
          <InputNumber
            className={styles.admin__filterInput}
            addonAfter="₴"
            value={filters.totalLess ?? undefined}
            min={0}
            max={100000}
            maxLength={6}
            controls={false}
            inputMode="numeric"
            onKeyDown={handleKeyDown}
            onChange={handleNumberChange((value) =>
              updateFilter('totalLess', value || undefined),
            )}
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
              <label key={status} className={styles.admin__filterRadio}>
                <input
                  className={styles.admin__filterRadioInput}
                  type="radio"
                  value={status}
                  name="status"
                  checked={filters.statuses?.[0] === status}
                  onClick={() => {
                    if (filters.statuses?.[0] === status) {
                      updateFilter('statuses', undefined);
                    }
                  }}
                  onChange={() =>
                    updateFilter('statuses', [status as OrderStatus])
                  }
                />
                <span
                  className={cn(
                    'button__status',
                    styles.admin__filterRadioStatus,
                    `button__status_${status.toLowerCase().replace(' ', '_')}`,
                  )}
                >
                  {filters.statuses?.[0] === status && <span>✓ </span>}
                  {status.split(' ').map(formatTitle).join(' ')}
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
        open={isOpen}
        onOpenChange={(newOpen) => {
          if (!newOpen) {
            onClose();
          }
        }}
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
        <button className={styles.admin__filterBtn} onClick={onToggle}>
          <FilterIcon /> Filters
        </button>
      </Popover>
    </div>
  );
};

export { Filters };
