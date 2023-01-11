import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import kindService from "../../service/coffeeItems/kind.service";
import { AppDispatch, RootState } from "../createStore";
import { IFiltersInitialState, IFilters } from "../models/IFilters";

const initialState: IFiltersInitialState = {
  entities: null,
  isLoading: true,
  error: null,
};

const kindsSlice = createSlice({
  name: "kinds",
  initialState,
  reducers: {
    kindsRequested: (state) => {
      state.isLoading = true;
    },
    kindsReceived: (state, action: PayloadAction<IFilters[]>) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    kindsRequestFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    kindsCreated: (state, action: PayloadAction<IFilters>) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    kindsRemoved: (state, action: PayloadAction<string>) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities = state.entities.filter((i) => i._id !== action.payload);
    },
  },
});

const { reducer: kindsReducer, actions } = kindsSlice;
const {
  kindsRequested,
  kindsReceived,
  kindsRequestFailed,
  kindsCreated,
  kindsRemoved,
} = actions;

const kindsCreateRequested = createAction("kinds/kindsCreateRequested");
const createKindsFailed = createAction("kinds/createKindsFailed");

export const loadKindsList = () => async (dispatch: AppDispatch) => {
  dispatch(kindsRequested());
  try {
    const { content } = await kindService.get();
    dispatch(kindsReceived(content));
  } catch (error) {
    dispatch(kindsRequestFailed((error as Error).message));
  }
};

export const kindsRemove =
  (itemId: string) => async (dispatch: AppDispatch) => {
    try {
      const { content } = await kindService.remove(itemId);
      if (!content) {
        dispatch(kindsRemoved(itemId));
      }
    } catch (error) {
      dispatch(kindsRequestFailed((error as Error).message));
    }
  };

export const createNewKindsItem =
  (payload: IFilters) => async (dispatch: AppDispatch) => {
    dispatch(kindsCreateRequested());
    try {
      const { content } = await kindService.create(payload);
      dispatch(kindsCreated(content));
    } catch (error) {
      dispatch(createKindsFailed());
    }
  };

export const getKindsList = () => (state: RootState) => state.kinds.entities;
export const getKindsLoadingStatus = () => (state: RootState) =>
  state.kinds.isLoading;
export const getKindsError = () => (state: RootState) => state.kinds.error;

export default kindsReducer;
