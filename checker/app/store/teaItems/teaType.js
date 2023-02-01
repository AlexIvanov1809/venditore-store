import { createSlice, createAction } from "@reduxjs/toolkit";
import teaTypeService from "../../service/teaItems/type.service";

const teaTypeSlice = createSlice({
  name: "teaTypes",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    teaTypesRequested: (state) => {
      state.isLoading = true;
    },
    teaTypesReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    teaTypesRequestFeild: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    teaTypesCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    teaTypesRemoved: (state, action) => {
      state.entities = state.entities.filter((i) => i._id !== action.payload);
    }
  }
});

const { reducer: teaTypesReducer, actions } = teaTypeSlice;
const {
  teaTypesRequested,
  teaTypesReceived,
  teaTypesRequestFeild,
  teaTypesCreated,
  teaTypesRemoved
} = actions;

const teaTypesCreateRequested = createAction(
  "teaTypes/teaTypesCreateRequested"
);
const createTeaTypesFaild = createAction("teaTypes/createTeaTypesFaild");

export const loadTeaTypesList = () => async (dispatch) => {
  dispatch(teaTypesRequested());
  try {
    const { content } = await teaTypeService.get();
    dispatch(teaTypesReceived(content));
  } catch (error) {
    dispatch(teaTypesRequestFeild(error.message));
  }
};

export const teaTypesRemove = (itemId) => async (dispatch) => {
  try {
    const { content } = await teaTypeService.remove(itemId);
    if (!content) {
      dispatch(teaTypesRemoved(itemId));
    }
  } catch (error) {
    dispatch(createTeaTypesFaild(error.message));
  }
};

export const createNewTeaTypesItem = (payload) => async (dispatch) => {
  dispatch(teaTypesCreateRequested());
  try {
    const { content } = await teaTypeService.create(payload);
    dispatch(teaTypesCreated(content));
  } catch (error) {
    dispatch(createTeaTypesFaild());
  }
};

export const getTeaTypesList = () => (state) => state.teaTypes.entities;
export const getTeaTypesLoadingStatus = () => (state) =>
  state.teaTypes.isLoading;
export const getTeaTypesError = () => (state) => state.teaTypes.error;

export default teaTypesReducer;
