import { Currency } from '@/enums/enums';

const convertPriceToReadable = (
  price: number | string,
  currency: Currency,
  locale: string,
) => {
  const numericPrice = typeof price === 'number' ? Math.round(price) : price;

  return `${numericPrice?.toLocaleString(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}\u00A0${currency}`;
};

export { convertPriceToReadable };
