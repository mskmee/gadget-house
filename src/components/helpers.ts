import { AppRoute } from '@/enums/Route.ts';
import { laptopData, smartphoneData } from '@/constants/productCards';

type TParams = {
  category?: string;
  id?: string;
};

type BreadcrumbItem = {
  title: string;
  href: string;
};

export const getBreadcrumbItems = (
  path: string,
  { category, id }: TParams,
): BreadcrumbItem[] => {
  const allProducts = [...smartphoneData, ...laptopData];
  const currentProduct = allProducts.find(
    (product) => id && product.id === +id,
  );

  const breadcrumbItems: BreadcrumbItem[] = [
    {
      title: 'Homepage',
      href: AppRoute.ROOT,
    },
  ];

  if (path === AppRoute.BASKET_PAGE) {
    breadcrumbItems.push({
      title: 'Basket',
      href: '#',
    });
  } else if (category) {
    // dynamically resolve the route based on the category
    const categoryKey = category.toUpperCase() as keyof typeof AppRoute;
    const categoryRoute = AppRoute[categoryKey] || `/${category}`;

    breadcrumbItems.push({
      title: category.charAt(0).toUpperCase() + category.slice(1),
      href: categoryRoute,
    });

    if (id && currentProduct) {
      breadcrumbItems.push({
        title: currentProduct.name,
        href: '#',
      });
    }
  }

  return breadcrumbItems;
};
