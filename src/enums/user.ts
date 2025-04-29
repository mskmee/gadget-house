const User = {
  ROLE_USER: 'user',
  ROLE_ADMIN: 'admin',
} as const;

// eslint-disable-next-line no-redeclare
type User = (typeof User)[keyof typeof User];

export { User };