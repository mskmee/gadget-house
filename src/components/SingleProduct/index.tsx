import { FC, useEffect, useRef, useState } from 'react';
import style from './Product.module.scss';
import { Rate } from 'antd';
import { currentProduct } from '@/constants/singleProduct';
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

interface IProductProps {
  reviewsLength: number;
}

export const Product: FC<IProductProps> = ({ reviewsLength }) => {
  const { currency, locale } = useTypedSelector((state) => state.shopping_card);
  const currentProductImages = currentProduct?.[0]?.images;
  const [currentSlide, setCurrentSlide] = useState(currentProductImages?.[0]);
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

  useEffect(() => {
    if (productRateRef.current) {
      const listItems = productRateRef.current?.querySelectorAll(
        '.ant-rate > li > div',
      );
      listItems?.forEach((item) => {
        item.removeAttribute('tabIndex');
      });
    }
  }, []);

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
    setModalImageSrc(imageSrc);
    setIsModalVisible(true);
  };

  return (
    <section className={classNames(style['product'])} id="product">
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
          <ul>
            {currentProductImages?.map((item) => (
              <li
                key={item?.id}
                className={classNames({
                  [style['selected-photo']]: currentSlide?.id === item?.id,
                })}
                onClick={selectCurrentSlideByClick(item?.id)}
              >
                <img src={item?.img} alt="product slick picture" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={style['product_info']}>
        <div className={style['product_title']}>
          <h1>{currentProduct?.[0]?.title}</h1>
          <div className={style['product_rate-box']}>
            <div className={style['product_rate']} ref={productRateRef}>
              <Rate
                className="product_rate-stars"
                value={currentProduct?.[0]?.rating}
                character={() => {
                  return <img src={rateImg} alt="product rate star" />;
                }}
              />
              <a href="#users-review">
                <img src={reviewImg} alt="review pic" />
                <span>({reviewsLength})</span>
              </a>
            </div>
            <span>code:{currentProduct?.[0]?.code}</span>
          </div>
        </div>
        <div className={style['product_details']}>
          <div className={style['product_other-colors']}>
            <h3>Other colors</h3>
            <ul>
              {currentProduct?.[0]?.productColors?.map(({ color, inStock }) => (
                <li
                  key={color}
                  className={classNames({
                    [style['selected-color']]:
                      productCharacteristics?.selectedColor === color &&
                      inStock,
                    [style['not-available']]: !inStock,
                  })}
                  style={{ backgroundColor: color }}
                  onClick={changeProductCharacteristics(
                    color,
                    inStock,
                    'color',
                  )}
                >
                  {!inStock && (
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
              {currentProduct?.[0]?.otherModels?.map(({ model }) => (
                <li
                  key={model}
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
              {currentProduct?.[0]?.memoryCards?.map(({ memory }) => (
                <li
                  key={memory}
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
                currentProduct?.[0]?.price || 0,
                currency,
                locale,
              )}
            </span>
            <AddToBasketButton />
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
      />
    </section>
  );
};
