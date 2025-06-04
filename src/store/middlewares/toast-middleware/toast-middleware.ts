import { Bounce, toast, ToastOptions } from 'react-toastify';
import { Middleware, isRejected } from '@reduxjs/toolkit';
import { isDevelopment } from '@/constants/IsDevelopment';
import { AuthorizationError } from '@/utils/packages/http/libs/exceptions/authorization-error';
import { authActions } from '@/store/auth';

const toastConfig: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark',
  transition: Bounce,
};

const showToast = (
  message: string,
  type: 'success' | 'error' | 'info' | 'warning',
) => {
  toast[type](message, toastConfig);
};

const handleStandardError = (error: unknown) => {
  if (typeof error === 'string') {
    return isDevelopment && toast.error(error);
  }

  showToast(
    error instanceof Error ? error.message : 'An unexpected error occurred',
    'error',
  );
};

const toastMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action: unknown) => {
    if (isRejected(action)) {
      const error = action.error;

      if (AuthorizationError.isAuthorizationError(error)) {
        dispatch(authActions.logout());
        showToast(error.message, 'error');
        return next(action);
      }

      handleStandardError(error);
    }

    return next(action);
  };

export { toastMiddleware };
