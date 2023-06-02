import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { successMessage } from '../../services/sweetAlert';
import { API_URI } from '../../constants/config';
import { errorHandler } from '../../common/errorHandler';

export const getRiskMeasures = createAsyncThunk(
  'measures/getRiskMeasures',
  async (page, { dispatch }) => {
    dispatch(showLoading());
    try {
      const response = await axios.get(`${API_URI}/api/measures?page=${page}&limit=10`);
      dispatch(hideLoading());
      return response.data;
    } catch (err) {
      errorHandler(err, dispatch, 'measure');
      throw err;
    }
  }
);

export const addMeasure = createAsyncThunk(
  'measures/addMeasure',
  async (body, { dispatch }) => {
    dispatch(showLoading());
    try {
      await axios.post(`${API_URI}/api/measures`, body);
      successMessage('ເພີ່ມຂໍ້ມູນການປະເມີນຄວາມສ່ຽງສໍາເລັດ');
      dispatch(hideLoading());
    } catch (err) {
      errorHandler(err, dispatch, 'measure');
      throw err;
    }
  }
);

export const updateMeasure = createAsyncThunk(
  'measures/updateMeasure',
  async ({ id, body }, { dispatch }) => {
    dispatch(showLoading());
    try {
      const response = await axios.put(`${API_URI}/api/measures/${id}`, body);
      successMessage('ແກ້ໄຂຂໍ້ມູນການປະເມີນຄວາມສ່ຽງສໍາເລັດ');
      dispatch(hideLoading());
      return response.data;
    } catch (err) {
      errorHandler(err, dispatch, 'measure');
      throw err;
    }
  }
);

export const deleteMeasure = createAsyncThunk(
  'measures/deleteMeasure',
  async (id, { dispatch }) => {
    dispatch(showLoading());
    try {
      await axios.delete(`${API_URI}/api/measures/${id}`);
      successMessage('ລຶບຂໍ້ມູນການປະເມີນຄວາມສ່ຽງສໍາເລັດ');
      dispatch(hideLoading());
      return id;
    } catch (err) {
      errorHandler(err, dispatch, 'measure');
      throw err;
    }
  }
);

const measureSlice = createSlice({
  name: 'measures',
  initialState: {
    measures: [],
    measure: null,
    pagination: null,
    total: 0,
    loading: true,
    error: {},
  },
  reducers: {
    setMeasure: (state, action) => {
      state.measure = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRiskMeasures.fulfilled, (state, action) => {
        state.measures = action.payload.data;
        state.pagination = action.payload.pagination;
        state.total = action.payload.total;
        state.loading = false;
      })
      .addCase(addMeasure.fulfilled, (state, action) => {
        state.measures.push(action.payload.data);
        state.loading = false;
      })
      .addCase(updateMeasure.fulfilled, (state, action) => {
        const updatedMeasure = action.payload.data;
        const index = state.measures.findIndex((measure) => measure._id === updatedMeasure._id);
        if (index !== -1) {
          state.measures[index] = updatedMeasure;
        }
        state.loading = false;
      })
      .addCase(deleteMeasure.fulfilled, (state, action) => {
        state.measures = state.measures.filter((measure) => measure._id !== action.payload);
        state.loading = false;
      })
      .addCase(getRiskMeasures.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addMeasure.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateMeasure.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteMeasure.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setMeasure } = measureSlice.actions;

export default measureSlice.reducer;
