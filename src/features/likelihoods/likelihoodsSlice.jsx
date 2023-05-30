import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { successMessage } from "../../services/sweetAlert";
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
      successMessage("ເພີ່ມຂໍ້ມູນlikelihoodສໍາເລັດ");
      dispatch(hideLoading());
      return { success: true };
    } catch (error) {
      errorHandler(error, dispatch, "Risklikelihood_ERROR");
      return { success: false };
    }
  }
);


export const deleteLikelihoods = createAsyncThunk(
  "likelihoods/deleteLikelihoods",
  async (id, { dispatch }) => {
    dispatch(showLoading());
    try {
      await axios.delete(`${API_URI}/api/likelihoods/${id}`);
      dispatch(likelihoodsSlice.actions.deleteLikelihoodsSuccess(id));
      successMessage("ລຶບຂໍ້ມູນlikelihoodສໍາເລັດ");
      dispatch(hideLoading());
      return { success: true };
    } catch (error) {
      errorHandler(error, dispatch, "BRANCH_ERROR");
      return { success: false };
    }
  }
);


export const updateLikelihoods = createAsyncThunk(
  "Likelihoods/updateLikelihoods",
  async ({ id, body }, { dispatch }) => {
    dispatch(showLoading());
    try {
      const response = await axios.put(
        `${API_URI}/api/likelihoods/${id}`,
        body
      );
      dispatch(likelihoodsSlice.actions.updateLikelihoodsSuccess(response.data));
      successMessage("ແກ້ໄຂຂໍ້ມູນlikelihoodສໍາເລັດ");
      dispatch(hideLoading());
      return { success: true };
    } catch (error) {
      errorHandler(error, dispatch, "Likelihoods_ERROR");
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
      AddLikelihoodSuccess: (state, action) => {
        const newLikelihood = action.payload.data;
        state.likelihoods.push(newLikelihood);
        state.loading = false;
      },     
      deleteLikelihoodsSuccess: (state, action) => {
        const deletedId = action.payload;
        state.likelihoods = state.likelihoods.filter((item) => item._id !== deletedId);
        state.loading = false;
      },
      updateLikelihoodsSuccess: (state, action) => {
        const updatedLikelihoods = action.payload.data;
        state.likelihoods = state.likelihoods.map((Likelihoods) =>
        Likelihoods._id === updatedLikelihoods._id ? updatedLikelihoods : Likelihoods
        );
      },
    },
  });
  
  export const {
    getRiskLikelihoodsSuccess,
    AddLikelihoodSuccess,
    deleteLikelihoodsSuccess,
    updateLikelihoodsSuccess,
  } = likelihoodsSlice.actions; 
  
  export default likelihoodsSlice.reducer;
