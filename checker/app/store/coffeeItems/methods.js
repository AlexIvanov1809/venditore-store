import { createSlice, createAction } from "@reduxjs/toolkit";
import methodService from "../../service/coffeeItems/method.service";

const methodsSlice = createSlice({
  name: "methods",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    methodsRequested: (state) => {
      state.isLoading = true;
    },
    methodsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    methodsRequestFeild: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    methodsCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    methodsRemoved: (state, action) => {
      state.entities = state.entities.filter((i) => i._id !== action.payload);
    }
  }
});

const { reducer: methodsReducer, actions } = methodsSlice;
const {
  methodsRequested,
  methodsReceived,
  methodsRequestFeild,
  methodsCreated,
  methodsRemoved
} = actions;

const methodsCreateRequested = createAction("methods/methodsCreateRequested");
const createMethodsFaild = createAction("methods/createMethodsFaild");

export const loadmethodsList = () => async (dispatch) => {
  dispatch(methodsRequested());
  try {
    const { content } = await methodService.get();
    dispatch(methodsReceived(content));
  } catch (error) {
    dispatch(methodsRequestFeild(error.message));
  }
};

export const methodsRemove = (itemId) => async (dispatch) => {
  try {
    const { content } = await methodService.remove(itemId);
    if (!content) {
      dispatch(methodsRemoved(itemId));
    }
  } catch (error) {
    dispatch(createMethodsFaild(error.message));
  }
};

export const createNewMethodsItem = (payload) => async (dispatch) => {
  dispatch(methodsCreateRequested());
  try {
    const { content } = await methodService.create(payload);
    dispatch(methodsCreated(content));
  } catch (error) {
    dispatch(createMethodsFaild());
  }
};

export const getMethodsList = () => (state) => state.methods.entities;
export const getMethodsLoadingStatus = () => (state) => state.methods.isLoading;
export const getMethodsError = () => (state) => state.methods.error;

export default methodsReducer;
