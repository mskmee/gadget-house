import { formatDateToISO } from '../formatDateToISO';

export const cleanOrderParams = (
  params: Record<string, any>,
): Record<string, any> => {
  return Object.entries(params).reduce(
    (acc, [key, value]) => {
      if (value !== null && value !== undefined && value !== 'null') {
        if (
          (key === 'createdBefore' || key === 'createdAfter') &&
          typeof value === 'string'
        ) {
          acc[key] = formatDateToISO(value);
        } else {
          acc[key] = value;
        }
      }
      return acc;
    },
    {} as Record<string, any>,
  );
};
