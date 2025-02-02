const Category = {
  PHONES: 1,
  LAPTOPS: 2,
  CAMERAS: 3,
} as const;

// eslint-disable-next-line no-redeclare
type Category = (typeof Category)[keyof typeof Category];

export { Category };
