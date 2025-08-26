import getFormattedCategoryName from '@/hooks/getFormattedCategoryName';

interface ProductWithCategory {
  id: number | string;
  href?: string;
  categoryId?: number;
  categoryResponseDto?: {
    id: number;
    name?: string;
  };
  category?: {
    id: number;
  };
  [key: string]: any;
}

export function generateProductUrl(product: ProductWithCategory): string {
  const actualCategoryId =
    product.categoryResponseDto?.id || product.categoryId || 1;
  // (product as any).category?.id;

  const categoryName = getFormattedCategoryName(actualCategoryId);
  const productHref = product.href || 'product';

  return `/${categoryName}/${product.id}/${productHref}`;
}
