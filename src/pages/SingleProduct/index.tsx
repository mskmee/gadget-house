import style from '@/components/SingleProduct/SingleProduct.module.scss';
import { currentProduct } from '@/constants/singleProduct';
import { useSessionStorage } from '@/hooks/useSessionStorage';
import { createContext } from 'react';
import { TReview } from '@/types/Review.type';
import { CustomBreadcrumbs } from '@/components/SingleProduct/CustomBreadcrumbs';
import { MenuItems } from '@/components/SingleProduct/MenuItems';
import { Product } from '@/components/SingleProduct/Product';
import { ProductCharacteristics } from '@/components/SingleProduct/ProductCharacteristics';
import { ProductReviews } from '@/components/SingleProduct/ProductReviews';
import { ProductPhotos } from '@/components/SingleProduct/ProductPhotos';
import { ProductAccessories } from '@/components/SingleProduct/ProductAccessories';
import Benefits from '@/components/benefitsList/benefits';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export interface IProductContext {
  storageValue: TReview[];
  allProductReviews: TReview[];
  setValue: (newValue: TReview[]) => void;
}

export const ProductContext = createContext<IProductContext>({
  storageValue: [],
  allProductReviews: [],
  setValue: () => {},
});

export const SingleProductPage = () => {
  const [storageValue, setValue] = useSessionStorage<TReview[]>(
    'product_reviews',
    [],
  );
  const allProductReviews = currentProduct?.[0]?.reviews?.concat(storageValue);
  useDocumentTitle(currentProduct?.[0]?.title);

  return (
    <ProductContext.Provider
      value={{ storageValue, allProductReviews, setValue }}
    >
      <div className={style['single-product']}>
        <div className={style['single-product__wrap']}>
          <CustomBreadcrumbs />
        </div>
        <MenuItems />
        <div className={style['single-product__wrap']}>
          <Product reviewsLength={allProductReviews?.length} />
          <ProductCharacteristics />
          <ProductReviews />
          <ProductPhotos />
        </div>
        <ProductAccessories />
        <Benefits />
      </div>
    </ProductContext.Provider>
  );
};

export default SingleProductPage;
