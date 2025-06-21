import * as Yup from 'yup';

export const reviewSchema = Yup.object().shape({
  rate: Yup.number()
    .required('Rate is required')
    .min(1, 'Rate must be at least 1'),
});