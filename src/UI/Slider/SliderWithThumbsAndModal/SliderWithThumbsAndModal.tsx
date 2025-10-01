import { useState, useEffect, useRef } from 'react';
import { FreeMode, Navigation, Thumbs, Pagination } from 'swiper/modules';
import { SlideInfo, SliderThumbsAndModalProps } from '../type/interfaces';
import { Swiper } from 'swiper/types';
import { PhotoModal } from '@/components/SingleProduct/PhotoModal';
import SliderBase from '../SliderBase/SliderBase';
import classNames from 'classnames';

function SliderWithThumbsAndModal({
  data,
  prevArrow,
  nextArrow,
  dynamicCurrentProduct,
  isMobile,
  className,
}: SliderThumbsAndModalProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<Swiper | null>(null);
  const [mainSwiper, setMainSwiper] = useState<Swiper | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState<SlideInfo>({
    id: 1,
    img: data[0]?.link || '',
  });
  const [modalImageSrc, setModalImageSrc] = useState<string | null>(null);

  const previousProductId = useRef(dynamicCurrentProduct?.id);

  useEffect(() => {
    const productChanged =
      previousProductId.current !== dynamicCurrentProduct?.id;

    if (productChanged) {
      previousProductId.current = dynamicCurrentProduct?.id;
      setCurrentSlide({
        id: 1,
        img: data[0]?.link || '',
      });
      setIsModalVisible(false);
      setModalImageSrc(null);

      if (mainSwiper) {
        mainSwiper.slideTo(0, 0);
      }
      if (thumbsSwiper) {
        thumbsSwiper.slideTo(0, 0);
      }
    }
  }, [dynamicCurrentProduct?.id, data, mainSwiper, thumbsSwiper]);

  function handleMainImageClick(index: number) {
    setCurrentSlide({
      id: index + 1,
      img: data?.[index]?.link || '',
    });
    setModalImageSrc(data[index].link);
    setIsModalVisible(true);
  }

  return (
    <>
      <SliderBase
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
        className={classNames('mainSlider', className)}
        pagination={isMobile ? true : false}
        prevArrow={prevArrow}
        nextArrow={nextArrow}
        onSwiper={setMainSwiper}
      >
        {data.map((image, index) => (
          <div
            onClick={() => handleMainImageClick(index)}
            style={{ cursor: 'pointer' }}
            key={index}
          >
            <img src={image.link} alt={`main-slide-${index}`} />
          </div>
        ))}
      </SliderBase>

      {!isMobile && (
        <SliderBase
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="thumb-wrapper"
        >
          {data.map((image, index) => (
            <div
              style={{ cursor: 'pointer' }}
              key={index}
              className="thumb__item"
            >
              <img src={image.link} alt={`main-slide-${index}`} />
            </div>
          ))}
        </SliderBase>
      )}

      {isModalVisible && (
        <PhotoModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          modalImageSrc={modalImageSrc}
          setModalImageSrc={setModalImageSrc}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          dynamicCurrentProduct={dynamicCurrentProduct}
        />
      )}
    </>
  );
}

export default SliderWithThumbsAndModal;
