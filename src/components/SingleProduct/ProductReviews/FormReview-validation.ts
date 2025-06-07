import * as Yup from 'yup';

export const reviewSchema = Yup.object().shape({
  text: Yup.string()
    .required('Review text is required')
    .min(10, 'Review is too short, must be at least 10 characters'),
  rate: Yup.number()
    .required('Rate is required')
    .min(1, 'Rate must be at least 1'),
});