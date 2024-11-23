import { IShoppingCard } from '@/interfaces/interfaces';

const MAX_BASKET_ITEM_QUANTITY = 20;

const convertPriceToNumber = (price: string): number =>
  parseFloat(price.replace(/\s/g, ''));

const calculateItemTotalPrice = (quantity: number, price: string): number => {
  return quantity * convertPriceToNumber(price);
};

const calculateCartTotalPrice = (products: IShoppingCard[]): number => {
  console.log(products);
  return products.reduce(
    (total, item) => total + item.quantity * convertPriceToNumber(item.price),
    0,
  );
};

export {
  calculateCartTotalPrice,
  MAX_BASKET_ITEM_QUANTITY,
  calculateItemTotalPrice,
  convertPriceToNumber,
};
