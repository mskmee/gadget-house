import React, { useState, useEffect } from 'react';
import styles from './carousel.module.scss';
import classNames from 'classnames';
import { BrandCard, MyCard } from '../components';
import { brandData } from '@/constants/productCards';
import { useMediaQuery } from 'react-responsive';
import { useResponsiveCarouselSettings } from '@/hooks/useResponsiveCarouselSettings';
import { IProductCard, ProductImageCard } from '@/interfaces/interfaces';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import useLocalStorage from '@/hooks/useLocalStorage';

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
  const [previouslyReviewed] = useLocalStorage<IProductCard[]>(
    'previouslyReviewed',
    [],
  );

  const isLargerThan1440px = useMediaQuery({
    query: '(max-width: 1440px)',
  });

  const responsiveCarouselSettings = useResponsiveCarouselSettings(
    classname,
    (productImageCards?.length ?? 0) > 4 ? 4 : (productImageCards?.length ?? 0),
  );

  const products = useTypedSelector(
    (state) => state.products.productsData?.page,
  );

  const smartphones = products?.filter((item) => item.id >= 1 && item.id <= 8);
  const laptops = products?.filter((item) => item.id >= 9 && item.id <= 11);
  const otherProducts = products?.filter((item) => item.id >= 12);

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
          ? 8
          : classname === 'viewed-carousel'
            ? previouslyReviewed.length
            : classname === 'laptop-carousel'
              ? laptops?.length
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
      const currentX = e.touches[0].clientX;
      const diff = currentX - startX;
      setCurrentTranslate(
        -currentIndex * (itemWidth + responsiveCarouselSettings.gap) + diff,
      );
    }
  };

  const handleTouchEnd = () => {
    if (startX !== null) {
      const swipeDistance =
        currentTranslate +
        currentIndex * (itemWidth + responsiveCarouselSettings.gap);

      // Define a minimum swipe distance threshold (e.g., 50px)
      if (swipeDistance > 50 && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
        setCurrentTranslate(
          -(currentIndex - 1) * (itemWidth + responsiveCarouselSettings.gap),
        );
      } else if (swipeDistance < -50 && currentIndex < maxIndex) {
        setCurrentIndex((prev) => prev + 1);

        setCurrentTranslate(
          -(currentIndex + 1) * (itemWidth + responsiveCarouselSettings.gap),
        );
      } else {
        // If the swipe distance is not enough, reset to the current index
        setCurrentTranslate(
          -currentIndex * (itemWidth + responsiveCarouselSettings.gap),
        );
      }

      setAnimation(true);
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
        style={{ touchAction: 'pan-y' }} // Prevent vertical scrolling
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
                    : classname === 'viewed-carousel'
                      ? previouslyReviewed.length
                      : classname === 'laptop-carousel'
                        ? laptops?.length
                        : 8,
            } as { length: number },
            (_, i) => (
              <>
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
                        ? laptops?.[
                            i % (laptops.length > 0 ? laptops.length : 1)
                          ]
                        : classname === 'smartphone-carousel'
                          ? smartphones?.[
                              i %
                                (smartphones.length > 0
                                  ? smartphones.length
                                  : 1)
                            ]
                          : classname === 'basket-popup-carousel'
                            ? otherProducts?.[
                                i %
                                  (otherProducts.length > 0
                                    ? otherProducts.length
                                    : 1)
                              ]
                            : previouslyReviewed?.[
                                i %
                                  (previouslyReviewed.length > 0
                                    ? previouslyReviewed.length
                                    : 1)
                              ]
                    }
                    classname={
                      classname === 'laptop-carousel'
                        ? 'laptops'
                        : classname === 'smartphone-carousel'
                          ? 'smartphones'
                          : classname === 'basket-popup-carousel'
                            ? 'basket-popup'
                            : 'previously-reviewed'
                    }
                  />
                )}
              </>
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
              [styles['btn-arrow-next-disabled']]:
                currentIndex === maxIndex || maxIndex < currentIndex,
            })}
            disabled={currentIndex === maxIndex || maxIndex < currentIndex}
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
