import style from '@/components/SingleProduct/Product.module.scss';
import { FC, useEffect, useRef } from 'react';
import { CustomBreadcrumbs } from '@/components/SingleProduct/CustomBreadcrumbs';
import { MenuItems } from '@/components/SingleProduct/MenuItems';
import { Product } from '@/components/SingleProduct';
import { ProductCharacteristics } from '@/components/SingleProduct/ProductCharacteristics';
import { ProductPhotos } from '@/components/SingleProduct/ProductPhotos';
import { ProductAccessories } from '@/components/SingleProduct/ProductAccessories';
import Benefits from '@/components/benefitsList/benefits';
import { useDocumentTitle, useTypedSelector } from '@/hooks/hooks';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';

import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { getOneProductById } from '@/store/products/actions';
import ProductReviews from '@/components/SingleProduct/ProductReviews/ProductReviews';

export const SingleProductPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const { id } = useParams();

  useEffect(() => {
    dispatch(getOneProductById(String(id)));
  }, [id, dispatch]);

  const dynamicCurrentProduct = useTypedSelector(
    (state: RootState) => state.products.activeProduct,
  );

  useDocumentTitle(dynamicCurrentProduct?.name || 'Product');

  const isLargerThan992px = useMediaQuery({
    query: '(max-width: 992px)',
  });

  const isLargerThan768px = useMediaQuery({
    query: '(max-width: 768px)',
  });

  return (
    <div className={style['single-product']}>
      {isLargerThan992px ? (
        <>
          <MenuItems refs={sectionRefs} />
          <div
            className={classNames(
              style['single-product__wrap'],
              'container-xxl',
            )}
          >
            {!isLargerThan768px && <CustomBreadcrumbs />}
          </div>
        </>
      ) : (
        <>
          <div
            className={classNames(
              style['single-product__wrap'],
              'container-xxl',
            )}
          >
            <CustomBreadcrumbs />
          </div>
          <MenuItems refs={sectionRefs} />
        </>
      )}

      <div
        className={classNames(style['single-product__wrap'], 'container-xxl')}
      >
        <div ref={(el) => (sectionRefs.current['#product'] = el)}>
          {dynamicCurrentProduct && (
            <Product dynamicCurrentProduct={dynamicCurrentProduct} />
          )}
        </div>

        <div
          ref={(el) => (sectionRefs.current['#product-characteristics'] = el)}
        >
          {dynamicCurrentProduct && (
            <ProductCharacteristics product={dynamicCurrentProduct} />
          )}
        </div>

        <div ref={(el) => (sectionRefs.current['#product-reviews'] = el)}>
          <ProductReviews
            productTitle={dynamicCurrentProduct?.name ?? ''}
            productId={Number(dynamicCurrentProduct?.id)}
          />
        </div>

        <div ref={(el) => (sectionRefs.current['#product-photos'] = el)}>
          {dynamicCurrentProduct && (
            <ProductPhotos productImageCards={dynamicCurrentProduct?.images} />
          )}
        </div>
      </div>

      <div ref={(el) => (sectionRefs.current['#product-accessories'] = el)}>
        <ProductAccessories />
      </div>

      <Benefits />
    </div>
  );
};
