import { RegisterFormDto } from '../types/form-dto';


const REGISTER_FORM_INITIAL_VALUE: RegisterFormDto = {
  name: '',
  surname: '',
  email: '',
  phoneNumber: '',
  password: '',
  passwordRepeat: '',
};

export { REGISTER_FORM_INITIAL_VALUE };
