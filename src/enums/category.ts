const Category = {
  ALL_PRODUCTS: 0,
  SMARTPHONE: 1,
  LAPTOP: 2,
  PHOTO_AND_VIDEO: 3,
  AUDIO: 4,
  TABLET: 5,
  SMARTWATCHE: 6,
  PC: 7,
  TV: 8,
  CONSOLES: 9,
  KIDS: 10,
  SALE: 11,
  VIEWED: 12,
} as const;

// eslint-disable-next-line no-redeclare
type Category = (typeof Category)[keyof typeof Category];

export { Category };
