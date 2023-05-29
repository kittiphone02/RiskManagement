import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showLoading, hideLoading } from "react-redux-loading-bar";

import { errorHandler } from "../../common/errorHandler";
import { API_URI } from "../../constants/config";

export const getRiskLikelihoods = createAsyncThunk(
  "likelihoods/getRiskLikelihoods",
  async (_, { dispatch }) => {
    dispatch(showLoading());
    try {
      const response = await axios.get(`${API_URI}/api/likelihoods`);
      dispatch(
        likelihoodsSlice.actions.getRiskLikelihoodsSuccess(response.data)
      );
      dispatch(hideLoading());
    } catch (error) {
      errorHandler(error, dispatch, "BRANCH_ERROR");
    }
  }
);



export const addLikelihood = createAsyncThunk(
  "likelihood/AddLikelihood",
  async (body, { dispatch }) => {
    dispatch(showLoading());
    try {
      const response = await axios.post(`${API_URI}/api/likelihoods`, body);
      dispatch(
        likelihoodsSlice.actions.AddLikelihoodSuccess(response.data)
      );
      successMessage("ເພີ່ມຂໍ້ມູນສາຂາສໍາເລັດ");
      dispatch(hideLoading());
      return { success: true };
    } catch (error) {
      errorHandler(error, dispatch, "Risklikelihood_ERROR");
      return { success: false };
    }
  }
);

const likelihoodsSlice = createSlice({
  name: "likelihood",
  initialState: {
    likelihoods: [],
    likelihood: null,
    loading: true,
    error: {},
  },
  reducers: {
    getRiskLikelihoodsSuccess: (state, action) => {
      state.likelihoods = action.payload.data;
      state.loading = false;
    },
  },
  reducer: {
    AddLikelihoodSuccess: (state, action) => {
      state.likelihoods.push(action.payload);
      state.loading = false;
    },
  },
});

export const { getRiskLikelihoodsSuccess, AddLikelihoodSuccess } =
  likelihoodsSlice.actions;

export default likelihoodsSlice.reducer;
