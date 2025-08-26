import { Category } from '@/enums/category';
import { AppRoute } from '@/enums/Route';

export interface CategoryInfo {
  id: number;
  name: string;
  path: string;
  displayName: string;
  route: string;
}

export class CategoryService {
  private static categoryMap = new Map<number, CategoryInfo>([
    [
      Category.SMARTPHONE,
      {
        id: Category.SMARTPHONE,
        name: 'Smartphone',
        path: 'smartphone',
        displayName: 'Smartphones',
        route: AppRoute.SMARTPHONES,
      },
    ],
    [
      Category.LAPTOP,
      {
        id: Category.LAPTOP,
        name: 'Laptop',
        path: 'laptop',
        displayName: 'Laptops',
        route: AppRoute.LAPTOPS,
      },
    ],
    [
      Category.PHOTO_AND_VIDEO,
      {
        id: Category.PHOTO_AND_VIDEO,
        name: 'Photo and Video',
        path: 'photo-and-video',
        displayName: 'Photo and Video',
        route: AppRoute.PHOTO_VIDEO,
      },
    ],
    [
      Category.AUDIO,
      {
        id: Category.AUDIO,
        name: 'Audio',
        path: 'audio',
        displayName: 'Audio',
        route: AppRoute.AUDIO,
      },
    ],
    [
      Category.TABLET,
      {
        id: Category.TABLET,
        name: 'Tablet',
        path: 'tablet',
        displayName: 'Tablets',
        route: AppRoute.TABLET,
      },
    ],
    [
      Category.SMARTWATCHE,
      {
        id: Category.SMARTWATCHE,
        name: 'Smartwatch',
        path: 'smartwatche',
        displayName: 'Smartwatches',
        route: AppRoute.WATCH,
      },
    ],
    [
      Category.PC,
      {
        id: Category.PC,
        name: 'PC',
        path: 'pc',
        displayName: 'PCs',
        route: AppRoute.PC,
      },
    ],
    [
      Category.TV,
      {
        id: Category.TV,
        name: 'TV',
        path: 'tv',
        displayName: 'TVs',
        route: AppRoute.TV,
      },
    ],
    [
      Category.CONSOLES,
      {
        id: Category.CONSOLES,
        name: 'Consoles',
        path: 'consoles',
        displayName: 'Game Consoles',
        route: AppRoute.GAME_CONSOLE,
      },
    ],
    [
      Category.KIDS,
      {
        id: Category.KIDS,
        name: 'Kids',
        path: 'kids',
        displayName: 'Kids',
        route: AppRoute.KIDS,
      },
    ],
  ]);

  static getCategoryById(id: number): CategoryInfo | null {
    return this.categoryMap.get(id) || null;
  }

  static getCategoryPath(categoryId: number | undefined): string {
    if (!categoryId) return 'all-products';
    const category = this.getCategoryById(categoryId);
    return category?.path || 'all-products';
  }

  static getProductUrl(
    productId: number,
    categoryId: number | undefined,
    href?: string,
  ): string {
    const categoryPath = this.getCategoryPath(categoryId);
    const productSlug = href || productId.toString();
    return `/${categoryPath}/${productId}/${productSlug}`;
  }

  static normalizeProduct(product: any) {
    const categoryId =
      product.categoryId ||
      product.categoryResponseDto?.id ||
      Category.ALL_PRODUCTS;
    const categoryInfo = this.getCategoryById(categoryId);

    return {
      ...product,
      categoryId,
      category: categoryInfo?.name || 'All Products',
      categoryPath: categoryInfo?.path || 'all-products',
      productUrl: this.getProductUrl(product.id, categoryId, product.href),
    };
  }
}
