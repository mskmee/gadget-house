import { Rate } from 'antd';
import style from '../Product.module.scss';
import { ErrorIcon, rateEmptyImg, rateImg } from '@/assets/constants';
import classNames from 'classnames';
import { Form, Formik } from 'formik';
import { AddReviewRequestDTO } from '@/utils/packages/singleProduct/type/types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useAuthRequired } from '@/hooks/useAuthRequired';
import { addReview, getReviews } from '@/store/singleProduct/actions';
import { toast } from 'react-toastify';
import { reviewSchema } from './FormReview-validation';
import { useMemo } from 'react';

const maxLength = 500;

function FormReview({ productId }: { productId: number }) {
  const { userToken, user } = useTypedSelector((state) => state.auth);
  const { triggerAuthRequired } = useAuthRequired();
  const dispatch: AppDispatch = useDispatch();

  const reviews = useTypedSelector((state) => state.singleProduct.reviews);

  const userHasReviewed = useMemo(() => {
    if (!user?.fullName || !reviews?.page) return false;

    return reviews.page.some(
      (review) =>
        review.user.fullName.toLowerCase().trim() ===
        user.fullName.toLowerCase().trim(),
    );
  }, [reviews?.page, user?.fullName]);

  return (
    <>
      <Formik<AddReviewRequestDTO>
        initialValues={{
          productId: productId,
          text: '',
          rate: null,
        }}
        enableReinitialize
        validationSchema={reviewSchema}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          if (!userToken) {
            triggerAuthRequired('review');
            return;
          }

          if (userHasReviewed) {
            toast.warning(
              'The review has already been submitted. The user can leave one review for a product.',
              {
                autoClose: 4000,
                theme: 'dark',
                toastId: 'duplicate-review-warning',
              },
            );
            setSubmitting(false);
            return;
          }

          try {
            await dispatch(addReview(values)).unwrap();
            await dispatch(getReviews({ productId, page: 0 }));

            toast.success('Review submitted!', {
              autoClose: 4000,
              theme: 'dark',
            });
            resetForm();
          } catch (error: any) {
            console.error('Error submitting review:', error);

            const errorMessage = error?.message || '';
            const errorStatus = error?.status || error?.response?.status;

            if (
              errorStatus === 409 ||
              errorStatus === 400 ||
              errorMessage.toLowerCase().includes('already') ||
              errorMessage.toLowerCase().includes('duplicate') ||
              errorMessage.toLowerCase().includes('exists')
            ) {
              toast.error(
                'The review has already been submitted. The user can leave one review for a product.',
                {
                  autoClose: 5000,
                  theme: 'dark',
                  toastId: 'duplicate-review-error',
                },
              );

              dispatch(getReviews({ productId, page: 0 }));
            } else {
              toast.error(
                errorMessage ||
                  'Something went wrong while submitting your review. Please try again later.',
                {
                  autoClose: 4000,
                  theme: 'dark',
                },
              );
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          handleChange,
          setFieldValue,
          errors,
          touched,
          isSubmitting,
        }) => {
          const leftCharactersCount = maxLength - values.text.length;
          const isButtonDisabled =
            values.rate === null || values.rate === 0 || isSubmitting;

          return (
            <Form className={style['review_leave-review']}>
              <div className={style['reviews_rate__block']}>
                <div className={style['reviews_rate']}>
                  <span>Rate:</span>
                  <Rate
                    className="reviews_rate-stars"
                    onChange={(value) => setFieldValue('rate', value)}
                    value={values.rate ?? 0}
                    tabIndex={0}
                    disabled={isSubmitting}
                    character={({ index = 0 }) => {
                      return (
                        <img
                          src={
                            index < (values.rate || 0) ? rateImg : rateEmptyImg
                          }
                          alt="product rate star"
                          width={24}
                          height={24}
                        />
                      );
                    }}
                  />
                </div>
                {errors.rate && touched.rate && (
                  <div className={classNames([style['error-message']])}>
                    <img src={ErrorIcon} alt="Error icon" />
                    {errors.rate}
                  </div>
                )}
              </div>
              <div>
                <div className={style['review_text-area-box']}>
                  <textarea
                    placeholder="Your review"
                    onChange={handleChange}
                    maxLength={maxLength}
                    value={values.text}
                    name="text"
                    disabled={isSubmitting}
                  />
                  <span
                    className={classNames(style['review_character-counter'], {
                      [style['notice']]: leftCharactersCount <= 10,
                    })}
                  >
                    {leftCharactersCount}
                  </span>
                </div>
                {errors.text && touched.text && (
                  <div className={classNames([style['error-message']])}>
                    <img src={ErrorIcon} alt="Error icon" />
                    {errors.text}
                  </div>
                )}
              </div>

              <button type="submit" disabled={isButtonDisabled}>
                Leave a review
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default FormReview;
