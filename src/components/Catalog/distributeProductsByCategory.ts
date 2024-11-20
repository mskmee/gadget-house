import { generateGadgets, IGadget } from "./generateGadgets";

// Генерация 500 гаджетов
const generatedGadgets = generateGadgets(500);

export function distributeProductsByCategory(location: string): IGadget[] {
  const productsByCategory: IGadget[] = [];

  generatedGadgets.forEach(product => {
    if (product.category.toLowerCase() === location) {

      productsByCategory.push(product);
    }
  });

  return productsByCategory;
}
