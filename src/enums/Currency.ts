const Currency = {
  UAH: '₴',
} as const;

// eslint-disable-next-line no-redeclare
type Currency = (typeof Currency)[keyof typeof Currency];

export { Currency };
