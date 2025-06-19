import { iProductMemoryCards, IProductOtherModels } from "@/interfaces/interfaces";

export interface ProductColorsProps {
  colors: {
    productId: number;
    available: boolean;
    attributeValue: string;
    href: string;
    categoryId: number;
  }[];
  selectedColor: string;
}

export interface ProductModelsProps {
  models: IProductOtherModels[];
  selectedModel: string;
}

export interface ProductMemoryProps {
  memories: iProductMemoryCards[];
  selectedMemory: string,
}