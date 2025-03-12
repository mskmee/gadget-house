import { ForgotFormDto, LoginFormDto, RegisterFormDto } from "../types/form-dto";

export const checkIsReady = (form: Partial<LoginFormDto | RegisterFormDto | ForgotFormDto>): boolean => {
  return Object.values(form).every((value) => value.trim() !== '');
};
