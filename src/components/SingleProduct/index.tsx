import { FC, useEffect, useRef, useState } from 'react';
import style from './Product.module.scss';
import { Rate } from 'antd';

import {
  arrowImg,
  deliverImg,
  paymentImg,
  productIsNotAvailableImg,
  rateImg,
  returnImg,
  reviewImg,
} from '@/assets/constants';
import classNames from 'classnames';
import { AddToBasketButton } from './AddToBasketButton';
import { PhotoModal } from './PhotoModal';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { convertPriceToReadable } from '@/utils/helpers/product';
import { useMediaQuery } from 'react-responsive';
import { IProductCard } from '@/interfaces/interfaces';
import { useLocation } from 'react-router-dom';

interface IProductProps {
  reviewsLength: number;
  dinamicCurrentProduct: IProductCard;
}

export const Product: FC<IProductProps> = ({
  reviewsLength,
  dinamicCurrentProduct,
}) => {
  const { pathname } = useLocation();
  const { currency, locale } = useTypedSelector((state) => state.shopping_card);
  const dinamicCurrentProductImages = dinamicCurrentProduct?.images;
  const [currentSlide, setCurrentSlide] = useState({
    id: 1,
    img: dinamicCurrentProductImages[0].link,
  });

  const prevArrowRef = useRef<HTMLImageElement>(null);
  const nextArrowRef = useRef<HTMLImageElement>(null);
  const [productCharacteristics, setProductCharacteristics] = useState({
    selectedColor: 'blue',
    selectedModel: 'Apple iPhone 15 Pro',
    selectedMemory: '256GB',
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState<string | null>(null);
  const productRateRef = useRef<HTMLDivElement>(null);

  const isLargerThan768px = useMediaQuery({
    query: '(max-width: 768px)',
  });
  const isLargerThan500px = useMediaQuery({
    query: '(max-width: 500px)',
  });

  const handlePrevClick = () => {
    if (currentSlide?.id !== 1) {
      setCurrentSlide({
        id: currentSlide.id - 1,
        img: dinamicCurrentProductImages?.[currentSlide?.id - 2].link,
      });
    }
  };

  const handleNextClick = () => {
    if (currentSlide?.id !== dinamicCurrentProductImages?.length) {
      setCurrentSlide({
        id: currentSlide.id + 1,
        img: dinamicCurrentProductImages?.[currentSlide?.id].link,
      });
    }
  };

  const selectCurrentSlideByClick = (slideId: number) => {
    return () => {
      setCurrentSlide({
        id: slideId,
        img: dinamicCurrentProductImages?.[slideId - 1].link,
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
      currentSlide?.id === dinamicCurrentProductImages?.length &&
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
  }, [currentSlide?.id, dinamicCurrentProductImages?.length, modalImageSrc]);

  useEffect(() => {
    setCurrentSlide({
      id: 1,
      img: dinamicCurrentProductImages[0].link,
    });
  }, [pathname]);

  const changeProductCharacteristics =
    (value: string, inStock = true, type: string) =>
    () => {
      if (type === 'color' && inStock) {
        setProductCharacteristics({
          ...productCharacteristics,
          selectedColor: value,
        });
      }
      if (type === 'model') {
        setProductCharacteristics({
          ...productCharacteristics,
          selectedModel: value,
        });
      }
      if (type === 'memory') {
        setProductCharacteristics({
          ...productCharacteristics,
          selectedMemory: value,
        });
      }
    };
  const openImageModal = (imageSrc: string) => {
    document.body.style.width = '100%';
    setModalImageSrc(imageSrc);
    setIsModalVisible(true);
  };

  return (
    <section className={style['product']} id="product">
      {isLargerThan768px && (
        <div className={style['product_title']}>
          <h1>{dinamicCurrentProduct?.name}</h1>
          <div className={style['product_rate-box']}>
            <div className={style['product_rate']} ref={productRateRef}>
              <Rate
                className="product_rate-stars"
                value={dinamicCurrentProduct?.rating}
                character={() => {
                  return <img src={rateImg} alt="product rate star" />;
                }}
              />
              <a href="#users-review">
                <img src={reviewImg} alt="review pic" />
                <span>({reviewsLength})</span>
              </a>
            </div>
            <span>code:{dinamicCurrentProduct?.code}</span>
          </div>
        </div>
      )}
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
            src={currentSlide?.img}
            alt="current product picture"
            onClick={() => openImageModal(currentSlide?.img)}
          />
          <img
            className={style['arrow-right']}
            src={arrowImg}
            alt="next image arrow"
            ref={nextArrowRef}
            onClick={handleNextClick}
          />
        </div>
        <div className={style['product_carousel-slicks']}>
          {!isLargerThan500px ? (
            <ul>
              {dinamicCurrentProductImages?.map((item, i) => (
                <li
                  key={i}
                  className={classNames({
                    [style['selected-photo']]: currentSlide?.id === i + 1,
                  })}
                  onClick={selectCurrentSlideByClick(i + 1)}
                >
                  <img src={item.link} alt="product slick picture" />
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              {dinamicCurrentProductImages?.map((_, i) => (
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
        </div>
      </div>

      <div className={style['product_info']}>
        {!isLargerThan768px && (
          <div className={style['product_title']}>
            <h1>{dinamicCurrentProduct?.name}</h1>
            <div className={style['product_rate-box']}>
              <div className={style['product_rate']} ref={productRateRef}>
                <Rate
                  className="product_rate-stars"
                  value={dinamicCurrentProduct?.rating}
                  character={() => {
                    return <img src={rateImg} alt="product rate star" />;
                  }}
                />
                <a href="#users-review">
                  <img src={reviewImg} alt="review pic" />
                  <span>({reviewsLength})</span>
                </a>
              </div>
              <span>code:{dinamicCurrentProduct?.code}</span>
            </div>
          </div>
        )}
        <div className={style['product_details']}>
          <div className={style['product_other-colors']}>
            <h3>Other colors</h3>
            <ul>
              {dinamicCurrentProduct?.anotherColors?.map((color, i) => (
                <li
                  key={i}
                  tabIndex={0}
                  className={classNames({
                    [style['selected-color']]:
                      productCharacteristics?.selectedColor === color &&
                      i + 1 !== dinamicCurrentProduct?.anotherColors?.length,
                    [style['not-available']]:
                      i + 1 === dinamicCurrentProduct?.anotherColors?.length,
                  })}
                  style={{ backgroundColor: color }}
                  onClick={changeProductCharacteristics(
                    color,
                    i + 1 !== dinamicCurrentProduct?.anotherColors?.length,
                    'color',
                  )}
                >
                  {i + 1 === dinamicCurrentProduct?.anotherColors?.length && (
                    <img
                      src={productIsNotAvailableImg}
                      alt="product isn't available"
                      width={16}
                      height={16}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className={style['product_other-models']}>
            <h3>Other models</h3>
            <ul>
              {dinamicCurrentProduct?.otherModels?.map(({ model }) => (
                <li
                  key={model}
                  tabIndex={0}
                  className={classNames({
                    [style['selected-model']]:
                      productCharacteristics?.selectedModel === model,
                  })}
                  onClick={changeProductCharacteristics(model, true, 'model')}
                >
                  {model}
                </li>
              ))}
            </ul>
          </div>
          <div className={style['product_memory-card']}>
            <h3>Memory card</h3>
            <ul>
              {dinamicCurrentProduct?.memoryCards?.map(({ memory }) => (
                <li
                  key={memory}
                  tabIndex={0}
                  className={classNames({
                    [style['selected-memory']]:
                      productCharacteristics?.selectedMemory === memory,
                  })}
                  onClick={changeProductCharacteristics(memory, true, 'memory')}
                >
                  {memory}
                </li>
              ))}
            </ul>
          </div>
          <div className={style['product_deliver-section']}>
            <div>
              <img src={deliverImg} alt="deliver product" />
              <span>We deliver this item for free</span>
            </div>
            <div>
              <img src={returnImg} alt="return product" />
              <span>Easy return within 14 days</span>
            </div>
            <div>
              <img src={paymentImg} alt="payment method" />
              <span>We have various payment methods</span>
            </div>
          </div>
          <div className={style['product_bottom-section']}>
            <span className={style['product_price']}>
              {convertPriceToReadable(
                dinamicCurrentProduct?.price || 0,
                currency,
                locale,
              )}
            </span>
            <AddToBasketButton product={dinamicCurrentProduct} />
          </div>
        </div>
      </div>
      <PhotoModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        modalImageSrc={modalImageSrc}
        setModalImageSrc={setModalImageSrc}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        dinamicCurrentProduct={dinamicCurrentProduct}
      />
    </section>
  );
};
