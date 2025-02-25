import React, { useState, useEffect } from 'react';
import styles from './carousel.module.scss';
import classNames from 'classnames';
import { BrandCard, MyCard } from '../components';
import {
  brandData,
  laptopData,
  smartphoneData,
  previouslyReviewedData,
} from '@/constants/productCards';
import { useMediaQuery } from 'react-responsive';
import { useResponsiveCarouselSettings } from '@/hooks/useResponsiveCarouselSettings';
import { ProductImageCard } from '@/interfaces/interfaces';

type CarouselClassname =
  | 'brands-carousel'
  | 'laptop-carousel'
  | 'smartphone-carousel'
  | 'viewed-carousel'
  | 'basket-popup-carousel'
  | 'photos-carousel';

interface CustomCarouselProps {
  classname: CarouselClassname;
  productImageCards?: ProductImageCard[];
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({
  classname,
  productImageCards,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [animation, setAnimation] = useState(true);

  const isLargerThan1440px = useMediaQuery({
    query: '(max-width: 1440px)',
  });

  const responsiveCarouselSettings = useResponsiveCarouselSettings(
    classname,
    (productImageCards?.length ?? 0) > 4 ? 4 : (productImageCards?.length ?? 0),
  );

  const itemWidth = isLargerThan1440px
    ? responsiveCarouselSettings.itemWidth
    : classname === 'brands-carousel'
      ? 256
      : 305;
  const totalItems =
    classname === 'brands-carousel'
      ? 10
      : classname === 'photos-carousel'
        ? productImageCards?.length
        : classname === 'basket-popup-carousel'
          ? 9
          : 8;
  const maxIndex = (totalItems ?? 0) - responsiveCarouselSettings.count;

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setAnimation(true);
      setCurrentIndex(currentIndex + 1);
      setCurrentTranslate(
        -(currentIndex + 1) * (itemWidth + responsiveCarouselSettings.gap),
      );
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setAnimation(true);
      setCurrentIndex(currentIndex - 1);
      setCurrentTranslate(
        -(currentIndex - 1) * (itemWidth + responsiveCarouselSettings.gap),
      );
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setAnimation(false);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX !== null) {
      const diff = e.touches[0].clientX - startX;
      setCurrentTranslate(
        -currentIndex * (itemWidth + responsiveCarouselSettings.gap) + diff,
      );
    }
  };

  const handleTouchEnd = () => {
    if (startX !== null) {
      const distanceMoved =
        -currentTranslate -
        currentIndex * (itemWidth + responsiveCarouselSettings.gap);

      if (distanceMoved > 50 && currentIndex < maxIndex) {
        setCurrentIndex(currentIndex + 1);
      } else if (distanceMoved < -50 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }

      setAnimation(true);
      setCurrentTranslate(
        -currentIndex * (itemWidth + responsiveCarouselSettings.gap),
      );
      setStartX(null);
    }
  };
  useEffect(() => {
    const rateComponent = document.querySelectorAll('.reviews_rate-stars');
    const rateComponentDivs = document.querySelectorAll('.ant-rate-star div');
    if (rateComponent) {
      rateComponent.forEach((el) => {
        el.setAttribute('tabindex', '-1');
      });
    }
    if (rateComponentDivs) {
      rateComponentDivs.forEach((el) => {
        el.setAttribute('tabindex', '-1');
      });
    }
  }, []);

  return (
    <div className={classNames(styles.carousel, styles[classname])}>
      <div
        className={styles.trackContainer}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={styles.track}
          style={{
            transform: `translate3d(${currentTranslate}px, 0, 0)`,
            transition: animation ? 'transform 0.4s ease-in-out' : 'none',
          }}
        >
          {Array.from(
            {
              length:
                classname === 'brands-carousel'
                  ? 10
                  : classname === 'photos-carousel'
                    ? 1
                    : 8,
            },
            (_, i) => (
              <div key={crypto.randomUUID()}>
                {classname === 'brands-carousel' ? (
                  <BrandCard
                    width={itemWidth}
                    key={crypto.randomUUID()}
                    product={brandData[i % brandData.length]}
                  />
                ) : classname === 'photos-carousel' ? (
                  productImageCards?.map((productImageCard) => (
                    <img
                      style={{ minWidth: `${itemWidth}px` }}
                      key={crypto.randomUUID()}
                      className="product-photo"
                      src={productImageCard.link}
                      alt="product's photos"
                    />
                  ))
                ) : (
                  <MyCard
                    width={itemWidth}
                    key={crypto.randomUUID()}
                    product={
                      classname === 'laptop-carousel'
                        ? laptopData[i % laptopData.length]
                        : classname === 'smartphone-carousel'
                          ? smartphoneData[i % smartphoneData.length]
                          : previouslyReviewedData[
                              i % previouslyReviewedData.length
                            ]
                    }
                    classname={
                      classname === 'laptop-carousel'
                        ? 'laptops'
                        : classname === 'smartphone-carousel'
                          ? 'smartphones'
                          : 'previously-reviewed'
                    }
                  />
                )}
              </div>
            ),
          )}
        </div>

        <div className={classNames(styles['slider-buttons'])}>
          <button
            className={classNames(styles['btn-arrow-prev'], {
              [styles['btn-arrow-prev-disabled']]: currentIndex === 0,
            })}
            disabled={currentIndex === 0}
            onClick={handlePrev}
          >
            <svg
              width="9"
              height="16"
              viewBox="0 0 9 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.00016 1.33331L1.3335 7.99998L8.00016 14.6666"
                stroke="#00820D"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className={classNames(styles['btn-arrow-next'], {
              [styles['btn-arrow-next-disabled']]: currentIndex === maxIndex,
            })}
            disabled={currentIndex === maxIndex}
            onClick={handleNext}
          >
            <svg
              width="9"
              height="16"
              viewBox="0 0 9 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.3335 1.33331L8.00016 7.99998L1.3335 14.6666"
                stroke="#00820D"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomCarousel;
