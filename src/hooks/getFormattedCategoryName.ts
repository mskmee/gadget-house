import { Category } from "@/enums/category";

function getFormattedCategoryName(categoryId: number | undefined): string | undefined {
  if (categoryId === undefined) return undefined;

  // eslint-disable-next-line no-unused-vars
  const name = Object.entries(Category).find(([_, value]) => value === categoryId)?.[0];
  
  return name?.toLowerCase().replace(/_/g, '-');
}

export default getFormattedCategoryName;