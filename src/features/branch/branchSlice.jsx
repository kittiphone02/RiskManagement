import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { errorHandler } from "../../common/errorHandler";
import { API_URI } from "../../constants/config";
import { successMessage } from "../../services/sweetAlert";

export const getBranches = createAsyncThunk(
  "branch/getBranches",
  async (_, { dispatch }) => {
    dispatch(showLoading());
    try {
      const response = await axios.get(`${API_URI}/api/branches`);
      dispatch(branchSlice.actions.getBranchesSuccess(response.data));
      dispatch(hideLoading());
    } catch (error) {
      errorHandler(error, dispatch, "BRANCH_ERROR");
    }
  }
);

export const getBranch = createAsyncThunk(
  "branch/getBranch",
  async (id, { dispatch }) => {
    dispatch(showLoading());
    try {
      const response = await axios.get(`${API_URI}/api/branches/${id}`);
      dispatch(branchSlice.actions.getBranchSuccess(response.data));
      dispatch(hideLoading());
    } catch (error) {
      errorHandler(error, dispatch, "BRANCH_ERROR");
    }
  }
);

export const addBranch = createAsyncThunk(
  "branch/addBranch",
  async (body, { dispatch }) => {
    dispatch(showLoading());
    try {
      const response = await axios.post(`${API_URI}/api/branches`, body);
      dispatch(branchSlice.actions.addBranchSuccess(response.data));
      successMessage("ເພີ່ມຂໍ້ມູນສາຂາສໍາເລັດ");
      dispatch(hideLoading());
      return { success: true };
    } catch (error) {
      errorHandler(error, dispatch, "BRANCH_ERROR");
      return { success: false };
    }
  }
);

export const updateBranch = createAsyncThunk(
  "branch/updateBranch",
  async ({ id, body }, { dispatch }) => {
    dispatch(showLoading());
    try {
      const response = await axios.put(
        `${API_URI}/api/branches/${id}`,
        body
      );
      dispatch(branchSlice.actions.updateBranchSuccess(response.data));
      successMessage("ແກ້ໄຂຂໍ້ມູນສາຂາສໍາເລັດ");
      dispatch(hideLoading());
      return { success: true };
    } catch (error) {
      errorHandler(error, dispatch, "BRANCH_ERROR");
      return { success: false };
    }
  }
);

export const deleteBranch = createAsyncThunk(
  "branch/deleteBranch",
  async (id, { dispatch }) => {
    dispatch(showLoading());
    try {
      await axios.delete(`${API_URI}/api/branches/${id}`);
      dispatch(branchSlice.actions.deleteBranchSuccess(id));
      successMessage("ລຶບຂໍ້ມູນສາຂາສໍາເລັດ");
      dispatch(hideLoading());
      return { success: true };
    } catch (error) {
      errorHandler(error, dispatch, "BRANCH_ERROR");
      return { success: false };
    }
  }
);

const branchSlice = createSlice({
  name: "branch",
  initialState: {
    branches: [],
    branch: null,
    loading: true,
    error: {},
  },
  reducers: {
    getBranchesSuccess: (state, action) => {
      state.branches = action.payload.data;
      state.loading = false;
    },
    getBranchSuccess: (state, action) => {
      state.branch = action.payload.data;
      state.loading = false;
    },
    addBranchSuccess: (state, action) => {
      state.branches.push(action.payload.data);
      state.loading = false;
    },
    updateBranchSuccess: (state, action) => {
      const updatedBranch = action.payload.data;
      state.branches = state.branches.map((branch) =>
        branch._id === updatedBranch._id ? updatedBranch : branch
      );
    },
    deleteBranchSuccess: (state, action) => {
      const deletedId = action.payload;
      state.branches = state.branches.filter((item) => item._id !== deletedId);
      state.loading = false;
    },
  },
});

export const {
    getBranchesSuccess,
    getBranchSuccess,
    addBranchSuccess,
    updateBranchSuccess,
    deleteBranchSuccess,
  } = branchSlice.actions;
  
  export default branchSlice.reducer;
