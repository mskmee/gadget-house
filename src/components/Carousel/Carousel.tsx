import React, { useState, ReactNode, useEffect } from 'react';
import styles from './carousel.module.scss';
import classNames from 'classnames';

interface CustomCarouselProps {
  classname: string;
  children: ReactNode[];
  gap?: number;
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({
  classname,
  children,
}) => {
  const responsiveSettings = [
    {
      breakpoint: 450,
      slidesToShow: classname === 'brands-carousel' ? 3 : 2,
      gap: 8,
      itemWidth: classname === 'brands-carousel' ? 100 : 175,
    },
    {
      breakpoint: 568,
      slidesToShow: classname === 'brands-carousel' ? 3 : 2,
      gap: 10,
      itemWidth: classname === 'brands-carousel' ? 150 : 200,
    },
    {
      breakpoint: 850,
      slidesToShow: classname === 'brands-carousel' ? 3 : 2,
      gap: 10,
      itemWidth: classname === 'brands-carousel' ? 180 : 250,
    },
    {
      breakpoint: 1024,
      slidesToShow: classname === 'brands-carousel' ? 4 : 3,
      gap: 20,
      itemWidth: classname === 'brands-carousel' ? 180 : 250,
    },
    {
      breakpoint: 1440,
      slidesToShow: classname === 'brands-carousel' ? 4 : 3,
      gap: 30,
      itemWidth: classname === 'brands-carousel' ? 250 : 305,
    },
    {
      breakpoint: Infinity,
      slidesToShow: classname === 'brands-carousel' ? 5 : 4,
      gap: 40,
      itemWidth: classname === 'brands-carousel' ? 250 : 305,
    }, // Default for large screens
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [animation, setAnimation] = useState(true);
  const [responsiveSlide, setResponsiveSlide] = useState(getSlidesToShow);

  const itemWidth = responsiveSlide.itemWidth;
  const totalItems = children.length;
  const maxIndex = totalItems - responsiveSlide.count;

  function getSlidesToShow() {
    const screenWidth = window.innerWidth;
    const matchedSetting = responsiveSettings.find(
      (setting) => screenWidth < setting.breakpoint,
    );
    return matchedSetting
      ? {
          count: matchedSetting.slidesToShow,
          gap: matchedSetting.gap,
          itemWidth: matchedSetting.itemWidth,
        }
      : {
          count: 4,
          gap: 40,
          itemWidth: classname === 'brands-carousel' ? 250 : 305,
        };
  }

  useEffect(() => {
    const handleResize = () => setResponsiveSlide(getSlidesToShow());
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setAnimation(true);
      setCurrentIndex(currentIndex + 1);
      setCurrentTranslate(
        -(currentIndex + 1) * (itemWidth + responsiveSlide.gap),
      );
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setAnimation(true);
      setCurrentIndex(currentIndex - 1);
      setCurrentTranslate(
        -(currentIndex - 1) * (itemWidth + responsiveSlide.gap),
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
        -currentIndex * (itemWidth + responsiveSlide.gap) + diff,
      );
    }
  };

  const handleTouchEnd = () => {
    if (startX !== null) {
      const distanceMoved =
        -currentTranslate - currentIndex * (itemWidth + responsiveSlide.gap);

      if (distanceMoved > 50 && currentIndex < maxIndex) {
        setCurrentIndex(currentIndex + 1);
      } else if (distanceMoved < -50 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }

      setAnimation(true);
      setCurrentTranslate(-currentIndex * (itemWidth + responsiveSlide.gap));
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
          {children.map((child, index) => (
            <div
              key={index}
              className={styles.item}
              style={{ width: `${itemWidth}px` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>{' '}
      <div className={styles['slider-buttons']}>
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
  );
};

export default CustomCarousel;
