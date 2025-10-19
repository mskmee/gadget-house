import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import {
  openAuthRequired,
  AuthRequiredType,
} from '@/store/auth/authPortalsSlice';

export const useAuthRequired = () => {
  const dispatch: AppDispatch = useDispatch();

  const triggerAuthRequired = (type: AuthRequiredType) => {
    dispatch(openAuthRequired(type));
  };

  return { triggerAuthRequired };
};
