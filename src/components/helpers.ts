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

const breadcrumbRoutes = [
  { name: 'All products', path: '/all-products' },
  { name: 'Smartphones', path: '/smartphone' },
  { name: 'Laptops', path: '/laptop' },
  { name: 'Previously viewed', path: '/viewed' },
  { name: 'Photo and video', path: '/photo-and-video' },
  { name: 'Audio', path: '/audio' },
  { name: 'Basket', path: '/basket' },
  { name: 'Tablet', path: '/tablets' },
  { name: 'Smart watch', path: '/smartwatches' },
  { name: 'Pc', path: '/pcs' },
  { name: 'Tv and multimedia', path: '/tvs' },
  { name: 'Game console', path: '/consoles' },
  { name: 'Kids', path: '/kids' },
  { name: 'Sale', path: '/sale' },
];

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

  const currentBreadcrumbRoute = breadcrumbRoutes.find(
    (el) => el.path === path,
  );

  if (currentBreadcrumbRoute) {
    breadcrumbItems.push({
      title: currentBreadcrumbRoute.name,
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
