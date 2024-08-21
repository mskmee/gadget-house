import { FC, useEffect, useRef, useState } from 'react';
import style from './SingleProduct.module.scss';
import { Rate } from 'antd';
import { currentProduct } from '@/constants/singleProduct';
import {
  arrowImg,
  basketImg,
  deliverImg,
  paymentImg,
  productIsNotAvailableImg,
  rateImg,
  returnImg,
  reviewImg,
} from '@/assets/constants';

interface IProductProps {
  reviewsLength: number;
}

export const Product: FC<IProductProps> = ({ reviewsLength }) => {
  const currentProductImages = currentProduct?.[0]?.images;
  const [currentSlide, setCurrentSlide] = useState(currentProductImages?.[0]);
  const prevArrowRef = useRef<HTMLImageElement>(null);
  const nextArrowRef = useRef<HTMLImageElement>(null);
  const [productCharacteristics, setProductCharacteristics] = useState({
    selectedColor: 'blue',
    selectedModel: 'Apple iPhone 15 Pro',
    selectedMemory: '256GB',
  });
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
      prevArrowRef.current.style.cursor = 'not-allowed';
      prevArrowRef.current.style.filter =
        'invert(34%) sepia(96%) saturate(1949%) hue-rotate(345deg) brightness(99%) contrast(103%)';
    } else {
      if (prevArrowRef.current) {
        prevArrowRef.current.style.cursor = 'pointer';
        prevArrowRef.current.style.filter = 'none';
      }
    }
    if (
      currentSlide?.id === currentProductImages?.length &&
      nextArrowRef.current
    ) {
      nextArrowRef.current.style.cursor = 'not-allowed';
      nextArrowRef.current.style.filter =
        'invert(34%) sepia(96%) saturate(1949%) hue-rotate(345deg) brightness(99%) contrast(103%)';
    } else {
      if (nextArrowRef.current) {
        nextArrowRef.current.style.cursor = 'pointer';
        nextArrowRef.current.style.filter = 'none';
      }
    }
  }, [currentSlide?.id, currentProductImages?.length]);

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

  return (
    <section className={style['product']} id="product">
      <div className={style['product_custom-carousel-wrap']}>
        <div className={style['product_carousel-current-picture']}>
          <img
            src={arrowImg}
            alt="prev image arrow"
            ref={prevArrowRef}
            onClick={handlePrevClick}
          />
          <img src={currentSlide?.img} alt="current product picture" />
          <img
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
                onClick={selectCurrentSlideByClick(item?.id)}
                style={
                  currentSlide?.id === item?.id
                    ? {
                        maxHeight: '130px',
                        padding: '5px 0',
                        border: '1px solid #00820D',
                        borderRadius: '12px',
                      }
                    : { border: 'none' }
                }
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
            <div className={style['product_rate']}>
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
                  style={
                    productCharacteristics?.selectedColor === color && inStock
                      ? {
                          backgroundColor: color,
                          transform: 'scale(1.2)',
                          border: '3px solid #808080',
                        }
                      : !inStock
                        ? {
                            border: '1px solid #808080',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'not-allowed',
                          }
                        : { backgroundColor: color }
                  }
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
                  style={
                    productCharacteristics?.selectedModel === model
                      ? {
                          color: '#00680A',
                          borderColor: '#00680A',
                        }
                      : { color: '#1C1817', borderColor: '#808080' }
                  }
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
                  style={
                    productCharacteristics?.selectedMemory === memory
                      ? { color: '#00680A', borderColor: '#00680A' }
                      : { color: '#1C1817', borderColor: '#808080' }
                  }
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
              {currentProduct?.[0]?.price} ₴
            </span>
            <button>
              <div>
                <img src={basketImg} alt="basket" />
                <span>Add to basket</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
