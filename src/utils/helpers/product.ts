import { Currency, Locale } from '@/enums/enums';

const convertPriceToReadable = (
  price: number | string,
  currency: Currency,
  locale: Locale,
) => {
  return `${price.toLocaleString(locale)} ${currency}`;
};

export { convertPriceToReadable };
