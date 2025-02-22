import { filters } from '@/components/Filters/consts';
import { ProductItem } from '@/utils/packages/products';

interface PaginatedResponse {
  page: ProductItem[];
  totalElements: number;
  currentPage: number;
  totalPages: number;
  minPrice: number;
  maxPrice: number;
}

function generateGadgets(count: number, category: string): ProductItem[] {
  const { brands, images } = filters;

  const gadgets: ProductItem[] = [];

  for (let i = 0; i < count; i++) {
    const randomBrand = brands[Math.floor(Math.random() * brands.length)];

    const newGadget: ProductItem = {
      id: i + 1,
      title: `${category} ${randomBrand} Model ${Math.floor(Math.random() * 1000)}`,
      price: parseFloat((Math.random() * 99990 + 10).toFixed(2)), // price between 100 and 1100
      images: [images[Math.floor(Math.random() * images.length)]], // Select from predefined options
      rating: parseFloat((Math.random() * 5).toFixed(1)), // rating between 0 and 5
      available: false, //
      category: category,
    };

    gadgets.push(newGadget);
  }

  return gadgets;
}

export function generateRandomProducts(
  count: number,
  category: string,
  pageSize: number,
): PaginatedResponse {
  const totalElements = count;
  const totalPages = Math.ceil(totalElements / pageSize);
  const currentPage = totalPages;

  const allProducts = generateGadgets(count, category);

  const prices = allProducts.map((product) => product.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return {
    page: allProducts,
    currentPage,
    totalElements,
    totalPages,
    minPrice,
    maxPrice,
  };
}
