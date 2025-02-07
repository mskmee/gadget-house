const ApiEndpoint = {
  PRODUCTS: 'products',
  ORDERS: 'orders',
  SIGNIN: 'signIn',
  SIGNUP: 'signUp',
} as const;

// eslint-disable-next-line no-redeclare
type ApiEndpoint = (typeof ApiEndpoint)[keyof typeof ApiEndpoint];

export { ApiEndpoint };
