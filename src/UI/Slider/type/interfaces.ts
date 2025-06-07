import { IProductCard, TProductImageCard } from "@/interfaces/interfaces";
import React, { ReactElement, ReactNode } from "react";
import { SwiperProps } from "swiper/react";
import { Swiper, SwiperModule, SwiperOptions } from "swiper/types";

export interface SliderBaseProps extends SwiperProps {
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
  breakpoints?: SwiperOptions['breakpoints'];
}

export interface ArrowProps {
  classNameArrow: string | string[]
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
  slidesPerView?: number;
  onSlideChange?: (realIndex: number) => void;
  breakpointsThumbs?: Record<string, { slidesPerView: number }>;
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