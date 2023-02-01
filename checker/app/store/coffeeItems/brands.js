import { createSlice, createAction } from "@reduxjs/toolkit";
import brandService from "../../service/coffeeItems/brand.service";

const brandsSlice = createSlice({
  name: "brands",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    brandsRequested: (state) => {
      state.isLoading = true;
    },
    brandsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    brandsRequestFeild: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    brandsCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    brandsRemoved: (state, action) => {
      state.entities = state.entities.filter((i) => i._id !== action.payload);
    }
  }
});

const { reducer: brandsReducer, actions } = brandsSlice;
const {
  brandsRequested,
  brandsReceived,
  brandsRequestFeild,
  brandsCreated,
  brandsRemoved
} = actions;

const brandCreateRequested = createAction("brands/brandCreateRequested");
const createBrandFaild = createAction("brands/createBrandFaild");

export const loadbrandsList = () => async (dispatch) => {
  dispatch(brandsRequested());
  try {
    const { content } = await brandService.get();
    dispatch(brandsReceived(content));
  } catch (error) {
    dispatch(brandsRequestFeild(error.message));
  }
};

export const brandsRemove = (itemId) => async (dispatch) => {
  try {
    const { content } = await brandService.remove(itemId);
    if (!content) {
      dispatch(brandsRemoved(itemId));
    }
  } catch (error) {
    dispatch(brandsRequestFeild(error.message));
  }
};

export const createNewBrandsItem = (payload) => async (dispatch) => {
  dispatch(brandCreateRequested());
  try {
    const { content } = await brandService.create(payload);
    dispatch(brandsCreated(content));
  } catch (error) {
    dispatch(createBrandFaild());
  }
};

export const getBrandsList = () => (state) => state.brands.entities;
export const getBrandsLoadingStatus = () => (state) => state.brands.isLoading;
export const getBrandsError = () => (state) => state.brands.error;

export default brandsReducer;
