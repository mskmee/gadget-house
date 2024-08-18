import {
  Banner,
  Header,
  SliderNav,
  Carousels,
  ProductCard,
  LaptopCard,
  BrandCard,
  Footer,
  Benefits,
} from '@/components/components';

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
    <div>
      <Header />
      <Banner />
      <SliderNav text="Smartphone" link="/smartphones" />
      <Carousels>
        <ProductCard />
      </Carousels>

      <Carousels
        className="brandsCarousel"
        responsive={brandConatinerResponsiveSettings}
      >
        <BrandCard />
      </Carousels>

      <SliderNav text="Laptop" link="/laptops" />
      <Carousels>
        <LaptopCard />
      </Carousels>

      <SliderNav text="Previously reviewed offers" link="/viewed" />
      <Carousels>
        <ProductCard />
      </Carousels>
      <Benefits />
      <Footer />
    </div>
  );
}
