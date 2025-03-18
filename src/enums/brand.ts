const Brand = {
  APPLE: 'Apple',
  SAMSUNG: 'Samsung',
  LENOVO: 'Lenovo',
  ASUS: 'Asus',
  NIKON: 'Nikon',
  FUJIFILM: 'Fujifilm',
  CANON: 'Canon',
  XIAOMI: 'Xiaomi',
  OPPO: 'OPPO',
  NOKIA: 'Nokia',
  REALME: 'Realme',
  HONOR: 'Honor',
  SONY: 'Sony',
  GOOGLE: 'Google',
  LG: 'LG',
  HUAWEI: 'Huawei',
  ONEPLUS: 'OnePlus',
} as const;

const BrandIDs: Record<Brand, number> = {
  [Brand.APPLE]: 1,
  [Brand.SAMSUNG]: 2,
  [Brand.LENOVO]: 3,
  [Brand.ASUS]: 4,
  [Brand.NIKON]: 5,
  [Brand.FUJIFILM]: 6,
  [Brand.CANON]: 7,
  [Brand.XIAOMI]: 8,
  [Brand.OPPO]: 9,
  [Brand.NOKIA]: 10,
  [Brand.REALME]: 11,
  [Brand.HONOR]: 12,
  [Brand.SONY]: 13,
  [Brand.GOOGLE]: 14,
  [Brand.LG]: 15,
  [Brand.HUAWEI]: 16,
  [Brand.ONEPLUS]: 17,
} as const;

// eslint-disable-next-line no-redeclare
type Brand = (typeof Brand)[keyof typeof Brand];

export { Brand, BrandIDs };
