import { combineReducers, configureStore } from "@reduxjs/toolkit";
import brandsReducer from "./coffeeItems/brands";
import coffeeItemsReducer from "./coffeeItems/coffeeItems";
import consumerBasketReducer from "./consumerBasket";
import countriesReducer from "./coffeeItems/countries";
import kindsReducer from "./coffeeItems/kinds";
import methodsReducer from "./coffeeItems/methods";
import teaTypesReducer from "./teaItems/teaType";
import teaItemsReducer from "./teaItems/teaItems";
import teaBrandsReducer from "./teaItems/teaBrands";
import teaPackagesReducer from "./teaItems/teaPackages";

const rootReducer = combineReducers({
  countries: countriesReducer,
  coffeeItems: coffeeItemsReducer,
  methods: methodsReducer,
  brands: brandsReducer,
  kinds: kindsReducer,
  consumerBasket: consumerBasketReducer,
  teaTypes: teaTypesReducer,
  teaItems: teaItemsReducer,
  teaBrands: teaBrandsReducer,
  teaPackages: teaPackagesReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore["dispatch"];
