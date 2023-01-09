import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { coffeeBrandAPI } from "../service/coffeeItems/brand.service";
import { coffeeItemAPI } from "../service/coffeeItems/coffeeItem.service";

const rootReducer = combineReducers({
  [coffeeItemAPI.reducerPath]: coffeeItemAPI.reducer,
  [coffeeBrandAPI.reducerPath]: coffeeBrandAPI.reducer,
});

export const createStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(
        coffeeItemAPI.middleware,
        coffeeBrandAPI.middleware,
      );
    },
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore["dispatch"];
