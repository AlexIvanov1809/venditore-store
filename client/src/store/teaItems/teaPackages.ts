import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import teaPackagesService from "../../service/teaItems/package.service";
import { AppDispatch, RootState } from "../createStore";
import { IFiltersInitialState, IFilters } from "../models/IFilters";

const initialState: IFiltersInitialState = {
  entities: null,
  isLoading: true,
  error: null,
};

const teaPackageSlice = createSlice({
  name: "teaPackages",
  initialState,
  reducers: {
    teaPackagesRequested: (state) => {
      state.isLoading = true;
    },
    teaPackagesReceived: (state, action: PayloadAction<IFilters[]>) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    teaPackagesRequestFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    teaPackagesCreated: (state, action: PayloadAction<IFilters>) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    teaPackagesRemoved: (state, action: PayloadAction<string>) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities = state.entities.filter((i) => i._id !== action.payload);
    },
  },
});

const { reducer: teaPackagesReducer, actions } = teaPackageSlice;
const {
  teaPackagesRequested,
  teaPackagesReceived,
  teaPackagesRequestFailed,
  teaPackagesCreated,
  teaPackagesRemoved,
} = actions;

const teaPackagesCreateRequested = createAction(
  "teaPackages/teaPackagesCreateRequested",
);
const createTeaPackagesFailed = createAction(
  "teaPackages/createTeaPackagesFailed",
);

export const loadTeaPackagesList = () => async (dispatch: AppDispatch) => {
  dispatch(teaPackagesRequested());
  try {
    const { content } = await teaPackagesService.get();
    dispatch(teaPackagesReceived(content));
  } catch (error) {
    dispatch(teaPackagesRequestFailed((error as Error).message));
  }
};

export const teaPackagesRemove =
  (itemId: string) => async (dispatch: AppDispatch) => {
    try {
      const { content } = await teaPackagesService.remove(itemId);
      if (!content) {
        dispatch(teaPackagesRemoved(itemId));
      }
    } catch (error) {
      dispatch(createTeaPackagesFailed());
    }
  };

export const createNewTeaPackagesItem =
  (payload: IFilters) => async (dispatch: AppDispatch) => {
    dispatch(teaPackagesCreateRequested());
    try {
      const { content } = await teaPackagesService.create(payload);
      dispatch(teaPackagesCreated(content));
    } catch (error) {
      dispatch(createTeaPackagesFailed());
    }
  };

export const getTeaPackagesList = () => (state: RootState) =>
  state.teaPackages.entities;
export const getTeaPackagesLoadingStatus = () => (state: RootState) =>
  state.teaPackages.isLoading;
export const getTeaPackagesError = () => (state: RootState) =>
  state.teaPackages.error;

export default teaPackagesReducer;
