import Carousels from '../../componets/Carousel/Carousel';
import SliderNav from '../../componets/SliderNav/SliderNav';

export default function Main() {
  return (
    <div>
      <SliderNav text="Smartphones" link="/smartphones" />
      <Carousels />
    </div>
  );
}
