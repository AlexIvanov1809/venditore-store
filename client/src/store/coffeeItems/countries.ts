import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import itemTypesService from "../../service/itemTypes.service";
import { AppDispatch, RootState } from "../createStore";
import {
  IFiltersInitialState,
  IFilters,
  ICreateFilters,
} from "../models/IFilters";

const initialState: IFiltersInitialState = {
  entities: null,
  isLoading: true,
  error: null,
};

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    countriesRequested: (state) => {
      state.isLoading = true;
    },
    countriesReceived: (state, action: PayloadAction<IFilters[]>) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    countriesRequestFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    countriesCreated: (state, action: PayloadAction<IFilters>) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    countriesRemoved: (state, action: PayloadAction<string>) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities = state.entities.filter((i) => i._id !== action.payload);
    },
  },
});

const { reducer: countriesReducer, actions } = countriesSlice;
const {
  countriesRequested,
  countriesReceived,
  countriesRequestFailed,
  countriesCreated,
  countriesRemoved,
} = actions;

const countriesCreateRequested = createAction(
  "countries/countriesCreateRequested",
);
const createCountriesFailed = createAction("countries/createCountriesFailed");
const ENDPOINT = "itemTypes/coffeeCountry/";

export const loadCountriesList = () => async (dispatch: AppDispatch) => {
  dispatch(countriesRequested());
  try {
    const { content } = await itemTypesService.get(ENDPOINT);
    dispatch(countriesReceived(content));
  } catch (error) {
    dispatch(countriesRequestFailed((error as Error).message));
  }
};

export const countriesRemove =
  (itemId: string) => async (dispatch: AppDispatch) => {
    try {
      const { content } = await itemTypesService.remove(ENDPOINT, itemId);
      if (!content) {
        dispatch(countriesRemoved(itemId));
      }
    } catch (error) {
      dispatch(countriesRequestFailed((error as Error).message));
    }
  };

export const createNewCountriesItem =
  (payload: ICreateFilters) => async (dispatch: AppDispatch) => {
    dispatch(countriesCreateRequested());
    try {
      const { content } = await itemTypesService.create(ENDPOINT, payload);
      dispatch(countriesCreated(content));
    } catch (error) {
      dispatch(createCountriesFailed());
    }
  };

export const getCountriesList = () => (state: RootState) =>
  state.countries.entities;
export const getCountriesLoadingStatus = () => (state: RootState) =>
  state.countries.isLoading;
export const getCountriesError = () => (state: RootState) =>
  state.countries.error;

export default countriesReducer;
