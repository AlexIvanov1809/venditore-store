import { createSlice, createAction } from "@reduxjs/toolkit";
import teaPackagesService from "../../service/teaItems/package.service";

const teaPackageSlice = createSlice({
  name: "teaPackages",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    teaPackagesRequested: (state) => {
      state.isLoading = true;
    },
    teaPackagesReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    teaPackagesRequestFeild: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    teaPackagesCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    teaPackagesRemoved: (state, action) => {
      state.entities = state.entities.filter((i) => i._id !== action.payload);
    }
  }
});

const { reducer: teaPackagesReducer, actions } = teaPackageSlice;
const {
  teaPackagesRequested,
  teaPackagesReceived,
  teaPackagesRequestFeild,
  teaPackagesCreated,
  teaPackagesRemoved
} = actions;

const teaPackagesCreateRequested = createAction(
  "teaPackages/teaPackagesCreateRequested"
);
const createTeaPackagesFaild = createAction(
  "teaPackages/createTeaPackagesFaild"
);

export const loadTeaPackagesList = () => async (dispatch) => {
  dispatch(teaPackagesRequested());
  try {
    const { content } = await teaPackagesService.get();
    dispatch(teaPackagesReceived(content));
  } catch (error) {
    dispatch(teaPackagesRequestFeild(error.message));
  }
};

export const teaPackagesRemove = (itemId) => async (dispatch) => {
  try {
    const { content } = await teaPackagesService.remove(itemId);
    if (!content) {
      dispatch(teaPackagesRemoved(itemId));
    }
  } catch (error) {
    dispatch(createTeaPackagesFaild(error.message));
  }
};

export const createNewTeaPackagesItem = (payload) => async (dispatch) => {
  dispatch(teaPackagesCreateRequested());
  try {
    const { content } = await teaPackagesService.create(payload);
    dispatch(teaPackagesCreated(content));
  } catch (error) {
    dispatch(createTeaPackagesFaild());
  }
};

export const getTeaPackagesList = () => (state) => state.teaPackages.entities;
export const getTeaPackagesLoadingStatus = () => (state) =>
  state.teaPackages.isLoading;
export const getTeaPackagesError = () => (state) => state.teaPackages.error;

export default teaPackagesReducer;
