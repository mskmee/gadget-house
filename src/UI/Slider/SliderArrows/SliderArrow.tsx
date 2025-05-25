import classNames from "classnames";
import { ArrowProps } from "../type/interfaces";
import styles from "./SliderArrow.module.scss"

export function ArrowPrev({ classNameArrow, children }: ArrowProps) {
  return (
    <div className={classNames(styles['swiper-button'], styles[classNameArrow])}>
      {children}
    </div>
  );
}

export function ArrowNext({ classNameArrow, children }: ArrowProps) {
  return (
    <div className={classNames(styles['swiper-button'], styles[classNameArrow])}>
      {children}
    </div>
  );
}