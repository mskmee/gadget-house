const ApiEndpoint = {
  PRODUCTS: 'products',
  PRODUCTS_SEARCH: 'products/search',
  PRODUCTS_SUGGESTIONS: 'products/suggestions',
  PRODUCT_REVIEW: 'reviews',
  ORDERS: 'orders',
  SIGNIN: 'signIn',
  SIGNUP: 'signUp',
  FORGOT_PASSWORD: 'resetPassword',
  CHANGE_PASSWORD: 'changePassword',
  USER: 'users/profile',
  BRANDS: 'brands',
  CATEGORIES: 'categories',
  ATTRIBUTES: 'attributes',
} as const;

// eslint-disable-next-line no-redeclare
type ApiEndpoint = (typeof ApiEndpoint)[keyof typeof ApiEndpoint];

export { ApiEndpoint };
