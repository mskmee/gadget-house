import type { StatusSearch } from '@/types/StatusSearch';
import type { ComponentType, CSSProperties, MouseEvent } from 'react';

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

export interface IProductCard {
  id: number;
  title: string;
  href?: string;
  img: string;
  rate: number;
  price: string;
  code: string;
  anotherColors: string[];
  isLiked: boolean;
  isSmartphoneCard?: boolean;
}

export interface IShoppingCard extends IProductCard {
  quantity: number;
}

export type IBrandCard = {
  id: number;
  img: string;
};
