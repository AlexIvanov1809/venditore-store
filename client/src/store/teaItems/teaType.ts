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

const teaTypeSlice = createSlice({
  name: "teaTypes",
  initialState,
  reducers: {
    teaTypesRequested: (state) => {
      state.isLoading = true;
    },
    teaTypesReceived: (state, action: PayloadAction<IFilters[]>) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    teaTypesRequestFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    teaTypesCreated: (state, action: PayloadAction<IFilters>) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    teaTypesRemoved: (state, action: PayloadAction<string>) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities = state.entities.filter((i) => i._id !== action.payload);
    },
  },
});

const { reducer: teaTypesReducer, actions } = teaTypeSlice;
const {
  teaTypesRequested,
  teaTypesReceived,
  teaTypesRequestFailed,
  teaTypesCreated,
  teaTypesRemoved,
} = actions;

const teaTypesCreateRequested = createAction(
  "teaTypes/teaTypesCreateRequested",
);
const createTeaTypesFailed = createAction("teaTypes/createTeaTypesFailed");
const ENDPOINT = "itemTypes/teaType/";

export const loadTeaTypesList = () => async (dispatch: AppDispatch) => {
  dispatch(teaTypesRequested());
  try {
    const { content } = await itemTypesService.get(ENDPOINT);
    dispatch(teaTypesReceived(content));
  } catch (error) {
    dispatch(teaTypesRequestFailed((error as Error).message));
  }
};

export const teaTypesRemove =
  (itemId: string) => async (dispatch: AppDispatch) => {
    try {
      const { content } = await itemTypesService.remove(ENDPOINT, itemId);
      if (!content) {
        dispatch(teaTypesRemoved(itemId));
      }
    } catch (error) {
      dispatch(createTeaTypesFailed());
    }
  };

export const createNewTeaTypesItem =
  (payload: ICreateFilters) => async (dispatch: AppDispatch) => {
    dispatch(teaTypesCreateRequested());
    try {
      const { content } = await itemTypesService.create(ENDPOINT, payload);
      dispatch(teaTypesCreated(content));
    } catch (error) {
      dispatch(createTeaTypesFailed());
    }
  };

export const getTeaTypesList = () => (state: RootState) =>
  state.teaTypes.entities;
export const getTeaTypesLoadingStatus = () => (state: RootState) =>
  state.teaTypes.isLoading;
export const getTeaTypesError = () => (state: RootState) =>
  state.teaTypes.error;

export default teaTypesReducer;
