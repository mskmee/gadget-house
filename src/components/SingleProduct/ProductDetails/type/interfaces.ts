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
  onSelectedColor: (val: string) => void;
}

export interface ProductModelsProps {
  models: IProductOtherModels[];
  selectedModel: string;
  onSelectedModels: (val: string) => void;
}

export interface ProductMemoryProps {
  memories: iProductMemoryCards[];
  selectedMemory: string,
  onSelectedMemory: (val: string) => void;
}