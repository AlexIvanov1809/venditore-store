import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import teaBrandsService from "../../service/teaItems/brands.service";
import { AppDispatch, RootState } from "../createStore";
import { IFiltersInitialState, IFilters } from "../models/IFilters";

const initialState: IFiltersInitialState = {
  entities: null,
  isLoading: true,
  error: null,
};

const teaBrandSlice = createSlice({
  name: "teaBrands",
  initialState,
  reducers: {
    teaBrandsRequested: (state) => {
      state.isLoading = true;
    },
    teaBrandsReceived: (state, action: PayloadAction<IFilters[]>) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    teaBrandsRequestFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    teaBrandsCreated: (state, action: PayloadAction<IFilters>) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    teaBrandsRemoved: (state, action: PayloadAction<string>) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities = state.entities.filter((i) => i._id !== action.payload);
    },
  },
});

const { reducer: teaBrandsReducer, actions } = teaBrandSlice;
const {
  teaBrandsRequested,
  teaBrandsReceived,
  teaBrandsRequestFailed,
  teaBrandsCreated,
  teaBrandsRemoved,
} = actions;

const teaBrandsCreateRequested = createAction(
  "teaBrands/teaBrandsCreateRequested",
);
const createTeaBrandsFailed = createAction("teaBrands/createTeaBrandsFailed");

export const loadTeaBrandsList = () => async (dispatch: AppDispatch) => {
  dispatch(teaBrandsRequested());
  try {
    const { content } = await teaBrandsService.get();
    dispatch(teaBrandsReceived(content));
  } catch (error) {
    dispatch(teaBrandsRequestFailed((error as Error).message));
  }
};

export const teaBrandsRemove =
  (itemId: string) => async (dispatch: AppDispatch) => {
    try {
      const { content } = await teaBrandsService.remove(itemId);
      if (!content) {
        dispatch(teaBrandsRemoved(itemId));
      }
    } catch (error) {
      dispatch(createTeaBrandsFailed());
    }
  };

export const createNewTeaBrandsItem =
  (payload: IFilters) => async (dispatch: AppDispatch) => {
    dispatch(teaBrandsCreateRequested());
    try {
      const { content } = await teaBrandsService.create(payload);
      dispatch(teaBrandsCreated(content));
    } catch (error) {
      dispatch(createTeaBrandsFailed());
    }
  };

export const getTeaBrandsList = () => (state: RootState) =>
  state.teaBrands.entities;
export const getTeaBrandsLoadingStatus = () => (state: RootState) =>
  state.teaBrands.isLoading;
export const getTeaBrandsError = () => (state: RootState) =>
  state.teaBrands.error;

export default teaBrandsReducer;
