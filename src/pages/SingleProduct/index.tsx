import style from '@/components/SingleProduct/Product.module.scss';
import { staticCurrentProduct } from '@/constants/singleProduct';
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
import { Product } from '@/components/SingleProduct';
import { ProductCharacteristics } from '@/components/SingleProduct/ProductCharacteristics';
import { ProductPhotos } from '@/components/SingleProduct/ProductPhotos';
import { ProductAccessories } from '@/components/SingleProduct/ProductAccessories';
import Benefits from '@/components/benefitsList/benefits';
import { useDocumentTitle, useSessionStorage } from '@/hooks/hooks';
import { Bounce, toast } from 'react-toastify';
import debounce from 'lodash.debounce';
import { Pagination, Rate } from 'antd';
import { rateEmptyImg, rateImg } from '@/assets/constants';
import { formatDate } from '@/utils/formatDate';
import DOMPurify from 'dompurify';
import classNames from 'classnames';
import { saveReviews } from '@/utils/saveReview';
import { useMediaQuery } from 'react-responsive';
import { laptopData, smartphoneData } from '@/constants/productCards';
import { useParams } from 'react-router-dom';

const maxLength = 500;

export const SingleProductPage: FC = () => {
  const allProducts = [...smartphoneData, ...laptopData];
  const { id } = useParams();
  const dinamicCurrentProduct = allProducts.find(
    (item) => id && item.id === +id,
  );

  useDocumentTitle(dinamicCurrentProduct?.title || 'Product');

  const isLargerThan992px = useMediaQuery({
    query: '(max-width: 992px)',
  });

  const isLargerThan768px = useMediaQuery({
    query: '(max-width: 768px)',
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [storageValue, setValue] = useSessionStorage<TReview[]>(
    'product_reviews',
    [],
  );
  const allProductReviews =
    staticCurrentProduct?.[0]?.reviews?.concat(storageValue);
  const [review, setReview] = useState({
    text: '',
    rateValue: 0,
  });
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(2);
  const [isAllReviewsBtnVisible, setIisAllReviewsBtnVisible] = useState(
    staticCurrentProduct?.[0]?.reviews.length > 2 ? true : false,
  );
  const leftCharactersCount = maxLength - review?.text?.length;
  const isEmptyReviewText = review?.text?.trim()?.length;
  const isEmptyReviewTextBoolean = !!isEmptyReviewText;

  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(
    isAllReviewsBtnVisible ? 2 : 8,
  );

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = allProductReviews?.slice(itemOffset, endOffset);

  const reviewsRateRef = useRef<HTMLUListElement>(null);
  const leaveCommentReviewRef = useRef<HTMLDivElement>(null);

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
    if (reviewsRateRef.current) {
      const listItems = reviewsRateRef.current?.querySelectorAll(
        '.ant-rate > li > div',
      );
      listItems?.forEach((item) => {
        item.removeAttribute('tabIndex');
      });
    }
    if (leaveCommentReviewRef.current) {
      const listItems = leaveCommentReviewRef.current?.querySelectorAll(
        '.ant-rate > li > div',
      );
      listItems?.forEach((item) => {
        item.setAttribute('tabIndex', '0');
      });
    }
  }, [allProductReviews]);

  const changeReviewText: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const value = e.target.value;
    debouncedCallback(value, review?.rateValue);
    if (value?.trim()?.length > 0) {
      setIsBtnDisabled(false);
    } else {
      if (review?.rateValue === 0) {
        setIsBtnDisabled(true);
      }
    }
  };

  const changeRateValue = (value: number) => {
    setReview({ ...review, rateValue: value });
    if (value > 0) {
      setIsBtnDisabled(false);
    } else {
      if (isEmptyReviewText === 0) {
        setIsBtnDisabled(true);
      }
    }
  };

  const changeVisibleReviewsCount = () => {
    setVisibleReviewsCount(allProductReviews?.length);
    setIisAllReviewsBtnVisible(false);
    setItemsPerPage(8);
  };

  const saveReview = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveReviews(1, 101, 'Great product! I highly recommend it.');
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
    setIsBtnDisabled(true);

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
          top: element.offsetTop - 20,
          behavior: 'smooth',
        });
      }
    }, 0);
  };

  return (
    <div className={style['single-product']}>
      {isLargerThan992px ? (
        <>
          <MenuItems />
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
          <MenuItems />
        </>
      )}

      <div
        className={classNames(style['single-product__wrap'], 'container-xxl')}
      >
        {dinamicCurrentProduct && (
          <Product
            dinamicCurrentProduct={dinamicCurrentProduct}
            reviewsLength={allProductReviews?.length}
          />
        )}

        <ProductCharacteristics />

        <section className={style['reviews']} id="product-reviews">
          <div className={style['reviews_wrap']}>
            <h2>Reviews</h2>
            <h3>
              Customer reviews about <span>{dinamicCurrentProduct?.title}</span>
            </h3>
            <div className={style['reviews_rate']} ref={leaveCommentReviewRef}>
              <span>Rate:</span>
              <Rate
                className="reviews_rate-stars"
                onChange={changeRateValue}
                tabIndex={0}
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
              {!isEmptyReviewTextBoolean &&
                review?.text?.length !== 0 &&
                review?.rateValue === 0 && <span>This field is required!</span>}

              <button type="submit" disabled={isBtnDisabled}>
                Leave a review
              </button>
            </form>
            <div className={style['review_users-review']} id="users-review">
              {staticCurrentProduct?.[0]?.reviews?.length ? (
                <ul
                  className={style['review_users-review-list']}
                  ref={reviewsRateRef}
                >
                  {currentItems
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
        {dinamicCurrentProduct && (
          <ProductPhotos productImageCards={dinamicCurrentProduct?.images} />
        )}
      </div>
      <ProductAccessories />
      <Benefits />
    </div>
  );
};
