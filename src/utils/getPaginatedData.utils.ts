import type { Phone } from '@/types/generateFakeData.types';

export const getPaginatedData = (
  data: Phone[],
  page: number,
  pageSize: number,
) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return data.slice(startIndex, endIndex);
};
