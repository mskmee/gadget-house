type ChangePasswordRequestDto = {
  token: string | null;
  password: string;
  confirmPassword: string;
};

export type { ChangePasswordRequestDto };