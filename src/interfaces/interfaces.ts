import type {
  ComponentType,
  CSSProperties,
  MouseEvent,
  ReactElement,
} from 'react';
import type { StatusSearch } from '@/types/StatusSearch';

export interface SliderButtonProps {
  handlePrevClick: (event: MouseEvent) => void;
  handleNextClick: (event: MouseEvent) => void;
  isFirstSlick: boolean;
  isLastSlick: boolean;
}

export interface SearchFieldProps {
  status: StatusSearch;
  onHover: (
    status: StatusSearch | ((prev: StatusSearch) => StatusSearch),
  ) => void;
}

export interface IButton {
  id: string;
  img: ComponentType;
  href: string;
}

export interface StatusButtonProps {
  width: string;
  height: string;
  color: string;
  style?: CSSProperties;
}

export type TProductImageCard = {
  link: string;
  order: number;
};

export interface IProductOtherModels {
  id: number,
  model: string;
}

export interface iProductMemoryCards {
  id: number;
  memory: string;
}
export interface IProductCard {
  id: number;
  name: string;
  href?: string;
  images: TProductImageCard[];
  rating: number;
  price: string;
  code?: string;
  anotherColors?: string[];
  isLiked?: boolean;
  category?: string;
  available?: boolean;
  otherModels?: IProductOtherModels[],
  memoryCards?: iProductMemoryCards[],
  categoryId?: number
}

export interface IShoppingCard extends IProductCard {
  quantity: number;
  totalPrice: number;
}

export type IBrandCard = {
  id: number;
  img: string;
};

export interface IProduct {
  id: number;
  price: number;
  category: string;
  name: string;
  img: string[];
  basketIcon: (props: { color?: string }) => ReactElement;
  anotherColors: string[];
  isLiked: boolean;
  rate: number;
  popular?: number;
  brand: string;
  ram: number;
  builtInMemory: number;
  code: string;
  cameraMP: number;
  options?: Record<string, string[]> | undefined;
}

export interface IFilterProps {
  filters: {
    brands: string[];
    builtInMemory: string[];
    rams: string[];
    colors: string[];
    cores: string[];
    screens: string[];
  };
  drawerVisible: boolean;
  toggleDrawer: () => void;
  onFilter: (products: IProduct[]) => void;
}

export interface IOption {
  options: string[];
  title: string;
  filterKey: string;
  selectedOptions: Record<string, string[]>;
  onOptionChange: (filterKey: string, checkedValues: string[]) => void;
}

export interface ISortProps {
  sortVisible: boolean;
  toggleSort: () => void;
  onSort: (sortOrder: string) => void;
}

export interface SortDrawerProps {
  onSort: (sortOrder: string) => void;
}

export interface ISortOptionProps {
  name: string;
  value: string;
  isSelected: boolean;
  classNames: string;
  onSelect: (value: string) => void;
}

export interface IGadget {
  id: number;
  title: string;
  price: number;
  category: string;
  isLiked: boolean;
  brand: string;
  rate: number;
  isPopular: number;
  anotherColors: string[];
  ram: number;
  builtInMemory: number;
  cameraMP: number;
  img: string;
  code: string;
}
