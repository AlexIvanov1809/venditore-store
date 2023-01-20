import { ICoffeeItem } from "./../models/ICoffeeItem";
import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import coffeeItemService from "../../service/coffeeItem.service";
import { AppDispatch, RootState } from "../createStore";

interface ICoffeeItemsState {
  entities: ICoffeeItem[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ICoffeeItemsState = {
  entities: null,
  isLoading: true,
  error: null,
};

const coffeeItemsSlice = createSlice({
  name: "coffeeItems",
  initialState,
  reducers: {
    coffeeItemsRequested: (state) => {
      state.isLoading = true;
    },
    coffeeItemsReceived: (state, action: PayloadAction<ICoffeeItem[]>) => {
      state.isLoading = false;
      state.entities = action.payload;
    },
    coffeeItemsRequestFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    coffeeItemCreated: (state, action: PayloadAction<ICoffeeItem>) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    coffeeItemRemoved: (state, action: PayloadAction<string>) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities = state.entities.filter((i) => i._id !== action.payload);
    },
    coffeeItemUpdateSucceeded: (state, action: PayloadAction<ICoffeeItem>) => {
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

const { reducer: coffeeItemsReducer, actions } = coffeeItemsSlice;
const {
  coffeeItemsRequested,
  coffeeItemsReceived,
  coffeeItemsRequestFailed,
  coffeeItemRemoved,
  coffeeItemCreated,
  coffeeItemUpdateSucceeded,
} = actions;

const itemCreateRequested = createAction("coffeeItems/brandCreateRequested");
const createItemFailed = createAction("coffeeItems/createItemFailed");
const itemUpdateRequested = createAction("coffeeItems/itemUpdateRequested");
const updateItemFailed = createAction("coffeeItems/updateItemFailed");

export const loadCoffeeItemsList = () => async (dispatch: AppDispatch) => {
  dispatch(coffeeItemsRequested());
  try {
    const { content } = await coffeeItemService.get();
    dispatch(coffeeItemsReceived(content));
  } catch (error) {
    dispatch(coffeeItemsRequestFailed((error as Error).message));
  }
};

export const createNewCoffeeItem =
  (payload: ICoffeeItem, back: Function) => async (dispatch: AppDispatch) => {
    dispatch(itemCreateRequested());
    try {
      const { content } = await coffeeItemService.create(payload);
      dispatch(coffeeItemCreated(content));
      back();
    } catch (error) {
      dispatch(createItemFailed());
    }
  };

export const coffeeItemRemove =
  (itemId: string, back: Function) => async (dispatch: AppDispatch) => {
    try {
      const { content } = await coffeeItemService.remove(itemId);
      if (!content) {
        dispatch(coffeeItemRemoved(itemId));
        back();
      }
    } catch (error) {
      dispatch(coffeeItemsRequestFailed((error as Error).message));
    }
  };

export const editCoffeeItem =
  (payload: ICoffeeItem, navigate: Function) =>
  async (dispatch: AppDispatch) => {
    dispatch(itemUpdateRequested());
    try {
      const { content } = await coffeeItemService.edit(payload);
      dispatch(coffeeItemUpdateSucceeded(content));
      navigate();
    } catch (error) {
      dispatch(updateItemFailed());
    }
  };

export const getCoffeeItemById = (itemId: string) => (state: RootState) => {
  return state.coffeeItems.entities
    ? state.coffeeItems.entities.find((i) => i._id === itemId)
    : null;
};
export const getCoffeeItemsList = () => (state: RootState) =>
  state.coffeeItems.entities;
export const getCoffeeItemsLoadingStatus = () => (state: RootState) =>
  state.coffeeItems.isLoading;
export const getCoffeeItemsError = () => (state: RootState) =>
  state.coffeeItems.error;

export default coffeeItemsReducer;
