import type { StatusSearch } from '@/types/StatusSearch';
import type { ButtonHTMLAttributes, CSSProperties, MouseEvent } from 'react';

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

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  clickImg: string;
  hoverImg: string;
}

export interface StatusButtonProps {
  width: string;
  height: string;
  color: string;
  style?: CSSProperties;
}

export interface ICard {
  id: number;
  title: string;
  img: string;
  rate: number;
  price: string;
  code: string;
}

export interface IAccessory extends ICard {
  anotherColors: string[];
  isLiked: boolean;
  isSmartphoneCard?: boolean;
}

export type IBrandCard = {
  id: number;
  img: string;
};

export interface IProduct {
  id: number;
  price: number;
  category: string;
  title: string;
  img: string[];
  basketIcon: string,
  anotherColors: string[];
  isLiked: boolean;
  rate: number;
  popular: number;
  brand: string;
  ram: number;
  builtInMemory: number;
  code: string;
  cameraMP: number;
  options?: Record<string, string[]> | undefined,
}

export interface IFilterProps {
  filters: {
    brands: string[];
    builtInMemory: string[];
    rams: string[];
    colors: string[];
    cores: string[];
    screens: string[];
  }
  drawerVisible: boolean;
  toggleDrawer: () => void;
  onFilter: (
    products: IProduct[],
  ) => void;
}

export interface IOption {
  data: string[],
  title: string,
  option: string,
  btnMore: boolean,
  optionChange: (option: string, value: string) => void,
}

export enum SortOrder {
  Popularity = 'Popularity',
  Rating = 'Rating',
  LowToHigh = 'From Low to High Cost',
  HighToLow = 'From High to Low Cost',
}

export interface ISortProps {
  sortVisible: boolean;
  toggleSort: () => void;
  onSort: (
    sortOrder: SortOrder,
  ) => void;
}

export interface SortDrawerProps {
  onSort: (sortOrder: SortOrder) => void;
}

export interface ISortOptionProps {
  label: string;
  value: SortOrder;
  isSelected: boolean;
  classNames: string;
  onSelect: (value: SortOrder) => void;
}
