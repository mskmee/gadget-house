import {
  FC,
  ChangeEventHandler,
  FormEvent,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import style from './SingleProduct.module.scss';
import { rateImg, rateEmptyImg } from '../../assets/constants';
import { Rate } from 'antd';
import debounce from 'lodash.debounce';
import { formatDate } from '@/utils/formatDate';
import { Bounce, toast } from 'react-toastify';
import { currentProduct } from '@/constants/singleProduct';
import { ProductContext } from '@/pages/SingleProduct';

export const ProductReviews: FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { storageValue, allProductReviews, setValue } =
    useContext(ProductContext);
  const [review, setReview] = useState({ text: '', rateValue: 0 });
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(2);
  const [isAllReviewsBtnVisible, setIisAllReviewsBtnVisible] = useState(
    currentProduct?.[0]?.reviews.length > 2 ? true : false,
  );

  const callbackDebounce = useCallback(
    debounce((textValue: string, rateValue: number) => {
      setReview({ ...review, text: textValue, rateValue: rateValue });
    }, 500),
    [],
  );
  const changeReviewText: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    callbackDebounce(e.target.value, review?.rateValue);
  };

  const changeRateValue = (value: number) => {
    setReview({ ...review, rateValue: value });
  };

  const changeVisibleReviewsCount = () => {
    setVisibleReviewsCount(allProductReviews?.length);
    setIisAllReviewsBtnVisible(false);
  };

  const saveReview = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValue([
      ...storageValue,
      {
        id: allProductReviews?.length + 1,
        author: 'Your name',
        rate: review?.rateValue,
        created_date: new Date().getTime(),
        review_text: review?.text,
      },
    ]);
    if (textareaRef.current) {
      textareaRef.current.value = '';
    }
    setReview({ text: '', rateValue: 0 });

    !isAllReviewsBtnVisible &&
      setVisibleReviewsCount(allProductReviews?.length + 1);

    toast.success('Review succesfully added!', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Bounce,
    });
  };

  const isBtnDisabled = !review?.text && !review?.rateValue;

  return (
    <section className={style['reviews']} id="product-reviews">
      <div className={style['reviews_wrap']}>
        <h2>Reviews</h2>
        <h3>
          Customer reviews about <span>{currentProduct?.[0]?.title}</span>
        </h3>
        <div className={style['reviews_rate']}>
          <span>Rate:</span>
          <Rate
            className="reviews_rate-stars"
            onChange={changeRateValue}
            character={({ index = 0 }) => {
              return (
                <img
                  src={index < review?.rateValue ? rateImg : rateEmptyImg}
                  alt="product rate star"
                  width={24}
                  height={24}
                />
              );
            }}
          />
        </div>
        <form className={style['review_leave-review']} onSubmit={saveReview}>
          <textarea
            placeholder="Your review"
            onChange={changeReviewText}
            ref={textareaRef}
            name="user_review"
          />
          <button type="submit" disabled={isBtnDisabled}>
            Leave a review
          </button>
        </form>
        <div className={style['review_users-review']} id="users-review">
          {currentProduct?.[0]?.reviews?.length ? (
            <ul>
              {allProductReviews
                ?.slice(0, visibleReviewsCount)
                ?.map((review) => (
                  <li key={review?.id}>
                    <div>
                      <h3>{review?.author}</h3>
                      <span>{formatDate(review?.created_date)}</span>
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
                    <p>{review?.review_text}</p>
                  </li>
                ))}
            </ul>
          ) : (
            <span>There are no reviews yet!</span>
          )}

          {isAllReviewsBtnVisible && (
            <button onClick={changeVisibleReviewsCount}>All reviews</button>
          )}
        </div>
      </div>
    </section>
  );
};
