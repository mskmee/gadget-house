import Benefits from '@/components/benefitsList/benefits';
import BrandCard from '@/components/Card/BrandCard';
import { LaptopCard } from '@/components/Card/LaptopCard';
import Carousels from '@/components/Carousel/Carousel';
import SliderNav from '@/components/SliderNav/SliderNav';
import SmartphoneCard from '@/components/Card/SmartphoneCard';
import { data, laptopData } from '@/components/Card/constants';

const brandConatinerResponsiveSettings = [
  {
    breakpoint: 3200,
    settings: {
      slidesToShow: 6,
      slidesToScroll: 1,
    },
  },
  {
    breakpoint: 1420,
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
  return (
    <>
      <SliderNav text="Smartphone" link="/smartphones" />
      <Carousels
        classname="mobile-carousel"
        sliderClassName="mobile-slider"
        countSlideToShow={4}
      >
        {Array.from(Array(8), (_, i) => (
          <div key={i}>
            <SmartphoneCard product={data[0]} classname="smartphone-carousel" />
          </div>
        ))}
      </Carousels>

      <Carousels
        classname="brands-carousel"
        sliderClassName="brands-slider"
        countSlideToShow={5}
        responsive={brandConatinerResponsiveSettings}
      >
        {Array.from(Array(9), (_, i) => (
          <div key={i}>
            <BrandCard />
          </div>
        ))}
      </Carousels>

      <SliderNav text="Laptop" link="/laptops" />
      <Carousels
        classname="laptop-carousel"
        sliderClassName="laptop-slider"
        countSlideToShow={4}
      >
        {Array.from(Array(8), (_, i) => (
          <div key={i}>
            <LaptopCard product={laptopData[0]} classname="laptop-carousel" />
          </div>
        ))}
      </Carousels>

      <SliderNav text="Previously reviewed offers" link="/viewed" />
      <Carousels
        classname="viewed-carousel"
        sliderClassName="viewed-slider"
        countSlideToShow={4}
      >
        {Array.from(Array(8), (_, i) => (
          <div key={i}>
            <SmartphoneCard
              product={data[0]}
              classname="viewed-carousel"
            ></SmartphoneCard>
          </div>
        ))}
      </Carousels>
      <Benefits />
    </>
  );
}
