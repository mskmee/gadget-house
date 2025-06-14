import { ArrowNext, ArrowPrev } from "../SliderArrows/SliderArrow";
import { CustomArrowsProps } from "../type/interfaces";

function SliderCustomArrows({ prevButtonRef, nextButtonRef, prevArrow, nextArrow }: CustomArrowsProps) {
  return (
    <>
      <div className="swiper-button-prev" ref={prevButtonRef}>
        {prevArrow || <ArrowPrev classNameArrow="arrow-left"><span>←</span></ArrowPrev>}
      </div>
      <div className="swiper-button-next" ref={nextButtonRef}>
        {nextArrow || <ArrowNext classNameArrow="arrow-right"><span>→</span></ArrowNext>}
      </div>
    </>
  );
}

export default SliderCustomArrows;