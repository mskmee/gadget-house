const Statuses = {
  PAID: 'Paid',
  NOT_PAID: 'Not Paid',
  RETURNED: 'Returned',
  ORDER: 'Order',
  AWAITING: 'Awaiting',
  CANCEL: 'Cancel',
} as const;

// eslint-disable-next-line no-redeclare
type Statuses = (typeof Statuses)[keyof typeof Statuses];

export { Statuses };