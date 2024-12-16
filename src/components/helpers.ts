import { AppRoute } from '@/enums/Route.ts';
import { laptopData, smartphoneData } from '@/components/Card/constants.ts';

type BreadcumbItem = {
  title: string | undefined,
  href: string,
};

export const getBreadcrumbItems = (
  path: string,
  params: { smartphone?: string; id?: string }
): BreadcumbItem[] => {
  const { smartphone, id } = params;
  const allProducts = [...smartphoneData, ...laptopData];
  const currentProduct = allProducts.find((el) => id && el.id === +id);

  let breadcrumbItems = [
    {
      title: 'Homepage',
      href: `${AppRoute?.ROOT}`,
    },
    {
      title: smartphone?.[0].toUpperCase().concat(smartphone?.slice(1)),
      href: '#',
    },
    {
      title: currentProduct?.title[0]
        .toUpperCase()
        .concat(currentProduct.title.slice(1)),
      href: '#',
    },
  ];

  if (path === '/basket') {
    breadcrumbItems = [
      {
        title: 'Homepage',
        href: `${AppRoute?.ROOT}`,
      },
      {
        title: 'Basket',
        href: '#',
      },
    ];
  }

  return breadcrumbItems;
}