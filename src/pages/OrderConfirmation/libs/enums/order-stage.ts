/* eslint-disable no-redeclare */
const OrderStage = {
  CONTACTS: 'contacts',
  DELIVERY: 'delivery',
  PAYMENT: 'payment',
  DONE: 'done',
} as const;

type OrderStage = (typeof OrderStage)[keyof typeof OrderStage];

export { OrderStage };
