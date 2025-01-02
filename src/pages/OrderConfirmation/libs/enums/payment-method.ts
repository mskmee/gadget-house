const PaymentMethod = {
  AFTER_CHECKING: 'afterChecking',
  COURIER: 'courier',
} as const;

type PaymentMethodType = (typeof PaymentMethod)[keyof typeof PaymentMethod];

export { PaymentMethod, type PaymentMethodType };