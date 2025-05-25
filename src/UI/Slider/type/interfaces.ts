import { IProductCard, TProductImageCard } from "@/interfaces/interfaces";
import React, { ReactElement, ReactNode } from "react";
import { Swiper, SwiperModule } from "swiper/types";

export interface SliderBaseProps {
  children: ReactNode; 
  className?: string,
  spaceBetween?: number;
  slidesPerView?: number;
  navigation?: boolean;
  pagination?: boolean | { clickable: boolean };
  nextArrow?: ReactElement;
  prevArrow?: ReactElement;
  thumbs?: {
    swiper: Swiper | null;
  };
  modules?: SwiperModule[];
  onSwiper?: React.Dispatch<React.SetStateAction<Swiper | null>>;
  freeMode?: boolean;
  watchSlidesProgress?: boolean;
  onSlideChange?: (swiper: Swiper) => void;
}

export interface ArrowProps {
  classNameArrow: string;
  children: React.ReactNode;
}

export interface CustomArrowsProps {
  prevButtonRef: React.RefObject<HTMLDivElement>;
  nextButtonRef: React.RefObject<HTMLDivElement>;
  prevArrow?: React.ReactNode;
  nextArrow?: React.ReactNode;
}

export interface ICurrentSlide {
  id: number;
  img: string;
}

export interface SliderThumbsProps {
  data: TProductImageCard[];
  prevArrow?: ReactElement;
  nextArrow?: ReactElement;
  currentSlide?: ICurrentSlide;
  classNameThumb?: string;
  spaceBetween?: number;
  classNameMain?: string;
  isMobile?: boolean;
  slidesPerView?: number | { [key: string]: number };
  onSlideChange?: (realIndex: number) => void;
}

export interface SliderThumbsAndModalProps extends SliderThumbsProps {
  dinamicCurrentProduct: IProductCard,
  isMobile?: boolean,
  className?: string
}

export interface SlideInfo {
  id: number;
  img: string;
}