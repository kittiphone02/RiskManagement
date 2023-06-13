import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { API_URI } from "../../constants/config";
import { errorHandler } from "../../common/errorHandler";
import { successMessage } from "../../services/sweetAlert";
import { ROLE_USER } from "../../constants/config";
import { enableCache } from "@iconify/react";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { dispatch }) => {
    dispatch(showLoading());
    try {
      const response = await axios.get(`${API_URI}/api/users`);
      dispatch(hideLoading());
      return response.data;
    } catch (err) {
      errorHandler(err, dispatch, USER_ERROR);
      throw err;
    }
  }
);

export const addUser = createAsyncThunk(
  "users/addUser",
  async ({ body }, { dispatch }) => {
    dispatch(showLoading());
    try {
      const response = await axios.post(`${API_URI}/api/users`, body);
      successMessage("ເພີ່ມຂໍ້ມູນຜູ້ໃຊ້ສໍາເລັດ");
      dispatch(hideLoading());
      return response.data;
    } catch (err) {
      errorHandler(err, dispatch, USER_ERROR);
      throw err;
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, body }, { dispatch }) => {
    dispatch(showLoading());
    try {
      const response = await axios.put(`${API_URI}/api/users/${id}`, body);
      successMessage("ແກ້ໄຂຂໍ້ມູນຜູ້ໃຊ້ສໍາເລັດ");
      dispatch(hideLoading());
      return response.data;
    } catch (err) {
      errorHandler(err, dispatch, USER_ERROR);
      throw err;
    }
  }
);

export const verifyUser = createAsyncThunk(
  "users/verifyUser",
  async (id, { dispatch }) => {
    dispatch(showLoading());
    try {
      const response = await axios.get(`${API_URI}/api/users/verify/${id}`);
      successMessage("ປົດລ໋ອກຜູ້ໃຊ້ສໍາເລັດ");
      dispatch(hideLoading());
      console.log(response.data);

      return response.data;
    } catch (err) {
      errorHandler(err, dispatch, USER_ERROR);
      throw err;
    }
  }
);

export const unverifyUser = createAsyncThunk(
  "users/unverifyUser",
  async (id, { dispatch }) => {
    dispatch(showLoading());
    try {
      const response = await axios.get(`${API_URI}/api/users/unverify/${id}`);
      successMessage("ລ໋ອກຜູ້ໃຊ້ສໍາເລັດ");
      dispatch(hideLoading());
      return response.data;
    } catch (err) {
      errorHandler(err, dispatch, USER_ERROR);
      throw err;
    }
  }
);

export const resetPassword = createAsyncThunk(
  "users/resetPassword",
  async ({ id, body }, { dispatch }) => {
    dispatch(showLoading());
    try {
      await axios.put(`${API_URI}/api/users/resetPassword/${id}`, body);
      successMessage("ແກ້ໄຂຂໍ້ມູນຜູ້ໃຊ້ສໍາເລັດ");
      dispatch(hideLoading());
      return { id, body };
    } catch (err) {
      errorHandler(err, dispatch, USER_ERROR);
      throw err;
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { dispatch }) => {
    dispatch(showLoading());
    try {
      await axios.delete(`${API_URI}/api/users/${id}`);
      successMessage("ລຶບຂໍ້ມູນຜູ້ໃຊ້ສໍາເລັດ");
      dispatch(hideLoading());
      // return response.data;
      return id;
    } catch (err) {
      errorHandler(err, dispatch, USER_ERROR);
      throw err;
    }
  }
);

const initialState = {
  users: [],
  filterUsers: [],
  user: null,
  userType: null,
  branch: null,
  selectedDivision: null,
  loading: true,
  error: {},
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setFilterUsers: (state, action) => {
      state.filterUsers = action.payload;
      state.loading = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
      state.loading = false;
    },
    setUserBranch: (state, action) => {
      state.branch = action.payload;
      state.loading = false;
    },
    setUserDivision: (state, action) => {
      state.selectedDivision = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload.data;
        state.loading = false;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        const newUser = action.payload.data;
        state.users.push(newUser);
        if (
          (state.userType?.value === "user" && newUser.role === ROLE_USER) ||
          (state.userType?.value !== "user" &&
            newUser.role !== ROLE_USER &&
            state.selectedDivision?._id === newUser.division?._id)
        ) {
          state.filterUsers.push(newUser);
        }
        state.loading = false;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload.data;
        state.users = state.users.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        );
        if (
          (state.userType?.value === "user" &&
            updatedUser.role === ROLE_USER) ||
          (state.userType?.value !== "user" &&
            updatedUser.role !== ROLE_USER &&
            state.selectedDivision?._id === updatedUser.division?._id)
        ) {
          state.filterUsers = state.filterUsers.map((user) =>
            user._id === updatedUser._id ? updatedUser : user
          );
        } else {
          state.filterUsers = state.filterUsers.filter(
            (user) => user._id !== updatedUser._id
          );
        }
        state.loading = false;
      })

      .addCase(verifyUser.fulfilled, (state, action) => {
        const verifiedUser = action.payload.data;
        state.users = state.users.map((user) =>
          user._id === verifiedUser._id ? verifiedUser : user
        );
        state.filterUsers = state.filterUsers.map((user) =>
          user._id === verifiedUser._id ? verifiedUser : user
        );
        state.loading = false;
      })

      .addCase(unverifyUser.fulfilled, (state, action) => {
        const unverifiedUser = action.payload.data;
        state.users = state.users.map((user) =>
          user._id === unverifiedUser._id ? unverifiedUser : user
        );
        state.filterUsers = state.filterUsers.map((user) =>
          user._id === unverifiedUser._id ? unverifiedUser : user
        );
        state.loading = false;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.filterUsers = state.filterUsers.filter(
          (item) => item._id !== deletedId
        );

        state.users = state.users.filter((user) => user._id !== deletedId);
        state.loading = false;
      })

      // .addCase(deleteUser.fulfilled, (state, action) => {
      //   const deletedUserId = action.payload.data;
      //   state.users = state.users.filter((user) => user._id !== deletedUserId);
      //   if (
      //     ((state.userType?.value === "user" &&
      //       user.role === ROLE_USER) ||
      //       (state.userType?.value !== "user" &&
      //         user.role !== ROLE_USER &&
      //         state.division?._id === user.division?._id)) &&
      //     state.filterUsers.find((user) => user._id === deletedUserId)
      //   ) {
      //     state.filterUsers = state.filterUsers.filter(
      //       (user) => user._id !== deletedUserId
      //     );
      //   }
      //   state.loading = false;
      // })
      .addCase(getUsers.rejected, (state, action) => {
        state.error = action.payload.error;
        state.loading = false;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.error = action.payload.error;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload.error;
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload.error;
        state.loading = false;
      });
  },
});

export const {
  setFilterUsers,
  setUser,
  setUserType,
  setUserBranch,
  setUserDivision,
} = usersSlice.actions;

export default usersSlice.reducer;
