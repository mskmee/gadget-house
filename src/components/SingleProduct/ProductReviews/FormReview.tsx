import { Rate } from 'antd';
import style from '../Product.module.scss';
import { ErrorIcon, rateEmptyImg, rateImg } from '@/assets/constants';
import classNames from 'classnames';
import { Form, Formik } from 'formik';
import { AddReviewRequestDTO } from '@/utils/packages/singleProduct/type/types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { addReview, getReviews } from '@/store/singleProduct/actions';
import { toast } from 'react-toastify';
import { reviewSchema } from './FormReview-validation';

const maxLength = 500;

function FormReview({ productId }: { productId: number }) {
  const dispatch: AppDispatch = useDispatch();

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
        onSubmit={async (values, { resetForm }) => {
          try {
            await dispatch(addReview(values))
              .unwrap()
              .then(() => {
                dispatch(getReviews({ productId, page: 0 }));
              });
            toast.success('Review submitted!', {
              type: 'success',
              autoClose: 4000,
              theme: 'dark',
            });
            resetForm();
          } catch (error: any) {
            console.log('error', error);
            toast.error(
              error?.message ||
                'Something went wrong while submitting your review.',
              {
                type: 'error',
                autoClose: 4000,
                theme: 'dark',
              },
            );
          }
        }}
      >
        {({ values, handleChange, setFieldValue, errors, touched }) => {
          const leftCharactersCount = maxLength - values.text.length;
          const isButtonDisabled = values.rate === null || values.rate === 0;
          // const isButtonDisabled = values.text.trim().length === 0 && (values.rate === null || values.rate === 0);
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
