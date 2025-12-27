const Sort = {
  RATING: { name: 'By rating', value: 'rating' },
  LOWTOHIGH: { name: 'From low to high cost', value: 'price,ASC' },
  HIGHTOLOW: { name: 'From high to low cost', value: 'price,DESC' },
} as const;

// eslint-disable-next-line no-redeclare
type Sort = (typeof Sort)[keyof typeof Sort];

export { Sort };