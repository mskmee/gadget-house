const OrderStatus = {
  PAID: 'PAID',
  NOT_PAID: 'NOT PAID',
  RETURNED: 'RETURNED',
  SENT: 'SENT',
  CANCEL: 'CANCEL',
  ORDER: 'ORDER',
} as const;

// eslint-disable-next-line no-redeclare
type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export { OrderStatus };
