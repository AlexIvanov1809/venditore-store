import { createSlice } from "@reduxjs/toolkit";
import localStorageSevice from "../service/localStorage.service";

const consumerBusketSlice = createSlice({
  name: "consumerBusket",
  initialState: {
    entities: []
  },
  reducers: {
    itemRecived: (state, action) => {
      state.entities = action.payload;
    },
    itemAdded: (state, action) => {
      state.entities.push(action.payload);
    },
    itemEdited: (state, action) => {
      const editedItemIndex = state.entities.findIndex(
        (u) => u._id === action.payload._id
      );
      state.entities[editedItemIndex] = action.payload;
    },
    itemRemoved: (state, action) => {
      state.entities = state.entities.filter((i) => i._id !== action.payload);
    },
    itemReset: (state) => {
      state.entities = [];
    },
    itemBackuped: (state, action) => {
      state.entities = action.payload;
    }
  }
});

const { reducer: consumerBusketreducer, actions } = consumerBusketSlice;
const {
  itemRecived,
  itemAdded,
  itemEdited,
  itemRemoved,
  itemReset,
  itemBackuped
} = actions;

export const loadBasketList = () => async (dispatch) => {
  const content = localStorageSevice.getBasketItems();
  if (content) {
    dispatch(itemRecived(content));
  }
};

export const storeAdding = (payload) => (dispatch) => {
  dispatch(itemAdded(payload));
};
export const editItemBasket = (payload) => (dispatch) => {
  dispatch(itemEdited(payload));
};
export const deleteItem = (itemId) => (dispatch) => {
  dispatch(itemRemoved(itemId));
};
export const resetBasket = () => (dispatch) => {
  dispatch(itemReset());
};
export const backupBasket = (items) => (dispatch) => {
  dispatch(itemBackuped(items));
};
export const getStore = () => (state) => state.consumerBusket.entities;

export default consumerBusketreducer;
