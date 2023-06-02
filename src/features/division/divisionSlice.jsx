import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { successMessage } from "../../services/sweetAlert";
import { API_URI } from "../../constants/config";
import { errorHandler } from "../../common/errorHandler";

export const getDivisions = createAsyncThunk(
  "division/getDivisions",
  async (_, { dispatch }) => {
    dispatch(showLoading());
    try {
      const response = await axios.get(`${API_URI}/api/divisions`);
      dispatch(hideLoading());
      return response.data;
    } catch (error) {
      errorHandler(error, dispatch, "division/error");
      throw error;
    }
  }
);

export const getDivisionsByUser = createAsyncThunk(
  "division/getDivisionsByUser",
  async (_, { dispatch }) => {
    dispatch(showLoading());
    try {
      const response = await axios.get(`${API_URI}/api/divisions/user`);
      dispatch(hideLoading());
      return response.data;
    } catch (error) {
      errorHandler(error, dispatch, "division/error");
      throw error;
    }
  }
);

export const getDivisionsByBranch = createAsyncThunk(
  "division/getDivisionsByBranch",
  async (branchId, { dispatch }) => {
    if (!branchId) {
      dispatch(resetDivision());
      return;
    }
    dispatch(showLoading());
    try {
      const response = await axios.get(
        `${API_URI}/api/divisions/branch/${branchId}`
      );
      dispatch(hideLoading());
      return response.data;
    } catch (error) {
      errorHandler(error, dispatch, "division/error");
      throw error;
    }
  }
);





export const addDivision = createAsyncThunk(
  "division/addDivision",
  async (body, { dispatch }) => {
    dispatch(showLoading());
    try {
      const response = await axios.post(`${API_URI}/api/divisions`, body);
      successMessage("ເພີ່ມຂໍ້ມູນພະແນກສໍາເລັດ");
      dispatch(hideLoading());
      return response.data.data; // Return only the data property
    } catch (error) {
      errorHandler(error, dispatch, "division/error");
      throw error;
    } 
  }
);

export const updateDivision = createAsyncThunk(
  "division/updateDivision",
  async ({ id, body }, { dispatch }) => {
    dispatch(showLoading());
    // let result = true;
    try {
      const response = await axios.put(
        `${API_URI}/api/divisions/${id}`,
        body
      );
      successMessage("ແກ້ໄຂຂໍ້ມູນພະແນກສໍາເລັດ");
      dispatch(hideLoading());
      return response.data.data;
    } catch (error) {
      // result = false;
      errorHandler(error, dispatch, "division/error");
      throw error;
    } 
  }
);

export const deleteDivision = createAsyncThunk(
  "division/deleteDivision",
  async (id, { dispatch }) => {
    dispatch(showLoading());
    let result = true;
    try {
      await axios.delete(`${API_URI}/api/divisions/${id}`);
      successMessage("ລຶບຂໍ້ມູນພະແນກສໍາເລັດ");
      dispatch(hideLoading());
      return id;
    } catch (error) {
      result = false;
      errorHandler(error, dispatch, "division/error");
      throw error;
    } 
  }
);

export const divisionSlice = createSlice({
  name: "division",
  initialState: {
    divisions: [],
    division: null,
    selectedBranch: null,
    loading: true,
    error: {},
  },
  reducers: {
    setDivision: (state, action) => {
      state.division = action.payload;
      state.loading = false;
    },
    setDivisionSelectedBranch: (state, action) => {
      state.selectedBranch = action.payload;
      state.loading = false;
    },
    resetDivision: (state) => {
      state.divisions = [];
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDivisions.fulfilled, (state, action) => {
        state.divisions = action.payload;
        state.loading = false;
      })
      .addCase(getDivisionsByUser.fulfilled, (state, action) => {
        state.divisions = action.payload;
        state.loading = false;
      })
      .addCase(getDivisionsByBranch.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDivisionsByBranch.fulfilled, (state, action) => {
        state.divisions = action.payload.data;
        state.loading = false;
      })
      .addCase(getDivisionsByBranch.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      .addCase(addDivision.fulfilled, (state, action) => {
        state.divisions.push(action.payload);
        state.loading = false;
      })
      .addCase(updateDivision.fulfilled, (state, action) => {
        const updatedDivision = action.payload;
        const index = state.divisions.findIndex(
          (division) => division._id === updatedDivision._id
        );
        if (index !== -1) {
          state.divisions[index] = updatedDivision;
        }
        state.division = updatedDivision; // Update the current division in state
        state.loading = false;
      })
      
      .addCase(deleteDivision.fulfilled, (state, action) => {
        const id = action.payload;
        state.divisions = state.divisions.filter(
          (division) => division._id !== id
        );
        state.loading = false;
      })
      .addCase("division/error", (state, action) => {
        state.error = action.payload.error;
        state.loading = false;
      });
  },
});

export const {
  setDivision,
  setDivisionSelectedBranch,
  resetDivision,
} = divisionSlice.actions;

export default divisionSlice.reducer;
