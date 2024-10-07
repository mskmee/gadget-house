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
  likeIcon: string;
  likeIconClick: string;
  colorPalette?: string;
  rate: number;
  price: string;
  code: string;
}

export interface IAccessory extends ICard {
  anotherColors: string[];
  isLiked: boolean;
}
