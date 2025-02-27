const LocalStorageKey = {
  CART_TOTAL_AMOUNT: 'cart_total_amount',
  CART_QUANTITY: 'cart_quantity',
  CART_PRODUCTS: 'cart_products',
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
} as const;

// eslint-disable-next-line no-redeclare
type LocalStorageKey = (typeof LocalStorageKey)[keyof typeof LocalStorageKey];

export { LocalStorageKey };
