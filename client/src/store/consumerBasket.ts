import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import localStorageService from "../service/localStorage.service";
import { AppDispatch, RootState } from "./createStore";
import { IBasketItems } from "./models/IBasket";

interface IBasketInitialState {
  entities: IBasketItems[] | any[];
}

const initialState: IBasketInitialState = {
  entities: [],
};

const consumerBasketSlice = createSlice({
  name: "consumerBasket",
  initialState,
  reducers: {
    itemReceived: (state, action: PayloadAction<IBasketItems[]>) => {
      state.entities = action.payload;
    },
    itemAdded: (state, action: PayloadAction<IBasketItems>) => {
      state.entities.push(action.payload);
    },
    itemEdited: (state, action: PayloadAction<IBasketItems>) => {
      const editedItemIndex = state.entities.findIndex(
        (u) => u._id === action.payload._id,
      );
      state.entities[editedItemIndex] = action.payload;
    },
    itemRemoved: (state, action: PayloadAction<string>) => {
      state.entities = state.entities.filter((i) => i._id !== action.payload);
    },
    itemReset: (state) => {
      state.entities = [];
    },
    itemBackUpped: (state, action: PayloadAction<IBasketItems[]>) => {
      state.entities = action.payload;
    },
  },
});

const { reducer: consumerBasketReducer, actions } = consumerBasketSlice;
const {
  itemReceived,
  itemAdded,
  itemEdited,
  itemRemoved,
  itemReset,
  itemBackUpped,
} = actions;

export const loadBasketList = () => async (dispatch: AppDispatch) => {
  const content = localStorageService.getBasketItems();
  if (content) {
    dispatch(itemReceived(content));
  }
};

export const storeAdding =
  (payload: IBasketItems) => (dispatch: AppDispatch) => {
    dispatch(itemAdded(payload));
  };
export const editItemBasket =
  (payload: IBasketItems) => (dispatch: AppDispatch) => {
    dispatch(itemEdited(payload));
  };
export const deleteItem = (itemId: string) => (dispatch: AppDispatch) => {
  dispatch(itemRemoved(itemId));
};
export const resetBasket = () => (dispatch: AppDispatch) => {
  dispatch(itemReset());
};
export const backupBasket =
  (items: IBasketItems[]) => (dispatch: AppDispatch) => {
    dispatch(itemBackUpped(items));
  };
export const getStore = () => (state: RootState) =>
  state.consumerBasket.entities;

export default consumerBasketReducer;
