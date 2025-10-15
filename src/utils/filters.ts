import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

/**
 * Generic filter function for numeric range
 *
 * @template T - The type of object being filtered
 * @template F - The type of filter object
 * @param item - The item to filter
 * @param filter - Filter object containing range values
 * @param getValue - Callback to extract the numeric value from item
 * @param getMin - Callback to extract minimum value from filter
 * @param getMax - Callback to extract maximum value from filter
 * @returns True if the item passes the filter
 *
 * @example
 * ```typescript
 * const isValid = filterByRange(
 *   order,
 *   { priceFrom: 100, priceTo: 500 },
 *   (item) => item.total,
 *   (f) => f.priceFrom,
 *   (f) => f.priceTo
 * );
 * ```
 */
export const filterByRange = <T, F>(
  item: T,
  filter: F,
  getValue: (item: T) => number,
  getMin: (filter: F) => number | null | undefined,
  getMax: (filter: F) => number | null | undefined,
): boolean => {
  const value = getValue(item);
  const min = getMin(filter);
  const max = getMax(filter);

  return (
    (min === undefined || min === null || value >= min) &&
    (max === undefined || max === null || value <= max)
  );
};

/**
 * Generic filter function for equality/status checks
 *
 * @template T - The type of object being filtered
 * @template F - The type of filter value
 * @param item - The item to filter
 * @param filter - Filter value to match
 * @param getValue - Callback to extract the value from item
 * @param compareMode - Comparison mode: 'case-insensitive' or 'exact' (default: 'case-insensitive')
 * @returns True if the item passes the filter
 *
 * @example
 * ```typescript
 * const isValid = filterByValue(
 *   order,
 *   'DELIVERED',
 *   (item) => item.deliveryStatus
 * );
 * ```
 */
export const filterByValue = <T, F extends string>(
  item: T,
  filter: F | null | undefined,
  getValue: (item: T) => string,
  compareMode: 'case-insensitive' | 'exact' = 'case-insensitive',
): boolean => {
  if (!filter) return true;

  const value = getValue(item);

  if (compareMode === 'case-insensitive') {
    return value.toUpperCase() === filter.toUpperCase();
  }

  return value === filter;
};

/**
 * Generic filter function for date range
 *
 * @template T - The type of object being filtered
 * @template F - The type of date filter object
 * @param item - The item to filter
 * @param filter - Date filter object
 * @param getValue - Callback to extract the date value from item
 * @param getFrom - Callback to extract 'from' date from filter
 * @param getTo - Callback to extract 'to' date from filter
 * @param dateFormat - Format of the filter dates (default: 'DD/MM/YYYY')
 * @returns True if the item passes the filter
 *
 * @example
 * ```typescript
 * const isValid = filterByDateRange(
 *   order,
 *   { dateFrom: '01/01/2024', dateTo: '31/12/2024' },
 *   (item) => item.createdAt,
 *   (f) => f.dateFrom,
 *   (f) => f.dateTo
 * );
 * ```
 */
export const filterByDateRange = <T, F>(
  item: T,
  filter: F,
  getValue: (item: T) => string | Date | Dayjs,
  getFrom: (filter: F) => string | null | undefined,
  getTo: (filter: F) => string | null | undefined,
  dateFormat: string = 'DD/MM/YYYY',
): boolean => {
  const itemDate = dayjs(getValue(item));
  const fromStr = getFrom(filter);
  const toStr = getTo(filter);

  const from = fromStr ? dayjs(fromStr, dateFormat) : null;
  const to = toStr ? dayjs(toStr, dateFormat) : null;

  return (
    (!from || itemDate.isSameOrAfter(from, 'day')) &&
    (!to || itemDate.isSameOrBefore(to, 'day'))
  );
};
