import React, { FC, useRef } from 'react';
import style from './Product.module.scss';
import { Rate } from 'antd';

import {
  deliverImg,
  paymentImg,
  returnImg,
  reviewImg,
} from '@/assets/constants';
import { AddToBasketButton } from './AddToBasketButton';

import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useAuthRequired } from '@/hooks/useAuthRequired';
import { convertPriceToReadable } from '@/utils/helpers/product';
import { useMediaQuery } from 'react-responsive';
import { IProductCard } from '@/interfaces/interfaces';

import ArrowIcon from '@/assets/single_product/ArrowIcon';
import { HeartIcon } from '@/assets/icons/HeartIcon';

import { ArrowNext, ArrowPrev } from '@/UI/Slider/SliderArrows/SliderArrow';
import ProductColors from './ProductDetails/ProductColors';
import ProductModels from './ProductDetails/ProductModels';
import ProductMemory from './ProductDetails/ProductMemory';

import SliderWithThumbsAndModal from '@/UI/Slider/SliderWithThumbsAndModal/SliderWithThumbsAndModal';

interface IProductProps {
  dynamicCurrentProduct: IProductCard;
}

export const Product: FC<IProductProps> = ({ dynamicCurrentProduct }) => {
  const { toggleFavorite } = useActions();
  const { userToken } = useTypedSelector((state) => state.auth);
  const { triggerAuthRequired } = useAuthRequired();
  const reviews = useTypedSelector((state) => state.singleProduct.reviews);
  const isLikedProduct = useTypedSelector((state) =>
    state.products.favoriteProducts.some(
      (fav) => fav.id === dynamicCurrentProduct?.id,
    ),
  );

  const reviewsLength = reviews?.totalElements;

  const { id } = dynamicCurrentProduct;

  const selectedColor = dynamicCurrentProduct?.alternativeProducts?.color?.find(
    (c) => c.productId === Number(id),
  )?.attributeValue;
  const selectedModel = dynamicCurrentProduct?.alternativeProducts?.model?.find(
    (m) => m.productId === Number(id),
  )?.attributeValue;
  const selectedMemory =
    dynamicCurrentProduct?.alternativeProducts?.romMemory?.find(
      (r) => r.productId === Number(id),
    )?.attributeValue;

  const { currency, locale } = useTypedSelector((state) => state.shopping_card);
  const dynamicCurrentProductImages = dynamicCurrentProduct?.images;
  const productRateRef = useRef<HTMLDivElement>(null);

  const isLargerThan768px = useMediaQuery({ query: '(max-width: 768px)' });
  const isWidth575 = useMediaQuery({ query: '(max-width: 575px)' });

  const handleSaveFavoriteProduct = () => {
    if (!userToken) {
      triggerAuthRequired('favorite');
      return;
    }
    if (dynamicCurrentProduct) {
      toggleFavorite(dynamicCurrentProduct);
    }
  };
  const handleScrollToReviews = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const reviewSection = document.querySelector('#product-reviews');
    if (reviewSection) {
      const offsetTop =
        reviewSection.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

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
      <div className={style['product_custom-block']}>
        {/* Slider */}
        <div className={style['product_custom-carousel-wrap']}>
          <div className="relative">
            <SliderWithThumbsAndModal
              data={dynamicCurrentProductImages}
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

        <div className={style['product_favorite-button']}>
          <HeartIcon
            onClick={handleSaveFavoriteProduct}
            isLiked={isLikedProduct}
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
                  style={{ color: '#6F4C9A' }}
                />
                <a href="#product-reviews" onClick={handleScrollToReviews}>
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
          )}

          {selectedModel && (
            <ProductModels
              key={selectedModel}
              models={dynamicCurrentProduct?.alternativeProducts?.model ?? []}
              selectedModel={selectedModel ?? ''}
            />
          )}

          {selectedMemory && (
            <ProductMemory
              key={selectedMemory}
              memories={
                dynamicCurrentProduct?.alternativeProducts?.romMemory ?? []
              }
              selectedMemory={selectedMemory ?? ''}
            />
          )}

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
