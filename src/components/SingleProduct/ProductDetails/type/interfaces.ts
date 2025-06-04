import { iProductMemoryCards, IProductOtherModels } from "@/interfaces/interfaces";

export interface ProductColorsProps {
  colors: {
    id: number;
    available: boolean;
    value: string;
  }[];
  selectedColor: string;
  onSelectedColor: (val: string, inStock: boolean) => void;
}

export interface ProductModelsProps {
  models: IProductOtherModels[];
  selectedModel: string | [];
  onSelectedModels: (val: string, inStock: boolean) => void;
}

export interface ProductMemoryProps {
  memories: iProductMemoryCards[];
  selectedMemory: string | [],
  onSelectedMemory: (val: string, inStock: boolean) => void;
}