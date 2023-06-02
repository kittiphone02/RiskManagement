import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { successMessage } from '../../services/sweetAlert';
import { API_URI } from '../../constants/config';
import { errorHandler } from '../../common/errorHandler';

export const getDivisions = createAsyncThunk('division/getDivisions', async (_, { dispatch }) => {
  try {
    const response = await axios.get(`${API_URI}/api/divisions`);
    return response.data;
  } catch (error) {
    errorHandler(error, dispatch, divisionSlice.name);
    throw error;
  }
});

export const getDivisionsByUser = createAsyncThunk('division/getDivisionsByUser', async (_, { dispatch }) => {
  try {
    const response = await axios.get(`${API_URI}/api/divisions/user`);
    return response.data;
  } catch (error) {
    errorHandler(error, dispatch, divisionSlice.name);
    throw error;
  }
});

export const getDivisionsByBranch = createAsyncThunk(
  'division/getDivisionsByBranch',
  async (branchId, { dispatch }) => {
    if (!branchId) {
      dispatch(resetDivision());
      return;
    }
    try {
      const response = await axios.get(`${API_URI}/api/divisions/branch/${branchId}`);
      return response.data;
    } catch (error) {
      errorHandler(error, dispatch, divisionSlice.name);
      throw error;
    }
  }
);

export const addDivision = createAsyncThunk('division/addDivision', async (body, { dispatch }) => {
  let result = true;
  try {
    const response = await axios.post(`${API_URI}/api/divisions`, body);
    successMessage('ເພີ່ມຂໍ້ມູນພະແນກສໍາເລັດ');
    return response.data;
  } catch (error) {
    result = false;
    errorHandler(error, dispatch, divisionSlice.name);
    throw error;
  } finally {
    return { success: result };
  }
});

export const updateDivision = createAsyncThunk(
  'division/updateDivision',
  async ({ id, body }, { dispatch }) => {
    let result = true;
    try {
      const response = await axios.put(`${API_URI}/api/divisions/${id}`, body);
      successMessage('ແກ້ໄຂຂໍ້ມູນພະແນກສໍາເລັດ');
      return response.data;
    } catch (error) {
      result = false;
      errorHandler(error, dispatch, divisionSlice.name);
      throw error;
    } finally {
      return { success: result };
    }
  }
);

export const deleteDivision = createAsyncThunk('division/deleteDivision', async (id, { dispatch }) => {
  let result = true;
  try {
    await axios.delete(`${API_URI}/api/divisions/${id}`);
    successMessage('ລຶບຂໍ້ມູນພະແນກສໍາເລັດ');
    return id;
  } catch (error) {
    result = false;
    errorHandler(error, dispatch, divisionSlice.name);
    throw error;
  } finally {
    return { success: result };
  }
});

export const setDivision = createAsyncThunk('division/setDivision', (division) => division);

export const setDivisionSelectedBranch = createAsyncThunk(
  'division/setDivisionSelectedBranch',
  (branch) => branch
);

const divisionSlice = createSlice({
  name: 'division',
  initialState: {
    divisions: [],
    division: null,
    selectedBranch: null,
    loading: false,
    error: {},
  },
  
  reducers: {
    resetDivision(state) {
      state.divisions = [];
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDivisions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDivisions.fulfilled, (state, action) => {
        state.divisions = action.payload.data;
        state.loading = false;
      })
      .addCase(getDivisions.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      .addCase(getDivisionsByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDivisionsByUser.fulfilled, (state, action) => {
        state.divisions = action.payload.data;
        state.loading = false;
      })
      .addCase(getDivisionsByUser.rejected, (state, action) => {
        state.error = action.error;
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
      .addCase(addDivision.pending, (state) => {
        state.loading = true;
      })
      .addCase(addDivision.fulfilled, (state, action) => {
        state.divisions.push(action.payload.data);
        state.loading = false;
      })
      .addCase(addDivision.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      .addCase(deleteDivision.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDivision.fulfilled, (state, action) => {
        const deletedDivisionId = action.payload;
        state.divisions = state.divisions.filter(
          (division) => division._id !== deletedDivisionId
        );
        state.loading = false;
      })
      .addCase(deleteDivision.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      .addCase(setDivision.fulfilled, (state, action) => {
        state.division = action.payload;
        state.loading = false;
      })
      .addCase(setDivisionSelectedBranch.fulfilled, (state, action) => {
        state.selectedBranch = action.payload;
        state.loading = false;
      });
  },
});

export const { 
  resetDivision
} = divisionSlice.actions;

export default divisionSlice.reducer;
