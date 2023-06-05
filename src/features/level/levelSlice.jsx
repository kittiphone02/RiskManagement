import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { successMessage } from "../../services/sweetAlert";
import { API_URI } from "../../constants/config";
import { errorHandler } from "../../common/errorHandler";

export const getRiskLevel = () => async (dispatch) => {
  dispatch(showLoading());
  try {
    const res = await axios.get(`${API_URI}/api/levels`);
    dispatch(levelSlice.actions.getLevels(res.data));
    dispatch(hideLoading());
  } catch (err) {
    errorHandler(err, dispatch, levelSlice.actions.levelError(err));
  }
};

export const addLevel = (body) => async (dispatch) => {
  dispatch(showLoading());
  let result = true;
  try {
    const res = await axios.post(`${API_URI}/api/levels`, body);
    dispatch(levelSlice.actions.addLevel(res.data));
    successMessage("ເພີ່ມຂໍ້ມູນລະດັບຄວາມສ່ຽງສໍາເລັດ");
    dispatch(hideLoading());
  } catch (err) {
    result = false;
    errorHandler(err, dispatch, levelSlice.actions.levelError(err));
  }
  return { success: result };
};

export const updateLevel = (id, body) => async (dispatch) => {
  dispatch(showLoading());
  let result = true;
  try {
    const res = await axios.put(`${API_URI}/api/levels/${id}`, body);
    dispatch(levelSlice.actions.updateLevel(res.data));
    successMessage("ແກ້ໄຂຂໍ້ມູນລະດັບຄວາມສ່ຽງສໍາເລັດ");
    dispatch(hideLoading());
  } catch (err) {
    result = false;
    errorHandler(err, dispatch, levelSlice.actions.levelError(err));
  }
  return { success: result };
};

export const deleteLevel = (id) => async (dispatch) => {
  dispatch(showLoading());
  let result = true;
  try {
    await axios.delete(`${API_URI}/api/levels/${id}`);
    dispatch(levelSlice.actions.deleteLevel(id));
    successMessage("ລຶບຂໍ້ມູນລະດັບຄວາມສ່ຽງສໍາເລັດ");
    dispatch(hideLoading());
  } catch (err) {
    result = false;
    errorHandler(err, dispatch, levelSlice.actions.levelError(err));
  }
  return { success: result };
};

const levelSlice = createSlice({
  name: "level",
  initialState: {
    levels: [],
    level: null,
    loading: true,
    error: {},
  },
  reducers: {
    getLevels: (state, action) => {
      state.levels = action.payload.data;
      state.loading = false;
    },
    addLevel: (state, action) => {
      state.levels.push(action.payload.data);
      state.loading = false;
    },
    updateLevel: (state, action) => {
      state.levels = state.levels.map((level) =>
        level._id === action.payload.data._id ? action.payload.data : level
      );
      state.loading = false;
    },
    deleteLevel: (state, action) => {
      state.levels = state.levels.filter((level) => level._id !== action.payload);
      state.loading = false;
    },
    levelError: (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    },
  },
});

export const { setLevel } = levelSlice.actions;

export default levelSlice.reducer;
