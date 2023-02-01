import { createSlice, createAction } from "@reduxjs/toolkit";
import teaItemService from "../../service/teaItems/teaItem.service";

const coffeeItemsSlice = createSlice({
  name: "teaItems",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    teaItemsRequested: (state) => {
      state.isLoading = true;
    },
    teaItemsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    teaItemsRequestFeild: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    teaItemCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    teaItemRemoved: (state, action) => {
      state.entities = state.entities.filter((i) => i._id !== action.payload);
    },
    teaItemUpdateSuccssed: (state, action) => {
      const editedItemIndex = state.entities.findIndex(
        (u) => u._id === action.payload._id
      );
      state.entities[editedItemIndex] = action.payload;
    }
  }
});

const { reducer: teaItemsReducer, actions } = coffeeItemsSlice;
const {
  teaItemsRequested,
  teaItemsReceived,
  teaItemsRequestFeild,
  teaItemCreated,
  teaItemRemoved,
  teaItemUpdateSuccssed
} = actions;

const itemCreateRequested = createAction("coffeeItems/brandCreateRequested");
const createItemFaild = createAction("coffeeItems/createItemFaild");
const itemUpdateRequested = createAction("coffeeItems/itemUpdateRequested");
const updateItemFaild = createAction("coffeeItems/updateItemFaild");

export const loadTeaItemsList = () => async (dispatch) => {
  dispatch(teaItemsRequested());
  try {
    const { content } = await teaItemService.get();
    dispatch(teaItemsReceived(content));
  } catch (error) {
    dispatch(teaItemsRequestFeild(error.message));
  }
};

export const createNewTeaItem = (payload, back) => async (dispatch) => {
  dispatch(itemCreateRequested());
  try {
    const { content } = await teaItemService.create(payload);
    dispatch(teaItemCreated(content));
    back();
  } catch (error) {
    dispatch(createItemFaild());
  }
};

export const teaItemRemove = (itemId) => async (dispatch) => {
  try {
    const { content } = await teaItemService.remove(itemId);
    if (!content) {
      dispatch(teaItemRemoved(itemId));
    }
  } catch (error) {
    dispatch(teaItemsRequestFeild(error.message));
  }
};

export const editTeaItem = (payload, navigate) => async (dispatch) => {
  dispatch(itemUpdateRequested());
  try {
    const { content } = await teaItemService.edit(payload);
    dispatch(teaItemUpdateSuccssed(content));
    navigate();
  } catch (error) {
    dispatch(updateItemFaild());
  }
};

export const getTeaItemById = (itemId) => (state) => {
  return state.teaItems.entities
    ? state.teaItems.entities.find((i) => i._id === itemId)
    : null;
};
export const getTeaItemsList = () => (state) => state.teaItems.entities;
export const getTeaItemsLoadingStatus = () => (state) =>
  state.teaItems.isLoading;
export const getTeaItemsError = () => (state) => state.teaItems.error;

export default teaItemsReducer;
