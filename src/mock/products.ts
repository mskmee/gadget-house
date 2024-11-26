import { filters } from "@/components/Filters/consts";
import { IGadget } from "@/interfaces/interfaces";



export function generateGadgets(count: number): IGadget[] {
  const { categories, brands, colorsHex, images } = filters

  const gadgets: IGadget[] = [];

  for (let i = 0; i < count; i++) {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomBrand = brands[Math.floor(Math.random() * brands.length)];

    const randomColorSet = Array.from(
      new Set(
        Array.from({ length: Math.floor(Math.random() * colorsHex.length) + 1 }, () =>
          colorsHex[Math.floor(Math.random() * colorsHex.length)]
        )
      )
    ).slice(0, 4);


    const newGadget: IGadget = {
      id: i + 1,
      title: `${randomBrand} ${randomCategory} Model ${Math.floor(Math.random() * 1000)}`,
      price: parseFloat((Math.random() * 99990 + 10).toFixed(2)), // price between 100 and 1100
      category: randomCategory,
      isLiked: Math.random() > 0.5,
      brand: randomBrand,
      rate: parseFloat((Math.random() * 5).toFixed(1)), // rating between 0 and 5
      isPopular: Math.random() * 10, // isPopular between 0 and 10
      anotherColors: randomColorSet, // Select 3 random colors
      ram: Math.pow(2, Math.floor(Math.random() * 5) + 1), // RAM between 2GB and 32GB
      builtInMemory: [32, 64, 128, 256, 512][Math.floor(Math.random() * 5)], // Select from predefined options
      cameraMP: Math.floor(Math.random() * 192) + 8, // Camera MP between 8 and 200
      img: images[Math.floor(Math.random() * images.length)], // Select from predefined options
      code: Math.floor(Math.random() * 1000000).toString(), // Generate a random 6-digit code
    };

    gadgets.push(newGadget);
  }

  return gadgets;
}