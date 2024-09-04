import {
  configureStore,
  type Action,
  type ThunkAction,
} from '@reduxjs/toolkit';
// utils
import cardReducer from '@/store/slices';

export const store = configureStore({
  reducer: {
    cardReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
