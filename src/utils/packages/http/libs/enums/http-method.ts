const HttpMethod = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const;

// eslint-disable-next-line no-redeclare
type HttpMethod = (typeof HttpMethod)[keyof typeof HttpMethod];

export { HttpMethod };
