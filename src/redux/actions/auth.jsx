import axios from "axios";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { setAlert } from "./alert";
import { successMessage } from "../../services/sweetAlert";
import * as types from "../types/types";
import setAuthToken from "../../utils/setAuthToken";
import { API_URI } from "../../constants/config";
import { errorHandler } from "../../services/errHandler";

// Load user
export const loadUser = () => async (dispatch) => {
  dispatch(showLoading());
  const token = sessionStorage.getItem("token");
  if (token) {
    setAuthToken(token);

    try {
      const res = await axios.get(`${API_URI}/api/auth/me`);
      dispatch({ type: types.USER_LOADED, payload: res.data });
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      if (error.message === "Network Error") {
        dispatch(setAlert("ERROR", error.message, "red", 15000));
      }

      if (error.response) {
        console.log(error.response.data);
        dispatch(setAlert("ERROR", error.response.data.error, "red", 15000));
        dispatch({ type: types.AUTH_ERROR });
      }
      dispatch(hideLoading());
    }
  } else {
    dispatch({ type: types.AUTH_ERROR });
    dispatch(hideLoading());
  }
};

// Login user
export const login = ({ username, password }) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const res = await axios.post(`${API_URI}/api/auth/login`, { username, password });
    dispatch({ type: types.LOGIN_SUCCESS, payload: res.data });
    setAuthToken(res.data.token);
    dispatch(hideLoading());
  } catch (err) {
    errorHandler(err, dispatch, types.LOGIN_FAIL);
  }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: types.LOGOUT });
};
