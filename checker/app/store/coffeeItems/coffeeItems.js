import { createSlice, createAction } from "@reduxjs/toolkit";
import coffeeItemService from "../../service/coffeeItems/coffeeItem.service";

const coffeeItemsSlice = createSlice({
  name: "coffeeItems",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    coffeeItemsRequested: (state) => {
      state.isLoading = true;
    },
    coffeeItemsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    coffeeItemsRequestFeild: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    coffeeItemCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    coffeeItemRemoved: (state, action) => {
      state.entities = state.entities.filter((i) => i._id !== action.payload);
    },
    coffeeItemUpdateSuccssed: (state, action) => {
      const editedItemIndex = state.entities.findIndex(
        (u) => u._id === action.payload._id
      );
      state.entities[editedItemIndex] = action.payload;
    }
  }
});

const { reducer: coffeeItemsReducer, actions } = coffeeItemsSlice;
const {
  coffeeItemsRequested,
  coffeeItemsReceived,
  coffeeItemsRequestFeild,
  coffeeItemRemoved,
  coffeeItemCreated,
  coffeeItemUpdateSuccssed
} = actions;

const itemCreateRequested = createAction("coffeeItems/brandCreateRequested");
const createItemFaild = createAction("coffeeItems/createItemFaild");
const itemUpdateRequested = createAction("coffeeItems/itemUpdateRequested");
const updateItemFaild = createAction("coffeeItems/updateItemFaild");

export const loadCoffeeItemsList = () => async (dispatch) => {
  dispatch(coffeeItemsRequested());
  try {
    const { content } = await coffeeItemService.get();
    dispatch(coffeeItemsReceived(content));
  } catch (error) {
    dispatch(coffeeItemsRequestFeild(error.message));
  }
};

export const createNewCoffeeItem = (payload, back) => async (dispatch) => {
  dispatch(itemCreateRequested());
  try {
    const { content } = await coffeeItemService.create(payload);
    dispatch(coffeeItemCreated(content));
    back();
  } catch (error) {
    dispatch(createItemFaild());
  }
};

export const coffeeItemRemove = (itemId, back) => async (dispatch) => {
  try {
    const { content } = await coffeeItemService.remove(itemId);
    if (!content) {
      dispatch(coffeeItemRemoved(itemId));
      back();
    }
  } catch (error) {
    dispatch(coffeeItemsRequestFeild(error.message));
  }
};

export const editCoffeeItem = (payload, navigate) => async (dispatch) => {
  dispatch(itemUpdateRequested());
  try {
    const { content } = await coffeeItemService.edit(payload);
    dispatch(coffeeItemUpdateSuccssed(content));
    navigate();
  } catch (error) {
    dispatch(updateItemFaild());
  }
};

export const getCoffeeItemById = (itemId) => (state) => {
  return state.coffeeItems.entities
    ? state.coffeeItems.entities.find((i) => i._id === itemId)
    : null;
};
export const getCoffeeItemsList = () => (state) => state.coffeeItems.entities;
export const getCoffeeItemsLoadingStatus = () => (state) =>
  state.coffeeItems.isLoading;
export const getCoffeeItemsError = () => (state) => state.coffeeItems.error;

export default coffeeItemsReducer;
