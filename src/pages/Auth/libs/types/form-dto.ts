
type LoginFormDto = {
  email: string;
  password: string;
};

type RegisterFormDto = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  passwordRepeat?: string;
};

type ForgotFormDto = {
  email: string;
};

type ChangePasswordFormDto = {
  password: string;
  confirmPassword: string;
};

type FormType = 'login' | 'register' | 'forgot';

export type { LoginFormDto, RegisterFormDto, ForgotFormDto, ChangePasswordFormDto, FormType };
