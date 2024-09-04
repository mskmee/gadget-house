import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';
// types
import type { RootState, AppDispatch } from '@/store/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
