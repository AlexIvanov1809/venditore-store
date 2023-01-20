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

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    brandsRequested: (state) => {
      state.isLoading = true;
    },
    brandsReceived: (state, action: PayloadAction<IFilters[]>) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    brandsRequestFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    brandsCreated: (state, action: PayloadAction<IFilters>) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    brandsRemoved: (state, action: PayloadAction<string>) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities = state.entities.filter((i) => i._id !== action.payload);
    },
  },
});

const { reducer: brandsReducer, actions } = brandsSlice;
const {
  brandsRequested,
  brandsReceived,
  brandsRequestFailed,
  brandsCreated,
  brandsRemoved,
} = actions;

const brandCreateRequested = createAction("brands/brandCreateRequested");
const createBrandFailed = createAction("brands/createBrandFailed");
const ENDPOINT = "itemTypes/coffeeBrand/";

export const loadBrandsList = () => async (dispatch: AppDispatch) => {
  dispatch(brandsRequested());
  try {
    const { content } = await itemTypesService.get(ENDPOINT);
    dispatch(brandsReceived(content));
  } catch (error) {
    dispatch(brandsRequestFailed((error as Error).message));
  }
};

export const brandsRemove =
  (itemId: string) => async (dispatch: AppDispatch) => {
    try {
      const { content } = await itemTypesService.remove(ENDPOINT, itemId);
      if (!content) {
        dispatch(brandsRemoved(itemId));
      }
    } catch (error) {
      dispatch(brandsRequestFailed((error as Error).message));
    }
  };

export const createNewBrandsItem =
  (payload: ICreateFilters) => async (dispatch: AppDispatch) => {
    dispatch(brandCreateRequested());
    try {
      const { content } = await itemTypesService.create(ENDPOINT, payload);
      dispatch(brandsCreated(content));
    } catch (error) {
      dispatch(createBrandFailed());
    }
  };

export const getBrandsList = () => (state: RootState) => state.brands.entities;
export const getBrandsLoadingStatus = () => (state: RootState) =>
  state.brands.isLoading;
export const getBrandsError = () => (state: RootState) => state.brands.error;

export default brandsReducer;
