const DataStatus = {
  PENDING: 'loading',
  FULFILLED: 'fulfilled',
  REJECT: 'error',
  IDLE: 'idle',
} as const;

// eslint-disable-next-line no-redeclare
type DataStatus = (typeof DataStatus)[keyof typeof DataStatus];

export { DataStatus };
