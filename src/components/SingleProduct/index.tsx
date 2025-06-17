import { FC, useRef } from 'react';
import style from './Product.module.scss';
import { Rate } from 'antd';

import {
  deliverImg,
  paymentImg,
  returnImg,
  reviewImg,
} from '@/assets/constants';
import { AddToBasketButton } from './AddToBasketButton';

import { useTypedSelector } from '@/hooks/useTypedSelector';
import { convertPriceToReadable } from '@/utils/helpers/product';
import { useMediaQuery } from 'react-responsive';
import { IProductCard } from '@/interfaces/interfaces';

import ArrowIcon from '@/assets/single_product/ArrowIcon';

import { ArrowNext, ArrowPrev } from '@/UI/Slider/SliderArrows/SliderArrow';
import ProductColors from './ProductDetails/ProductColors';
import ProductModels from './ProductDetails/ProductModels';
import ProductMemory from './ProductDetails/ProductMemory';

import SliderWithThumbsAndModal from '@/UI/Slider/SliderWithThumbsAndModal/SliderWithThumbsAndModal';

interface IProductProps {
  dynamicCurrentProduct: IProductCard;
}

export const Product: FC<IProductProps> = ({dynamicCurrentProduct}) => {
  const reviews = useTypedSelector(state => state.singleProduct.reviews);
  const reviewsLength = reviews?.totalElements;

  const {id}  = dynamicCurrentProduct;

  const selectedColor = dynamicCurrentProduct?.alternativeProducts?.color?.find(c => c.productId === Number(id))?.attributeValue;
  const selectedModel = dynamicCurrentProduct?.alternativeProducts?.model?.find(m => m.productId === Number(id))?.attributeValue;
  const selectedMemory = dynamicCurrentProduct?.alternativeProducts?.romMemory?.find(r => r.productId ===  Number(id))?.attributeValue;

  const { currency, locale } = useTypedSelector((state) => state.shopping_card);
  const dynamicCurrentProductImages = dynamicCurrentProduct?.images;
  const productRateRef = useRef<HTMLDivElement>(null);

  const isLargerThan768px = useMediaQuery({query: '(max-width: 768px)'});
  const isWidth575 = useMediaQuery({ query: '(max-width: 575px)',})

  return (
    <section className={style['product']} id="product">
      {isLargerThan768px && (
        <div className={style['product_title']}>
          <h1>{dynamicCurrentProduct?.name}</h1>
          <div className={style['product_rate-box']}>
            <div className={style['product_rate']} ref={productRateRef}>
              <Rate
                className="product_rate-stars"
                value={dynamicCurrentProduct?.rating}
              />
              <a href="#users-review">
                <img src={reviewImg} alt="review pic" />
                <span>({reviewsLength})</span>
              </a>
            </div>
            <span>code:{dynamicCurrentProduct?.code}</span>
          </div>
        </div>
      )}
      
      {/* Slider */}
      <div className={style['product_custom-carousel-wrap']}>
        <div className='relative'>
          <SliderWithThumbsAndModal 
            data={dynamicCurrentProductImages} 
            prevArrow={<ArrowPrev classNameArrow='arrowLeft'><ArrowIcon color="#1C1817" /></ArrowPrev>}
            nextArrow={<ArrowNext classNameArrow='arrowRight'><ArrowIcon color="#1C1817" /></ArrowNext>}
            dynamicCurrentProduct={dynamicCurrentProduct}
            slidesPerView={6}
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
            isMobile={isWidth575}
            className="productSlider"
          />
        </div>
      </div>

      <div className={style['product_info']}>
        {!isLargerThan768px && (
          <div className={style['product_title']}>
            <h1>{dynamicCurrentProduct?.name}</h1>
            <div className={style['product_rate-box']}>
              <div className={style['product_rate']} ref={productRateRef}>
                <Rate
                  className="product_rate-stars"
                  disabled
                  value={dynamicCurrentProduct?.rating}
                  style={{color: '#6F4C9A'}}
                />
                <a>
                  <img src={reviewImg} alt="review pic" />
                  <span>({reviewsLength})</span>
                </a>
              </div>
              <span>code:{dynamicCurrentProduct?.code}</span>
            </div>
          </div>
        )}
        <div className={style['product_details']}>
          {selectedColor && (  
              <ProductColors 
                key={selectedColor}
                colors={dynamicCurrentProduct?.alternativeProducts?.color ?? []} 
                selectedColor={selectedColor ?? ''} 
              />
            )
          }

          {selectedModel && (  
              <ProductModels 
                key={selectedModel }
                models={dynamicCurrentProduct?.alternativeProducts?.model ?? []} 
                selectedModel={selectedModel ?? ''}
              />
            )
          }
          
          {selectedMemory && (
              <ProductMemory 
                key={selectedMemory}
                memories={dynamicCurrentProduct?.alternativeProducts?.romMemory ?? []}
                selectedMemory={selectedMemory ?? ''}
              />
            )
          }

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
                dynamicCurrentProduct?.price || 0,
                currency,
                locale,
              )}
            </span>
            <AddToBasketButton product={dynamicCurrentProduct} />
          </div>
        </div>
      </div>
    </section>
  );
};
