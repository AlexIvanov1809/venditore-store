import { combineReducers, configureStore } from "@reduxjs/toolkit";
import brandsReducer from "./coffeeItems/brands";
import coffeeItemsReducer from "./coffeeItems/coffeeItems";
import consumerBusketreducer from "./consumerBasket";
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
  consumerBusket: consumerBusketreducer,
  teaTypes: teaTypesReducer,
  teaItems: teaItemsReducer,
  teaBrands: teaBrandsReducer,
  teaPackages: teaPackagesReducer
});

export function createStore() {
  return configureStore({
    reducer: rootReducer
  });
}
