import { createSlice, createAction } from "@reduxjs/toolkit";
import kindService from "../../service/coffeeItems/kind.service";

const kindsSlice = createSlice({
  name: "kinds",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    kindsRequested: (state) => {
      state.isLoading = true;
    },
    kindsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    kindsRequestFeild: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    kindsCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    kindsRemoved: (state, action) => {
      state.entities = state.entities.filter((i) => i._id !== action.payload);
    }
  }
});

const { reducer: kindsReducer, actions } = kindsSlice;
const {
  kindsRequested,
  kindsReceived,
  kindsRequestFeild,
  kindsCreated,
  kindsRemoved
} = actions;

const kindsCreateRequested = createAction("kinds/kindsCreateRequested");
const createKindsFaild = createAction("kinds/createKindsFaild");

export const loadkindsList = () => async (dispatch) => {
  dispatch(kindsRequested());
  try {
    const { content } = await kindService.get();
    dispatch(kindsReceived(content));
  } catch (error) {
    dispatch(kindsRequestFeild(error.message));
  }
};

export const kindsRemove = (itemId) => async (dispatch) => {
  try {
    const { content } = await kindService.remove(itemId);
    if (!content) {
      dispatch(kindsRemoved(itemId));
    }
  } catch (error) {
    dispatch(createKindsFaild(error.message));
  }
};

export const createNewKindsItem = (payload) => async (dispatch) => {
  dispatch(kindsCreateRequested());
  try {
    const { content } = await kindService.create(payload);
    dispatch(kindsCreated(content));
  } catch (error) {
    dispatch(createKindsFaild());
  }
};

export const getKindsList = () => (state) => state.kinds.entities;
export const getKindsLoadingStatus = () => (state) => state.kinds.isLoading;
export const getKindsError = () => (state) => state.kinds.error;

export default kindsReducer;
