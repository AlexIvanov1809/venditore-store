import { createSlice, createAction } from "@reduxjs/toolkit";
import teaBrandsService from "../../service/teaItems/brands.service";

const teaBrandSlice = createSlice({
  name: "teaBrands",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    teaBrandsRequested: (state) => {
      state.isLoading = true;
    },
    teaBrandsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    teaBrandsRequestFeild: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    teaBrandsCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    teaBrandsRemoved: (state, action) => {
      state.entities = state.entities.filter((i) => i._id !== action.payload);
    }
  }
});

const { reducer: teaBrandsReducer, actions } = teaBrandSlice;
const {
  teaBrandsRequested,
  teaBrandsReceived,
  teaBrandsRequestFeild,
  teaBrandsCreated,
  teaBrandsRemoved
} = actions;

const teaBrandsCreateRequested = createAction(
  "teaBrands/teaBrandsCreateRequested"
);
const createTeaBrandsFaild = createAction("teaBrands/createTeaBrandsFaild");

export const loadTeaBrandsList = () => async (dispatch) => {
  dispatch(teaBrandsRequested());
  try {
    const { content } = await teaBrandsService.get();
    dispatch(teaBrandsReceived(content));
  } catch (error) {
    dispatch(teaBrandsRequestFeild(error.message));
  }
};

export const teaBrandsRemove = (itemId) => async (dispatch) => {
  try {
    const { content } = await teaBrandsService.remove(itemId);
    if (!content) {
      dispatch(teaBrandsRemoved(itemId));
    }
  } catch (error) {
    dispatch(createTeaBrandsFaild(error.message));
  }
};

export const createNewTeaBrandsItem = (payload) => async (dispatch) => {
  dispatch(teaBrandsCreateRequested());
  try {
    const { content } = await teaBrandsService.create(payload);
    dispatch(teaBrandsCreated(content));
  } catch (error) {
    dispatch(createTeaBrandsFaild());
  }
};

export const getTeaBrandsList = () => (state) => state.teaBrands.entities;
export const getTeaBrandsLoadingStatus = () => (state) =>
  state.teaBrands.isLoading;
export const getTeaBrandsError = () => (state) => state.teaBrands.error;

export default teaBrandsReducer;
