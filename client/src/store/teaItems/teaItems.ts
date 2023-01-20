import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import teaItemService from "../../service/teaItem.service";
import { AppDispatch, RootState } from "../createStore";
import { ITeaItem } from "../models/ITeaItem";

interface ITeaItemsState {
  entities: ITeaItem[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ITeaItemsState = {
  entities: null,
  isLoading: true,
  error: null,
};

const coffeeItemsSlice = createSlice({
  name: "teaItems",
  initialState,
  reducers: {
    teaItemsRequested: (state) => {
      state.isLoading = true;
    },
    teaItemsReceived: (state, action: PayloadAction<ITeaItem[]>) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    teaItemsRequestFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    teaItemCreated: (state, action: PayloadAction<ITeaItem>) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    teaItemRemoved: (state, action: PayloadAction<string>) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities = state.entities.filter((i) => i._id !== action.payload);
    },
    teaItemUpdateSucceeded: (state, action: PayloadAction<ITeaItem>) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      const editedItemIndex = state.entities.findIndex(
        (u) => u._id === action.payload._id,
      );
      state.entities[editedItemIndex] = action.payload;
    },
  },
});

const { reducer: teaItemsReducer, actions } = coffeeItemsSlice;
const {
  teaItemsRequested,
  teaItemsReceived,
  teaItemsRequestFailed,
  teaItemCreated,
  teaItemRemoved,
  teaItemUpdateSucceeded,
} = actions;

const itemCreateRequested = createAction("coffeeItems/brandCreateRequested");
const createItemFailed = createAction("coffeeItems/createItemFailed");
const itemUpdateRequested = createAction("coffeeItems/itemUpdateRequested");
const updateItemFailed = createAction("coffeeItems/updateItemFailed");

export const loadTeaItemsList = () => async (dispatch: AppDispatch) => {
  dispatch(teaItemsRequested());
  try {
    const { content } = await teaItemService.get();
    dispatch(teaItemsReceived(content));
  } catch (error) {
    dispatch(teaItemsRequestFailed((error as Error).message));
  }
};

export const createNewTeaItem =
  (payload: ITeaItem, back: Function) => async (dispatch: AppDispatch) => {
    dispatch(itemCreateRequested());
    try {
      const { content } = await teaItemService.create(payload);
      dispatch(teaItemCreated(content));
      back();
    } catch (error) {
      dispatch(createItemFailed());
    }
  };

export const teaItemRemove =
  (itemId: string) => async (dispatch: AppDispatch) => {
    try {
      const { content } = await teaItemService.remove(itemId);
      if (!content) {
        dispatch(teaItemRemoved(itemId));
      }
    } catch (error) {
      dispatch(teaItemsRequestFailed((error as Error).message));
    }
  };

export const editTeaItem =
  (payload: ITeaItem, navigate: Function) => async (dispatch: AppDispatch) => {
    dispatch(itemUpdateRequested());
    try {
      const { content } = await teaItemService.edit(payload);
      dispatch(teaItemUpdateSucceeded(content));
      navigate();
    } catch (error) {
      dispatch(updateItemFailed());
    }
  };

export const getTeaItemById = (itemId: string) => (state: RootState) => {
  return state.teaItems.entities
    ? state.teaItems.entities.find((i) => i._id === itemId)
    : null;
};
export const getTeaItemsList = () => (state: RootState) =>
  state.teaItems.entities;
export const getTeaItemsLoadingStatus = () => (state: RootState) =>
  state.teaItems.isLoading;
export const getTeaItemsError = () => (state: RootState) =>
  state.teaItems.error;

export default teaItemsReducer;
