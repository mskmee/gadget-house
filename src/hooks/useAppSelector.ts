import { type TypedUseSelectorHook, useSelector } from 'react-redux';

import { type store } from '@/store';

const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.instance.getState>
> = useSelector;

export { useAppSelector };
