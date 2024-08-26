import style from '@/components/SingleProduct/SingleProduct.module.scss';
import { currentProduct } from '@/constants/singleProduct';
import { useSessionStorage } from '@/hooks/useSessionStorage';
import {
  ChangeEventHandler,
  FC,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { TReview } from '@/types/Review.type';
import { CustomBreadcrumbs } from '@/components/SingleProduct/CustomBreadcrumbs';
import { MenuItems } from '@/components/SingleProduct/MenuItems';
import { Product } from '@/components/SingleProduct/Product';
import { ProductCharacteristics } from '@/components/SingleProduct/ProductCharacteristics';
import { ProductPhotos } from '@/components/SingleProduct/ProductPhotos';
import { ProductAccessories } from '@/components/SingleProduct/ProductAccessories';
import Benefits from '@/components/benefitsList/benefits';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Bounce, toast } from 'react-toastify';
import debounce from 'lodash.debounce';
import { Pagination, Rate } from 'antd';
import { rateEmptyImg, rateImg } from '@/assets/constants';
import { formatDate } from '@/utils/formatDate';
import DOMPurify from 'dompurify';
import classNames from 'classnames';

const maxLength = 500;

export const SingleProductPage: FC = () => {
  useDocumentTitle(currentProduct?.[0]?.title);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [storageValue, setValue] = useSessionStorage<TReview[]>(
    'product_reviews',
    [],
  );
  const allProductReviews = currentProduct?.[0]?.reviews?.concat(storageValue);
  const [review, setReview] = useState({ text: '', rateValue: 0 });
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(2);
  const [isAllReviewsBtnVisible, setIisAllReviewsBtnVisible] = useState(
    currentProduct?.[0]?.reviews.length > 2 ? true : false,
  );
  const leftCharactersCount = maxLength - review?.text?.length;

  const isBtnDisabled = !review?.text && !review?.rateValue;

  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(
    isAllReviewsBtnVisible ? 2 : 8,
  );

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = allProductReviews?.slice(itemOffset, endOffset);

  const reviewsRate = useRef<HTMLLIElement>(null);

  const debouncedCallback = useMemo(
    () =>
      debounce((textValue: string, rateValue: number) => {
        setReview((prevReview) => ({
          ...prevReview,
          text: textValue,
          rateValue: rateValue,
        }));
      }, 500),
    [],
  );

  useEffect(() => {
    if (reviewsRate.current) {
      const listItems = reviewsRate.current?.querySelector('li');
      console.log(listItems);
    }
  }, []);

  const changeReviewText: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    debouncedCallback(e.target.value, review?.rateValue);
  };

  const changeRateValue = (value: number) => {
    setReview({ ...review, rateValue: value });
  };

  const changeVisibleReviewsCount = () => {
    setVisibleReviewsCount(allProductReviews?.length);
    setIisAllReviewsBtnVisible(false);
    setItemsPerPage(8);
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
        review_text: DOMPurify.sanitize(review?.text),
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

  const handlePageChange = (page: number) => {
    const newOffset = ((page - 1) * itemsPerPage) % allProductReviews?.length;
    setItemOffset(newOffset);
    setTimeout(() => {
      const element = document.getElementById('users-review');
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 20, // Adjust this value as needed
          behavior: 'smooth', // Smooth scroll
        });
      }
    }, 0);
  };

  return (
    <div className={style['single-product']}>
      <div className={style['single-product__wrap']}>
        <CustomBreadcrumbs />
      </div>
      <MenuItems />
      <div className={style['single-product__wrap']}>
        <Product reviewsLength={allProductReviews?.length} />
        <ProductCharacteristics />

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
            <form
              className={style['review_leave-review']}
              onSubmit={saveReview}
            >
              <div className={style['review_text-area-box']}>
                <textarea
                  placeholder="Your review"
                  onChange={changeReviewText}
                  ref={textareaRef}
                  maxLength={maxLength}
                  name="user_review"
                />
                <span
                  className={classNames(style['review_character-counter'], {
                    [style['notice']]: leftCharactersCount <= 10,
                  })}
                >
                  {leftCharactersCount}
                </span>
              </div>

              <button type="submit" disabled={isBtnDisabled}>
                Leave a review
              </button>
            </form>
            <div className={style['review_users-review']} id="users-review">
              {currentProduct?.[0]?.reviews?.length ? (
                <ul className={style['review_users-review-list']}>
                  {currentItems
                    ?.slice(0, visibleReviewsCount)
                    ?.map((review) => (
                      <li key={review?.id} ref={reviewsRate}>
                        <div>
                          <h3>{review?.author}</h3>
                          <span>{formatDate(review?.created_date)}</span>
                        </div>
                        <Rate
                          ref={reviewsRate}
                          className="product_rate-stars"
                          defaultValue={review?.rate}
                          character={({ index = 0 }) => {
                            return (
                              <img
                                src={
                                  index < review?.rate ? rateImg : rateEmptyImg
                                }
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

              {isAllReviewsBtnVisible ? (
                <button onClick={changeVisibleReviewsCount}>All reviews</button>
              ) : (
                <Pagination
                  total={allProductReviews?.length}
                  pageSize={itemsPerPage}
                  onChange={handlePageChange}
                  className="review_users-review-pagination"
                />
              )}
            </div>
          </div>
        </section>

        <ProductPhotos />
      </div>
      <ProductAccessories />
      <Benefits />
    </div>
  );
};
