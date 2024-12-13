const Locale = {
  UA: 'uk-UA',
  RU: 'ru-RU',
} as const;

// eslint-disable-next-line no-redeclare
type Locale = (typeof Locale)[keyof typeof Locale];

export { Locale };
