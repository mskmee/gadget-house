// types
import type { StatusSearch } from '@/types/StatusSearch';
import type { ButtonHTMLAttributes } from 'react';

export interface SliderButtonProps {
  handlePrevClick: (event: React.MouseEvent) => void;
  handleNextClick: (event: React.MouseEvent) => void;
  isFirstSlick: any;
  isLastSlick: any;
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
  style?: React.CSSProperties;
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
  hasAnotherColor?: boolean | string[];
  isLiked?: boolean;
}
