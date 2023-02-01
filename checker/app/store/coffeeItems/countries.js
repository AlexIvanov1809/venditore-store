import { createSlice, createAction } from "@reduxjs/toolkit";
import countryService from "../../service/coffeeItems/country.service";

const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    countriesRequested: (state) => {
      state.isLoading = true;
    },
    countriesReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    countriesRequestFeild: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    countriesCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    countriesRemoved: (state, action) => {
      state.entities = state.entities.filter((i) => i._id !== action.payload);
    }
  }
});

const { reducer: countriesReducer, actions } = countriesSlice;
const {
  countriesRequested,
  countriesReceived,
  countriesRequestFeild,
  countriesCreated,
  countriesRemoved
} = actions;

const countriesCreateRequested = createAction(
  "countries/countriesCreateRequested"
);
const createCountriesFaild = createAction("countries/createCountriesFaild");

export const loadCountriesList = () => async (dispatch) => {
  dispatch(countriesRequested());
  try {
    const { content } = await countryService.get();
    dispatch(countriesReceived(content));
  } catch (error) {
    dispatch(countriesRequestFeild(error.message));
  }
};

export const countriesRemove = (itemId) => async (dispatch) => {
  try {
    const { content } = await countryService.remove(itemId);
    if (!content) {
      dispatch(countriesRemoved(itemId));
    }
  } catch (error) {
    dispatch(countriesRequestFeild(error.message));
  }
};

export const createNewCountriesItem = (payload) => async (dispatch) => {
  dispatch(countriesCreateRequested());
  try {
    const { content } = await countryService.create(payload);
    dispatch(countriesCreated(content));
  } catch (error) {
    dispatch(createCountriesFaild());
  }
};

export const getCountriesList = () => (state) => state.countries.entities;
export const getCountriesLoadingStatus = () => (state) =>
  state.countries.isLoading;
export const getCountriesError = () => (state) => state.countries.error;

export default countriesReducer;
