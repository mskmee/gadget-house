import { Category } from "@/enums/category";

  export const generateProductUrl = (product: any) => {
    const { categoryId, id: productId, href } = product.shortProductResponseDto;

    const categoriesKeys = Object.keys(Category) as (keyof typeof Category)[];

    const category = categoriesKeys.find(
      (categoryKey) => Category[categoryKey] === categoryId,
    );
    const formatedCategory = category?.toLowerCase().replace(/_/g, '-');

    return `/${formatedCategory}/${productId}/${href}`;
  };