const ApiEndpoint = {
  PRODUCTS: 'products',
  ORDERS: 'orders',
} as const;

// eslint-disable-next-line no-redeclare
type ApiEndpoint = (typeof ApiEndpoint)[keyof typeof ApiEndpoint];

export { ApiEndpoint };
