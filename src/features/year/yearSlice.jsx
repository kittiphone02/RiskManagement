import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { API_URI } from "../../constants/config";
import { errorHandler } from "../../common/errorHandler";

export const getYears = createAsyncThunk("year/getYears", async (_, { dispatch }) => {
  dispatch(showLoading());
  try {
    const response = await axios.get(`${API_URI}/api/years`);
    dispatch(yearSlice.actions.getYearsSuccess(response.data));
    dispatch(hideLoading());
  } catch (error) {
    errorHandler(error, dispatch, "YEARS_ERROR");
  }
});

const yearSlice = createSlice({
  name: "year",
  initialState: {
    years: [],
    currentYear: new Date().getFullYear(),
    loading: true,
    error: {},
  },
  reducers: {
    getYearsSuccess: (state, action) => {
      state.years = action.payload.data;
      state.loading = false;
    },
    yearsError: (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    },
  },
});

export const { yearsError } = yearSlice.actions;

export default yearSlice.reducer;
