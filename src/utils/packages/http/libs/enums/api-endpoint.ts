const ApiEndpoint = {
  PRODUCTS: 'products',
  ORDERS: 'orders',
  SIGNIN: 'signIn',
  SIGNUP: 'signUp',
  FORGOT_PASSWORD: 'resetPassword',
  CHANGE_PASSWORD: 'changePassword',
  USER: 'users/profile',
} as const;

// eslint-disable-next-line no-redeclare
type ApiEndpoint = (typeof ApiEndpoint)[keyof typeof ApiEndpoint];

export { ApiEndpoint };
