import { Currency } from '@/enums/enums';

const convertPriceToReadable = (
  price: number | string,
  currency: Currency,
  locale: string,
) => {
  return `${price?.toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}\u00A0${currency}`;
};

export { convertPriceToReadable };
