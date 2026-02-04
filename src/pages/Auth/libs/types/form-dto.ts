
type LoginFormDto = {
  email: string;
  password: string;
};

type RegisterFormDto = {
  fullName: string;
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

type LoginPermissionFormDto = {
  fullName: string;
  email: string;
  password: string;
};
type FormType = 'login' | 'register' | 'forgot' | 'changePassword' | 'login-permission';

export type { LoginFormDto, RegisterFormDto, ForgotFormDto, ChangePasswordFormDto, FormType, LoginPermissionFormDto };
