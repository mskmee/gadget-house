import { Dispatch, FC, SetStateAction, useEffect, useRef } from 'react';
import style from './Product.module.scss';
import classNames from 'classnames';
import { arrowImg } from '@/assets/constants';

import { Modal } from 'antd';
import { AddToBasketButton } from './AddToBasketButton';
import { convertPriceToReadable } from '@/utils/helpers/product';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useMediaQuery } from 'react-responsive';
import { IProductCard } from '@/interfaces/interfaces';

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
  dinamicCurrentProduct: IProductCard;
}

export const PhotoModal: FC<iPhotoModalProps> = ({
  isModalVisible,
  setIsModalVisible,
  modalImageSrc,
  setModalImageSrc,
  currentSlide,
  setCurrentSlide,
  dinamicCurrentProduct,
}) => {
  const prevArrowRef = useRef<HTMLImageElement>(null);
  const nextArrowRef = useRef<HTMLImageElement>(null);
  const currentProductImages = dinamicCurrentProduct.images;

  const { currency, locale } = useTypedSelector((state) => state.shopping_card);

  const handlePrevClick = () => {
    if (currentSlide?.id !== 1) {
      setCurrentSlide({
        id: currentSlide.id - 1,
        img: currentProductImages?.[currentSlide?.id - 2].link,
      });
    }
  };

  const handleNextClick = () => {
    if (currentSlide?.id !== currentProductImages?.length) {
      setCurrentSlide({
        id: currentSlide.id + 1,
        img: currentProductImages?.[currentSlide?.id].link,
      });
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setModalImageSrc(null);
  };

  const isLargerThan500px = useMediaQuery({
    query: '(max-width: 500px)',
  });

  const selectCurrentSlideByClick = (slideId: number) => {
    return () => {
      setCurrentSlide({
        id: slideId,
        img: currentProductImages?.[slideId - 1].link,
      });
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
                  {currentSlide.id}/{dinamicCurrentProduct.images?.length}
                </span>
              </div>
              {isLargerThan500px && (
                <ul>
                  {currentProductImages?.map((_, i) => (
                    <li
                      key={i + 1}
                      className={classNames({
                        [style['selected-photo']]: currentSlide?.id === i + 1,
                      })}
                      onClick={selectCurrentSlideByClick(i + 1)}
                    ></li>
                  ))}
                </ul>
              )}
              <div className={style['product_carousel-slicks']}>
                {!isLargerThan500px && (
                  <ul>
                    {currentProductImages?.map((item, i) => (
                      <li
                        key={i + 1}
                        className={classNames({
                          [style['selected-photo']]: currentSlide?.id === i + 1,
                        })}
                        onClick={selectCurrentSlideByClick(i + 1)}
                      >
                        <img src={item.link} alt="product slick picture" />
                      </li>
                    ))}
                  </ul>
                )}

                <div className={style.photoModalBottom_right}>
                  <span>
                    {convertPriceToReadable(
                      dinamicCurrentProduct.price,
                      currency,
                      locale,
                    )}
                  </span>
                  <AddToBasketButton product={dinamicCurrentProduct} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};
