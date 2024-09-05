import {
  combineReducers,
  configureStore,
  ReducersMapObject,
  ThunkMiddleware,
  Tuple,
  UnknownAction,
} from '@reduxjs/toolkit';
import { cardReducer } from './slices';

type RootReducer = {
  cardReducer: ReturnType<typeof cardReducer>;
};

type ExtraArguments = {
  cardReducer: typeof cardReducer;
};

const reducers: ReducersMapObject<RootReducer> = {
  cardReducer,
};

const rootReducer = combineReducers(reducers);

class Store {
  public instance: ReturnType<
    typeof configureStore<
      RootReducer,
      UnknownAction,
      Tuple<[ThunkMiddleware<RootReducer, UnknownAction, ExtraArguments>]>
    >
  >;

  public constructor() {
    this.instance = configureStore({
      reducer: rootReducer,
      devTools: true,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {
            extraArgument: this.extraArguments,
          },
          serializableCheck: false,
        }),
    });
  }

  public get extraArguments(): ExtraArguments {
    return {
      cardReducer,
    };
  }
}

export { Store };
