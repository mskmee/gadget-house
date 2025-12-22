import React, { useState, useEffect } from 'react';
import styles from './carousel.module.scss';
import classNames from 'classnames';
import { BrandCard, MyCard } from '../components';
import { brandData } from '@/constants/productCards';
import { useResponsiveCarouselSettings } from '@/hooks/useResponsiveCarouselSettings';
import { IProductCard, TProductImageCard } from '@/interfaces/interfaces';
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
  productImageCards?: TProductImageCard[];
}

const classMap: Record<CarouselClassname, string> = {
  'laptop-carousel': 'laptops',
  'smartphone-carousel': 'smartphones',
  'basket-popup-carousel': 'basket-popup',
  'viewed-carousel': 'previously-reviewed',
  'brands-carousel': '',
  'photos-carousel': '',
};

const CustomCarousel: React.FC<CustomCarouselProps> = ({
  classname,
  productImageCards,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [animation, setAnimation] = useState(true);
  const [isTouchViewport, setIsTouchViewport] = useState(false);

  const [randomizedProducts, setRandomizedProducts] = useState<{
    smartphones: IProductCard[];
    laptops: IProductCard[];
    otherProducts: IProductCard[];
  }>({ smartphones: [], laptops: [], otherProducts: [] });

  const [previouslyReviewed] = useLocalStorage<IProductCard[]>(
    'previouslyReviewed',
    [],
  );

  const responsiveCarouselSettings = useResponsiveCarouselSettings(
    classname,
    (productImageCards?.length ?? 0) > 4 ? 4 : (productImageCards?.length ?? 0),
  );

  const products = useTypedSelector(
    (state) => state.products.productsData?.page,
  );

  const getRandomItems = (
    items: IProductCard[],
    count: number = 8,
  ): IProductCard[] => {
    if (!items || items.length === 0) return [];
    if (items.length <= count) return items;

    const shuffled = [...items].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    if (!products || products.length === 0) {
      setRandomizedProducts({
        smartphones: [],
        laptops: [],
        otherProducts: [],
      });
      return;
    }

    const smartphonesList = products.filter((item) => item.categoryId === 1);
    const laptopsList = products.filter((item) => item.categoryId === 2);
    const otherProductsList = products.slice(0, 8);

    setRandomizedProducts({
      smartphones: getRandomItems(smartphonesList, 8),
      laptops: getRandomItems(laptopsList, 8),
      otherProducts: otherProductsList,
    });
  }, [products]);

  useEffect(() => {
    const checkViewport = () => {
      if (typeof window !== 'undefined') {
        setIsTouchViewport(window.innerWidth <= 768);
      }
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  const itemWidth = responsiveCarouselSettings.itemWidth;

  const productMap: Record<
    CarouselClassname,
    IProductCard[] | TProductImageCard[] | typeof brandData | undefined
  > = {
    'laptop-carousel': randomizedProducts.laptops,
    'smartphone-carousel': randomizedProducts.smartphones,
    'basket-popup-carousel': randomizedProducts.otherProducts,
    'viewed-carousel': previouslyReviewed,
    'brands-carousel': brandData,
    'photos-carousel': productImageCards,
  };

  const currentProducts = productMap[classname];

  const totalItems =
    classname === 'brands-carousel'
      ? 10
      : classname === 'photos-carousel'
        ? (productImageCards?.length ?? 0)
        : Array.isArray(currentProducts)
          ? currentProducts.length
          : 0;

  const maxIndex = Math.max(0, totalItems - responsiveCarouselSettings.count);

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
    if (isTouchViewport) return; // use native scroll on mobile
    setAnimation(false);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isTouchViewport) return; // use native scroll on mobile
    if (startX !== null) {
      const currentX = e.touches[0].clientX;
      const diff = currentX - startX;
      setCurrentTranslate(
        -currentIndex * (itemWidth + responsiveCarouselSettings.gap) + diff,
      );
    }
  };

  const handleTouchEnd = () => {
    if (isTouchViewport) return; // use native scroll on mobile
    if (startX !== null) {
      const swipeDistance =
        currentTranslate +
        currentIndex * (itemWidth + responsiveCarouselSettings.gap);
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

  const getProduct = (i: number): IProductCard | undefined => {
    if (classname === 'brands-carousel' || classname === 'photos-carousel') {
      return undefined;
    }

    const products = currentProducts as IProductCard[];
    if (!products || products.length === 0) return undefined;
    return products[i % products.length];
  };

  if (
    classname !== 'brands-carousel' &&
    classname !== 'photos-carousel' &&
    (!currentProducts ||
      !Array.isArray(currentProducts) ||
      currentProducts.length === 0)
  ) {
    return null;
  }

  return (
    <div className={classNames(styles.carousel, styles[classname])}>
      <div
        className={styles.trackContainer}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: isTouchViewport ? 'auto' : 'pan-y' }}
      >
        <div
          className={styles.track}
          style={{
            transform: `translate3d(${currentTranslate}px, 0, 0)`,
            transition: animation ? 'transform 0.4s ease-in-out' : 'none',
          }}
        >
          {Array.from({ length: totalItems } as { length: number }, (_, i) => {
            if (classname === 'brands-carousel') {
              return (
                <BrandCard
                  key={`brand-${i}`}
                  width={itemWidth}
                  product={brandData[i % brandData.length]}
                />
              );
            }
            if (classname === 'photos-carousel') {
              return productImageCards?.map((productImageCard, idx) => (
                <img
                  style={{ minWidth: `${itemWidth}px` }}
                  key={`photo-${idx}-${productImageCard.link}`}
                  className="product-photo"
                  src={productImageCard.link}
                  alt="product's photos"
                />
              ));
            }
            const product = getProduct(i);
            return product ? (
              <MyCard
                key={`product-${product.id}-${i}`}
                width={itemWidth}
                tempProduct={product}
                classname={classMap[classname]}
              />
            ) : null;
          })}
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
