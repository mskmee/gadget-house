import { Dispatch, FC, SetStateAction, useState } from 'react';
import style from './Product.module.scss';
import { Modal } from 'antd';
import { AddToBasketButton } from './AddToBasketButton';
import { convertPriceToReadable } from '@/utils/helpers/product';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useMediaQuery } from 'react-responsive';
import { IProductCard } from '@/interfaces/interfaces';
import ArrowIcon from '@/assets/single_product/ArrowIcon';
import SliderThumbs from '@/UI/Slider/SliderThumbs/SliderThumbs';
import { ArrowNext, ArrowPrev } from '@/UI/Slider/SliderArrows/SliderArrow';

interface ICurrentSlide {
  id: number;
  img: string;
}

interface iPhotoModalProps {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  modalImageSrc: string | null;
  setModalImageSrc: Dispatch<SetStateAction<string | null>>;
  currentSlide: ICurrentSlide;
  setCurrentSlide: Dispatch<SetStateAction<ICurrentSlide>>;
  dynamicCurrentProduct: IProductCard;
  forceUpdateKey?: number;
}

export const PhotoModal: FC<iPhotoModalProps> = ({
  isModalVisible,
  setIsModalVisible,
  modalImageSrc,
  setModalImageSrc,
  currentSlide,
  dynamicCurrentProduct,
}) => {
  const { currency, locale } = useTypedSelector((state) => state.shopping_card);
  const isWidth575 = useMediaQuery({ query: '(max-width: 575px)' });
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(
    currentSlide.id - 1,
  );

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setModalImageSrc(null);
  };

  const handleSlideChange = (index: number) => {
    setCurrentSlideIndex(index);
  };

  return (
    <Modal
      className="product-page-photo-modal"
      open={isModalVisible}
      footer={null}
      onCancel={handleModalCancel}
      centered
    >
      {modalImageSrc && (
        <>
          <div className={style.photoModal}>
            <div className={style.photoModal__inner}>
              <div className={style.photoModal__slideCounter}>
                {currentSlideIndex + 1} /{' '}
                {dynamicCurrentProduct?.images?.length}
              </div>
              <SliderThumbs
                data={dynamicCurrentProduct?.images}
                prevArrow={
                  <ArrowPrev classNameArrow="arrowLeft">
                    <ArrowIcon color="#1C1817" />
                  </ArrowPrev>
                }
                nextArrow={
                  <ArrowNext classNameArrow="arrowRight">
                    <ArrowIcon color="#1C1817" />
                  </ArrowNext>
                }
                currentSlide={currentSlide}
                breakpointsThumbs={{
                  575: {
                    slidesPerView: 2.5,
                  },
                  640: {
                    slidesPerView: 3.5,
                  },
                  768: {
                    slidesPerView: 4,
                  },
                  1024: {
                    slidesPerView: 6,
                  },
                }}
                slidesPerView={2.5}
                spaceBetween={24}
                isMobile={isWidth575}
                classNameMain="photoModal__main"
                classNameThumb="photoModal__slider"
                onSlideChange={handleSlideChange}
              />
              <div className={style.photoModalBottom_right}>
                <span>
                  {convertPriceToReadable(
                    dynamicCurrentProduct.price,
                    currency,
                    locale,
                  )}
                </span>
                <AddToBasketButton
                  product={dynamicCurrentProduct}
                  onAddToBasket={handleModalCancel}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};
