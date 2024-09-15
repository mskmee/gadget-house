import { useDispatch } from 'react-redux';

import { type store } from '@/store';

const useAppDispatch: () => typeof store.instance.dispatch = () =>
  useDispatch<typeof store.instance.dispatch>();

export { useAppDispatch };
