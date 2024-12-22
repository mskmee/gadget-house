import { object, Schema, string } from 'yup';
import { ContactsFormDto } from '../types/types';

const contactsFormValidationSchema: Schema<ContactsFormDto> = object().shape({
  fullName: string().required('Enter full name'),
  email: string().email('Wrong email format').required('Enter email'),
  phone: string().required('Phone number is required'),
  comment: string().optional().max(1000, 'Comment is too long'),
});

export { contactsFormValidationSchema };
