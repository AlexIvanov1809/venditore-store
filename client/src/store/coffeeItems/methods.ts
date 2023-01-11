import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import methodService from "../../service/coffeeItems/method.service";
import { AppDispatch, RootState } from "../createStore";
import { IFiltersInitialState, IFilters } from "../models/IFilters";

const initialState: IFiltersInitialState = {
  entities: null,
  isLoading: true,
  error: null,
};

const methodsSlice = createSlice({
  name: "methods",
  initialState,
  reducers: {
    methodsRequested: (state) => {
      state.isLoading = true;
    },
    methodsReceived: (state, action: PayloadAction<IFilters[]>) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    methodsRequestFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    methodsCreated: (state, action: PayloadAction<IFilters>) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    methodsRemoved: (state, action: PayloadAction<string>) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities = state.entities.filter((i) => i._id !== action.payload);
    },
  },
});

const { reducer: methodsReducer, actions } = methodsSlice;
const {
  methodsRequested,
  methodsReceived,
  methodsRequestFailed,
  methodsCreated,
  methodsRemoved,
} = actions;

const methodsCreateRequested = createAction("methods/methodsCreateRequested");
const createMethodsFailed = createAction("methods/createMethodsFailed");

export const loadMethodsList = () => async (dispatch: AppDispatch) => {
  dispatch(methodsRequested());
  try {
    const { content } = await methodService.get();
    dispatch(methodsReceived(content));
  } catch (error) {
    dispatch(methodsRequestFailed((error as Error).message));
  }
};

export const methodsRemove =
  (itemId: string) => async (dispatch: AppDispatch) => {
    try {
      const { content } = await methodService.remove(itemId);
      if (!content) {
        dispatch(methodsRemoved(itemId));
      }
    } catch (error) {
      dispatch(createMethodsFailed());
    }
  };

export const createNewMethodsItem =
  (payload: IFilters) => async (dispatch: AppDispatch) => {
    dispatch(methodsCreateRequested());
    try {
      const { content } = await methodService.create(payload);
      dispatch(methodsCreated(content));
    } catch (error) {
      dispatch(createMethodsFailed());
    }
  };

export const getMethodsList = () => (state: RootState) =>
  state.methods.entities;
export const getMethodsLoadingStatus = () => (state: RootState) =>
  state.methods.isLoading;
export const getMethodsError = () => (state: RootState) => state.methods.error;

export default methodsReducer;
