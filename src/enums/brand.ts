const Brand = {
  APPLE: 'Apple',
  SAMSUNG: 'Samsung',
  LENOVO: 'Lenovo',
  ASUS: 'Asus',
  NIKON: 'Nikon',
  FUJIFILM: 'Fujifilm',
  CANON: 'Canon',
} as const;

// eslint-disable-next-line no-redeclare
type Brand = (typeof Brand)[keyof typeof Brand];

export { Brand };
