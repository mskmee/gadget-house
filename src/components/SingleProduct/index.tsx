import { FC, useRef } from 'react';
import style from './Product.module.scss';
import { Rate } from 'antd';

import {
  deliverImg,
  paymentImg,
  rateImg,
  returnImg,
  reviewImg,
} from '@/assets/constants';
import { AddToBasketButton } from './AddToBasketButton';

import { useTypedSelector } from '@/hooks/useTypedSelector';
import { convertPriceToReadable } from '@/utils/helpers/product';
import { useMediaQuery } from 'react-responsive';
import { IProductCard } from '@/interfaces/interfaces';

import ArrowIcon from '@/assets/single_product/ArrowIcon';


import SliderWithTumbsAndModal from '@/UI/Slider/SliderWithTumbsAndModal/SliderWithTumbsAndModal';
import { ArrowNext, ArrowPrev } from '@/UI/Slider/SliderArrows/SliderArrow';
import ProductColors from './ProductDetails/ProductColors';
import ProductModels from './ProductDetails/ProductModels';
import ProductMemory from './ProductDetails/ProductMemory';
import { useProductDetails } from './ProductDetails/hook/useProductDetails';

interface IProductProps {
  dinamicCurrentProduct: IProductCard;
}

export const Product: FC<IProductProps> = ({dinamicCurrentProduct}) => {
  const reviews = useTypedSelector(state => state.singleProduct.reviews);
  const reviewsLength = reviews?.totalElements;

  const {changeCharacteristic, productCharacteristics} = useProductDetails({
    selectedColor: dinamicCurrentProduct?.alternativeProducts?.color?.[0]?.value ?? null,
    selectedModel: dinamicCurrentProduct?.alternativeProducts?.model?.[0]?.value ?? null,
    selectedMemory: dinamicCurrentProduct?.alternativeProducts?.romMemory?.[0]?.value ?? null,
  });
  
  const { currency, locale } = useTypedSelector((state) => state.shopping_card);
  const dinamicCurrentProductImages = dinamicCurrentProduct?.images;
  const productRateRef = useRef<HTMLDivElement>(null);

  const isLargerThan768px = useMediaQuery({query: '(max-width: 768px)'});
  const isWidth575 = useMediaQuery({ query: '(max-width: 575px)',})

  console.log('dinamicCurrentProduct', dinamicCurrentProduct?.alternativeProducts)

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
      
      {/* Slider */}
      <div className={style['product_custom-carousel-wrap']}>
        <div className='relative'>
          <SliderWithTumbsAndModal 
            data={dinamicCurrentProductImages} 
            prevArrow={<ArrowPrev classNameArrow='arrowLeft'><ArrowIcon color="#1C1817" /></ArrowPrev>}
            nextArrow={<ArrowNext classNameArrow='arrowRight'><ArrowIcon color="#1C1817" /></ArrowNext>}
            dinamicCurrentProduct={dinamicCurrentProduct}
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
          {dinamicCurrentProduct?.alternativeProducts?.color && (  
              <ProductColors 
                colors={dinamicCurrentProduct?.alternativeProducts?.color ?? []} 
                selectedColor={productCharacteristics?.selectedColor ?? ''} 
                onSelectedColor={(val,inStock) => changeCharacteristic(val, inStock, 'selectedColor')}
              />
            )
          }

          {dinamicCurrentProduct?.alternativeProducts?.model && (  
              <ProductModels 
                models={dinamicCurrentProduct?.alternativeProducts?.model ?? []} 
                selectedModel={productCharacteristics?.selectedModel ?? ''}
                onSelectedModels={(val, inStock) => changeCharacteristic(val, inStock, 'selectedModel')}
              />
            )
          }
          
          {dinamicCurrentProduct?.alternativeProducts?.romMemory && (
              <ProductMemory 
                memories={dinamicCurrentProduct?.alternativeProducts?.romMemory ?? []}
                selectedMemory={productCharacteristics?.selectedMemory ?? ''}
                onSelectedMemory={(val, inStock) => changeCharacteristic(val, inStock, 'selectedMemory')}
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
