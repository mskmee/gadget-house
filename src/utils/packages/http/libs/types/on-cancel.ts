type OnCancel = {
  readonly isResolved: boolean;
  readonly isRejected: boolean;
  readonly isCancelled: boolean;

  // eslint-disable-next-line no-unused-vars
  (cancelHandler: () => void): void;
};

export { type OnCancel };
