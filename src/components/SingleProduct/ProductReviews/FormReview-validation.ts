import * as Yup from 'yup';

export const reviewSchema = Yup.object().shape({
  rate: Yup.number()
    .min(1, 'Please provide a rating')
    .required('Please provide a rating'),
  text: Yup.string()
    .max(500, 'Your review is too long') 
    // .nullable(),
    .notRequired(), 
});

// export const reviewSchema = Yup.object().shape({
//   rate: Yup.number()
//     .required('Rate is required')
//     .min(1, 'Rate must be at least 1'),
// });