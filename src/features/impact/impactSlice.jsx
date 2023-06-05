import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { successMessage } from '../../services/sweetAlert';
import { API_URI } from '../../constants/config';
import { errorHandler } from '../../common/errorHandler';

export const getRiskImpacts = createAsyncThunk('impacts/getRiskImpacts', async (_, { dispatch }) => {
  dispatch(showLoading());
  try {
    const res = await axios.get(`${API_URI}/api/impacts`);
    dispatch(hideLoading());
    return res.data;
  } catch (err) {
    errorHandler(err, dispatch, IMPACT_ERROR);
    throw err;
  }
});

export const addImpact = createAsyncThunk('impacts/addImpact', async (body, { dispatch }) => {
  dispatch(showLoading());
  try {
    const res = await axios.post(`${API_URI}/api/impacts`, body);
    successMessage('ເພີ່ມຂໍ້ມູນຜົນກະທົບສໍາເລັດ');
    dispatch(hideLoading());
    return res.data;
  } catch (err) {
    errorHandler(err, dispatch, IMPACT_ERROR);
    throw err;
  }
});

export const updateImpact = createAsyncThunk('impacts/updateImpact', async ({ id, body }, { dispatch }) => {
  dispatch(showLoading());
  try {
    const res = await axios.put(`${API_URI}/api/impacts/${id}`, body);
    successMessage('ແກ້ໄຂຂໍ້ມູນຜົນກະທົບສໍາເລັດ');
    dispatch(hideLoading());
    return res.data;
  } catch (err) {
    errorHandler(err, dispatch, IMPACT_ERROR);
    throw err;
  }
});

export const deleteImpact = createAsyncThunk('impacts/deleteImpact', async (id, { dispatch }) => {
  dispatch(showLoading());
  try {
    await axios.delete(`/api/impacts/${id}`);
    successMessage('ລຶບຂໍ້ມູນຜົນກະທົບສໍາເລັດ');
    dispatch(hideLoading());
    return id;
  } catch (err) {
    errorHandler(err, dispatch, IMPACT_ERROR);
    throw err;
  }
});

const initialState = {
  impacts: [],
  impact: null,
  loading: true,
  error: {},
};

const impactSlice = createSlice({
  name: 'impact',
  initialState,
  reducers: {
    setImpact: (state, action) => {
      state.impact = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRiskImpacts.fulfilled, (state, action) => {
        state.impacts = action.payload.data;
        state.loading = false;
      })
      .addCase(addImpact.fulfilled, (state, action) => {
        state.impacts.push(action.payload.data);
        state.loading = false;
      })
      .addCase(updateImpact.fulfilled, (state, action) => {
        const index = state.impacts.findIndex((impact) => impact._id === action.payload.data._id);
        if (index !== -1) {
          state.impacts[index] = action.payload.data;
        }
        state.loading = false;
      })
      .addCase(deleteImpact.fulfilled, (state, action) => {
        state.impacts = state.impacts.filter((impact) => impact._id !== action.payload);
        state.loading = false;
      })
      .addCase(getRiskImpacts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addImpact.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateImpact.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteImpact.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setImpact } = impactSlice.actions;

export default impactSlice.reducer;
