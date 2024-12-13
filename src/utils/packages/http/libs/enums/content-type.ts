const ContentType = {
  JSON: 'application/json',
  FORM_DATA: 'multipart/form-data',
  TEXT_PLAIN: 'text/plain',
} as const;

// eslint-disable-next-line no-redeclare
type ContentType = (typeof ContentType)[keyof typeof ContentType];

export { ContentType };
