import { type store } from '@/store';

type AppDispatch = typeof store.instance.dispatch;

export { type AppDispatch };
