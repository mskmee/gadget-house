import React from 'react';
import { Carousel } from 'antd';
import styles from './carousel.module.css';
import ProductCard from '../Card/Card';

const Carousels: React.FC = () => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <div className={styles.carouselContainer}>
      <Carousel
        afterChange={onChange}
        slidesToShow={5}
        slidesToScroll={1}
        autoplay={false}
        dots={false}
        initialSlide={0}
        className={styles.carousel}
        arrows={true}
        responsive={[
          {
            breakpoint: 3200, // Less than 3200px
            settings: {
              slidesToShow: 8,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 2600, // Less than 2600px
            settings: {
              slidesToShow: 7,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 2100, // Less than 2100px
            settings: {
              slidesToShow: 6,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 1550, // Less than 1440px
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 450,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
        ]}
      >
        {Array.from(Array(8), (_, i) => (
          <ProductCard key={i} />
        ))}
      </Carousel>
    </div>
  );
};

export default Carousels;
