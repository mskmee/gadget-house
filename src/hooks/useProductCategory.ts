import { useMemo } from 'react';
import { Category } from '@/enums/category';
// import { AppRoute } from '@/enums/Route';

interface UseProductCategoryReturn {
  categoryName: string;
  categoryPath: string;
  productUrl: string;
}

export const useProductCategory = (
  productId: number,
  categoryId?: number,
  category?: string,
  href?: string,
): UseProductCategoryReturn => {
  return useMemo(() => {
    if (category) {
      const categoryPath = category.toLowerCase().replace(/\s+/g, '-');
      return {
        categoryName: category,
        categoryPath,
        productUrl: `/${categoryPath}/${productId}/${href || ''}`,
      };
    }

    if (categoryId && categoryId !== Category.ALL_PRODUCTS) {
      const categoryEntry = Object.entries(Category).find(
        ([_, value]) => value === categoryId,
      );

      if (categoryEntry) {
        const [categoryKey] = categoryEntry;
        const categoryPath = categoryKey.toLowerCase().replace(/_/g, '-');
        const categoryName = categoryKey.replace(/_/g, ' ').toLowerCase();

        return {
          categoryName,
          categoryPath,
          productUrl: `/${categoryPath}/${productId}/${href || ''}`,
        };
      }
    }

    return {
      categoryName: 'products',
      categoryPath: 'all-products',
      productUrl: `/all-products/${productId}/${href || ''}`,
    };
  }, [productId, categoryId, category, href]);
};
