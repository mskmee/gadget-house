import Benefits from '../../components/benefitsList/benefits';
import Footer from '../../components/footer/footer';
import BrandCard from '../../components/Card/BrandCard';
import ProductCard from '../../components/Card/Card';
import LaptopCard from '../../components/Card/LaptopCard';
import Carousels from '../../components/Carousel/Carousel';
import SliderNav from '../../components/SliderNav/SliderNav';
import Header from '../../components/Header/Header';
import Banner from '../../components/Banner/Banner';

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
      <Carousels children={<ProductCard />} />

      <Carousels
        children={<BrandCard />}
        className="brandsCarousel"
        responsive={brandConatinerResponsiveSettings}
      />

      <SliderNav text="Laptop" link="/laptops" />
      <Carousels children={<LaptopCard />} />

      <SliderNav text="Previously reviewed offers" link="/viewed" />
      <Carousels children={<ProductCard />} />
      <Benefits />
      <Footer />
    </div>
  );
}
