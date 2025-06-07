import style from '../Product.module.scss';
import UserReview from './UserReview';
import FormReview from './FormReview';

export interface ProductReviewsProps {
  productTitle: string;
  productId: number
}


function ProductReviews({productTitle, productId}: ProductReviewsProps) {

  return (
    <section className={style['reviews']} id="product-reviews">
      <div className={style['reviews_wrap']}>
        <h2>Reviews</h2>
        <h3>
          Customer reviews about <span>{productTitle}</span>
        </h3>
        <FormReview productId={productId} />

        <UserReview productId={productId} />

      </div>
    </section>
  );
}

export default ProductReviews;