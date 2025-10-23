const OrderStatus = {
  PAID: 'Paid',
  NOT_PAID: 'Not Paid',
  RETURNED: 'Returned',
  ORDER: 'Order',
  AWAITING: 'Sent',
  CANCEL: 'Cancel',
} as const;

// eslint-disable-next-line no-redeclare
type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export { OrderStatus };
