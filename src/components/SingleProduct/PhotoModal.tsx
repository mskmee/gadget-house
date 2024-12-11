import { Dispatch, FC, SetStateAction, useEffect, useRef } from 'react';
import style from './Product.module.scss';
import classNames from 'classnames';
import { arrowImg } from '@/assets/constants';
import { currentProduct } from '@/constants/singleProduct';
import { Modal } from 'antd';
import { AddToBasketButton } from './AddToBasketButton';
import { convertPriceToReadable } from '@/utils/helpers/product';
import { useTypedSelector } from '@/hooks/useTypedSelector';

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
}

export const PhotoModal: FC<iPhotoModalProps> = ({
  isModalVisible,
  setIsModalVisible,
  modalImageSrc,
  setModalImageSrc,
  currentSlide,
  setCurrentSlide,
}) => {
  const prevArrowRef = useRef<HTMLImageElement>(null);
  const nextArrowRef = useRef<HTMLImageElement>(null);
  const currentProductImages = currentProduct?.[0]?.images;
  const { currency, locale } = useTypedSelector((state) => state.shopping_card);

  const handlePrevClick = () => {
    if (currentSlide?.id !== 1) {
      setCurrentSlide(currentProductImages?.[currentSlide?.id - 2]);
    }
  };

  const handleNextClick = () => {
    if (currentSlide?.id !== currentProductImages?.length) {
      setCurrentSlide(currentProductImages?.[currentSlide?.id]);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setModalImageSrc(null);
  };

  const selectCurrentSlideByClick = (slideId: number) => {
    return () => {
      setCurrentSlide(currentProductImages?.[slideId - 1]);
    };
  };

  useEffect(() => {
    if (currentSlide?.id === 1 && prevArrowRef.current) {
      prevArrowRef.current.style.visibility = 'hidden';
    } else {
      if (prevArrowRef.current) {
        prevArrowRef.current.style.visibility = 'visible';
        prevArrowRef.current.style.cursor = 'pointer';
        prevArrowRef.current.style.filter = 'none';
      }
    }
    if (
      currentSlide?.id === currentProductImages?.length &&
      nextArrowRef.current
    ) {
      nextArrowRef.current.style.visibility = 'hidden';
    } else {
      if (nextArrowRef.current) {
        nextArrowRef.current.style.visibility = 'visible';
        nextArrowRef.current.style.cursor = 'pointer';
        nextArrowRef.current.style.filter = 'none';
      }
    }
  }, [currentSlide?.id, currentProductImages?.length, modalImageSrc]);

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
            <div className={style['product_custom-carousel-wrap']}>
              <div className={style['product_carousel-current-picture']}>
                <img
                  className={style['arrow-left']}
                  src={arrowImg}
                  alt="prev image arrow"
                  ref={prevArrowRef}
                  onClick={handlePrevClick}
                />
                <img
                  className={style['content-img']}
                  src={currentSlide.img}
                  alt="current product picture"
                />
                <img
                  className={style['arrow-right']}
                  src={arrowImg}
                  alt="next image arrow"
                  ref={nextArrowRef}
                  onClick={handleNextClick}
                />
                <span>
                  {currentSlide.id}/{currentProduct[0].images?.length}
                </span>
              </div>

              <div className={style['product_carousel-slicks']}>
                <ul>
                  {currentProductImages?.map((item) => (
                    <li
                      key={item?.id}
                      className={classNames({
                        [style['selected-photo']]:
                          currentSlide?.id === item?.id,
                      })}
                      onClick={selectCurrentSlideByClick(item?.id)}
                    >
                      <img src={item?.img} alt="product slick picture" />
                    </li>
                  ))}
                </ul>
                <div className={style.photoModalBottom_right}>
                  <span>
                    {convertPriceToReadable(
                      currentProduct[0].price,
                      currency,
                      locale,
                    )}
                  </span>
                  <AddToBasketButton />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};
