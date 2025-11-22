export const getUserLocale = (): string => {
  const browserLocale =
    navigator.language || navigator.languages?.[0] || 'en-US';

  return browserLocale;
};
