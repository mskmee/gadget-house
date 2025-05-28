import { iProductMemoryCards, IProductOtherModels } from "@/interfaces/interfaces";

export interface ProductColorsProps {
  colors: string[] | null;
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