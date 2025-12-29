const Sort = {
  RATING_HIGHTOLOW: { name: 'By higher rating', value: 'rating,desc' },
  RATING_LOWTOHIGH: { name: 'By lower rating', value: 'rating,asc' },
  LOWTOHIGH: { name: 'From low to high cost', value: 'price,ASC' },
  HIGHTOLOW: { name: 'From high to low cost', value: 'price,DESC' },
} as const;

// eslint-disable-next-line no-redeclare
type Sort = (typeof Sort)[keyof typeof Sort];

export { Sort };