const Category = {
  PHONES: 1,
  LAPTOPS: 2,
  CAMERAS: 3,
  AUDIOS: 4,
  TABLETS: 5,
  SMARTWATCHES: 6,
  PC: 7,
  TV: 8,
  GAME_CONSOLES: 9,
  KIDS: 10,
  SALE: 11,
  VIEWED: 12,
} as const;

// eslint-disable-next-line no-redeclare
type Category = (typeof Category)[keyof typeof Category];

export { Category };
