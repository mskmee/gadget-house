import type { Phone } from '@/types/generateFakeData.types';

export const getCheckboxVariants = (
  products: Phone[],
  reference: keyof Phone['characteristics'],
): string[] => {
  const uniqueVariants = new Set<string>(
    products.map((product) => String(product.characteristics[reference])),
  );

  return Array.from(uniqueVariants);
};