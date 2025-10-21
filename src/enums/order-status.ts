const OrderStatus = {
  PAID: 'PAID',
  NOT_PAID: 'NOT PAID',
  RETURNED: 'RETURNED',
  ORDER: 'ORDER',
  SENT: 'SENT',
  CANCEL: 'CANCEL',
} as const;

// eslint-disable-next-line no-redeclare
type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export { OrderStatus };
