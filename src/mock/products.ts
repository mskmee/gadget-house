import { filters } from "@/components/Filters/consts";
import { ProductItem } from "@/utils/packages/products";

interface PaginatedResponse {
  page: ProductItem[];
  totalElements: number;
  currentPage: number;
  totalPages: number;
  minPrice: number;
  maxPrice: number;
}

function generateGadgets(count: number, category: string): ProductItem[] {
  const { brands, images } = filters

  const gadgets: ProductItem[] = [];

  for (let i = 0; i < count; i++) {
    const randomBrand = brands[Math.floor(Math.random() * brands.length)];

    const newGadget: ProductItem = {
      id: i + 1,
      name: `${category} ${randomBrand} Model ${Math.floor(Math.random() * 1000)}`,
      price: parseFloat((Math.random() * 99990 + 10).toFixed(2)), // price between 100 and 1100
      images: [images[Math.floor(Math.random() * images.length)]], // Select from predefined options
      rating: parseFloat((Math.random() * 5).toFixed(1)), // rating between 0 and 5
      available: false, //
      
    };

    gadgets.push(newGadget);
  }

  return gadgets;
}


export function generateRandomProducts(
  count: number,
  category: string,
  pageSize: number
): PaginatedResponse {
  const totalElements = count;
  const totalPages = Math.ceil(totalElements / pageSize);
  console.log('totalPages: ', totalPages);
  const currentPage = totalPages;

  // Генерируем все продукты
  const allProducts = generateGadgets(count, category);

  // Находим минимальную и максимальную цену
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


// const randomColorSet = Array.from(
    //   new Set(
    //     Array.from({ length: Math.floor(Math.random() * colorsHex.length) + 1 }, () =>
    //       colorsHex[Math.floor(Math.random() * colorsHex.length)]
    //     )
    //   )
    // ).slice(0, 4);

// category: randomCategory,
      // isLiked: Math.random() > 0.5,
      // brand: randomBrand,
      // anotherColors: randomColorSet, // Select 3 random colors
      // ram: Math.pow(2, Math.floor(Math.random() * 5) + 1), // RAM between 2GB and 32GB
      // builtInMemory: [32, 64, 128, 256, 512][Math.floor(Math.random() * 5)], // Select from predefined options
      // cameraMP: Math.floor(Math.random() * 192) + 8, // Camera MP between 8 and 200
      // code: Math.floor(Math.random() * 1000000).toString(), // Generate a random 6-digit code