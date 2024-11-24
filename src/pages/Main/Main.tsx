import { useEffect } from 'react';
import Benefits from '@/components/benefitsList/benefits';
import { BrandCard } from '@/components/Card/BrandCard';
import Carousels from '@/components/Carousel/Carousel';
import { SliderNav } from '@/components/SliderNav/SliderNav';
import { MyCard } from '@/components/Card/MyCard';
import {
  smartphoneData,
  laptopData,
  brandData,
  previouslyReviewedData,
} from '@/components/Card/constants';
import { MainIntro } from '@/components/MainIntro';
import { useTypedSelector, useActions } from '@/hooks/hooks';
import { DataStatus } from '@/enums/enums';

const brandConatinerResponsiveSettings = [
  {
    breakpoint: 2220,
    settings: {
      slidesToShow: 6,
      slidesToScroll: 1,
    },
  },
  {
    breakpoint: 1700,
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
];

export default function Main() {
  const { getAllProducts } = useActions();
  const isProductsLoading = useTypedSelector(
    (state) => state.products.dataStatus === DataStatus.PENDING,
  );

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  return (
    <>
      <button onClick={getAllProducts}>Press me</button>
      <MainIntro />
      {isProductsLoading ? (
        // it's a place holder. Add loader or skeleton here
        <div style={{ textAlign: 'center', flex: 1 }}>Loading...</div>
      ) : (
        <>
          <SliderNav text="Smartphone" link="/smartphones" />
          <Carousels
            classname="mobile-carousel"
            sliderClassName="mobile-slider"
            countSlideToShow={5}
          >
            {Array.from({ length: 8 }, (_, i) => (
              <MyCard
                key={`smartphone-${i}`}
                product={smartphoneData[i % smartphoneData.length]}
                classname="smartphone"
              />
            ))}
          </Carousels>

          <Carousels
            classname="brands-carousel"
            sliderClassName="brands-slider"
            countSlideToShow={5}
            responsive={brandConatinerResponsiveSettings}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <BrandCard
                key={`brand-${i}`}
                product={brandData[i % brandData.length]}
              />
            ))}
          </Carousels>

          <SliderNav text="Laptop" link="/laptops" />
          <Carousels
            classname="laptop-carousel"
            sliderClassName="laptop-slider"
            countSlideToShow={5}
          >
            {Array.from({ length: 8 }, (_, i) => (
              <MyCard
                key={`laptop-${i}`}
                product={laptopData[i % laptopData.length]}
                classname="laptop"
              />
            ))}
          </Carousels>

          <SliderNav text="Previously reviewed offers" link="/viewed" />
          <Carousels
            classname="viewed-carousel"
            sliderClassName="viewed-slider"
            countSlideToShow={5}
          >
            {Array.from(Array(8), (_, i) => (
              <MyCard
                key={`reviewed-${i}`}
                product={
                  previouslyReviewedData[i % previouslyReviewedData.length]
                }
                classname="previously-reviewed"
                index={i}
              ></MyCard>
            ))}
          </Carousels>
        </>
      )}

      <Benefits />
    </>
  );
}
