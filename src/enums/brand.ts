const Brand = {
  APPLE: 'Apple',
  SAMSUNG: 'Samsung',
  LENOVO: 'Lenovo',
  ASUS: 'Asus',
  NIKON: 'Nikon',
  FUJIFILM: 'Fujifilm',
  CANON: 'Canon',
JBL:'JBL',
DELL:'Dell'
} as const;

const BrandIDs: Record<Brand, number> = {
  [Brand.APPLE]: 1,
  [Brand.SAMSUNG]: 2,
  [Brand.LENOVO]: 3,
  [Brand.ASUS]: 4,
  [Brand.NIKON]: 5,
  [Brand.FUJIFILM]: 6,
  [Brand.CANON]: 7,
  [Brand.JBL]: 8,       
  [Brand.DELL]: 9, 


} as const;

// eslint-disable-next-line no-redeclare
type Brand = (typeof Brand)[keyof typeof Brand];

export { Brand, BrandIDs };
