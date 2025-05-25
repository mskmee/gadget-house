import { FC, useRef, useState } from 'react';
import style from './Product.module.scss';
import { Rate } from 'antd';

import {
  deliverImg,
  paymentImg,
  productIsNotAvailableImg,
  rateImg,
  returnImg,
  reviewImg,
} from '@/assets/constants';
import classNames from 'classnames';
import { AddToBasketButton } from './AddToBasketButton';

import { useTypedSelector } from '@/hooks/useTypedSelector';
import { convertPriceToReadable } from '@/utils/helpers/product';
import { useMediaQuery } from 'react-responsive';
import { IProductCard } from '@/interfaces/interfaces';

import ArrowIcon from '@/assets/single_product/ArrowIcon';


import SliderWithTumbsAndModal from '@/UI/Slider/SliderWithTumbsAndModal/SliderWithTumbsAndModal';
import { ArrowNext, ArrowPrev } from '@/UI/Slider/SliderArrows/SliderArrow';

interface IProductProps {
  reviewsLength: number;
  dinamicCurrentProduct: IProductCard;
}

export const Product: FC<IProductProps> = ({reviewsLength, dinamicCurrentProduct}) => {
  
  const { currency, locale } = useTypedSelector((state) => state.shopping_card);
  const dinamicCurrentProductImages = dinamicCurrentProduct?.images;

  const [productCharacteristics, setProductCharacteristics] = useState({
    selectedColor: 'blue',
    selectedModel: 'Apple iPhone 15 Pro',
    selectedMemory: '256GB',
  });


  const productRateRef = useRef<HTMLDivElement>(null);

  const isLargerThan768px = useMediaQuery({
    query: '(max-width: 768px)',
  });

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

  const isWidth575 = useMediaQuery({ query: '(max-width: 575px)',})

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
        <div className=''>
          <SliderWithTumbsAndModal 
            data={dinamicCurrentProductImages} 
            prevArrow={<ArrowPrev classNameArrow='arrowLeft'><ArrowIcon color="#1C1817" /></ArrowPrev>}
            nextArrow={<ArrowNext classNameArrow='arrowRight'><ArrowIcon color="#1C1817" /></ArrowNext>}
            dinamicCurrentProduct={dinamicCurrentProduct}
            slidesPerView={{ xs: 2, sm: 3, md: 4, lg: 6 }}
            isMobile={isWidth575}
            className="productSlider"
          />
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
    </section>
  );
};
