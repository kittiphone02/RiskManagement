import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import setAuthToken from "../../utils/setAuthToken";
import { API_URI } from "../../constants/config";
import { errorHandler } from "../../common/errorHandler";
import { toast } from "react-toastify";


// Async Thunk for loading user
export const loadUser = createAsyncThunk(
    "auth/loadUser",
    async (_, { dispatch }) => {
      dispatch(showLoading());
  
      try {
        const token = sessionStorage.getItem("token");
        if (token) {
          setAuthToken(token);
  
          const res = await axios.get(`${API_URI}/api/auth/me`);
          dispatch(userLoaded(res.data));
        } else {
          dispatch(authError());
        }
      } catch (error) {
        errorHandler(error, dispatch, "LOAD_USER_FAIL");
      } finally {
        dispatch(hideLoading());
      }
    }
  );
  

  
  export const login = createAsyncThunk(
    "auth/login",
    async ({ username, password }, { dispatch }) => {
      dispatch(showLoading());
      try {
        const res = await axios.post(`${API_URI}/api/auth/login`, {
          username,
          password,
        });
        dispatch(loginSuccess(res.data));
        setAuthToken(res.data.token);
        toast.success("Login success");
  
        // Dispatch the loadUser action immediately after login
        dispatch(loadUser());
      } catch (err) {
        errorHandler(err, dispatch, "LOGIN_FAIL");
      } finally {
        dispatch(hideLoading());
      }
    }
  );
  




const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: sessionStorage.getItem("token"),
    isAuthenticated: false,
    loading: true,
    user: null,
  },
  reducers: {
    userLoaded: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.data;
    },
    loginSuccess: (state, action) => {
      const payload = action.payload;
      sessionStorage.setItem("token", payload.token);
      state.token = payload.token;
      state.isAuthenticated = true;
      state.loading = false;
    },
    authError: (state) => {
      sessionStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    logout: (state) => {
      sessionStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
});

export const { userLoaded, loginSuccess, authError, logout } = authSlice.actions;

export default authSlice.reducer;
