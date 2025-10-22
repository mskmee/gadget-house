const PaymentMethod = {
  DEFAULT: '',
  AFTER_CHECKING: 'AFTER_CHECKING',
  COURIER: 'COURIER',
} as const;

type PaymentMethodType = (typeof PaymentMethod)[keyof typeof PaymentMethod];

export { PaymentMethod, type PaymentMethodType };
