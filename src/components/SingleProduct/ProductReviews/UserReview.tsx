import { rateEmptyImg, rateImg } from '@/assets/constants';
import style from '../Product.module.scss';
import { formatDate } from '@/utils/formatDate';
import { Pagination, Rate } from 'antd';
import { useEffect, useState } from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { getReviews } from '@/store/singleProduct/actions';
import { AppDispatch } from '@/store';
import { DataStatus } from '@/enums/data-status';

function UserReview({ productId }: { productId: number }) {
  const dispatch: AppDispatch = useDispatch();
  const currentProductStatus = useTypedSelector(
    (state) => state.products.dataStatus,
  );

  const reviews = useTypedSelector((state) => state.singleProduct.reviews);

  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const visibleReviews = showAll
    ? (reviews?.page ?? [])
    : (reviews?.page?.slice(0, 2) ?? []);

  function handlePageChange(page: number) {
    setCurrentPage(page - 1);
    setShowAll(true);
  }

  useEffect(() => {
    if (currentProductStatus === DataStatus.FULFILLED && productId !== null) {
      dispatch(getReviews({ productId, page: currentPage }));
    }
  }, [dispatch, productId, currentPage, currentProductStatus]);

  return (
    <div className={style['review_users-review']} id="users-review">
      {reviews?.page.length ? (
        <ul className={style['review_users-review-list']}>
          {visibleReviews?.map((review, index) => (
            <li key={index}>
              <div>
                <h3>{review?.user.fullName}</h3>
                <span>{formatDate(review?.createdAt)}</span>
              </div>
              <Rate
                className="product_rate-stars"
                defaultValue={review?.rate}
                character={({ index = 0 }) => {
                  return (
                    <img
                      src={index < review?.rate ? rateImg : rateEmptyImg}
                      alt="product rate star"
                    />
                  );
                }}
              />
              <p>{review?.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className={style.withoutComments}>
          <div className={style.withoutComments__title}>No comments yet</div>
          <div className={style.withoutComments__subtitle}>
            Be the first to share your thoughts or ask a question.
          </div>
        </div>
      )}

      {!showAll && (reviews?.page?.length ?? 0) > 2 && (
        <button onClick={() => setShowAll(true)}>All reviews</button>
      )}
      {showAll && (reviews?.totalPages ?? 0) > 1 && (
        <Pagination
          total={reviews?.totalElements}
          onChange={handlePageChange}
          current={currentPage + 1}
          className="review_users-review-pagination"
        />
      )}
    </div>
  );
}

export default UserReview;
