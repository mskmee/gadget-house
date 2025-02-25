type LoginFormDto = {
  email: string;
  password: string;
};

type RegisterFormDto = {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  password: string;
  passwordRepeat: string;
};

type ForgotFormDto = {
  email: string;
  password?: string;
  passwordRepeat?: string;
};

type FormType = "login" | "register" | "forgot";

export type { LoginFormDto, RegisterFormDto, ForgotFormDto, FormType };