import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { API_URI } from "../../constants/config";
import { errorHandler } from "../../common/errorHandler";
import { successMessage } from "../../services/sweetAlert";

export const getTransaction = createAsyncThunk(
  "transaction/getTransaction",
  async (id, { dispatch }) => {
    dispatch(showLoading());
    try {
      const response = await axios.get(`${API_URI}/api/transaction/id/${id}`);
      dispatch(transactionSlice.actions.getTransactionSuccess(response.data));
      dispatch(hideLoading());
    } catch (error) {
      errorHandler(error, dispatch, "TRANSACTION_ERROR");
    }
  }
);

export const getTransactions = createAsyncThunk(
  "transaction/getTransactions",
  async (body, { dispatch }) => {
    dispatch(showLoading());
    try {
      const response = await axios.put(`${API_URI}/api/transaction`, body);
      dispatch(transactionSlice.actions.getTransactionsSuccess(response.data));
      dispatch(hideLoading());
    } catch (error) {
      errorHandler(error, dispatch, "TRANSACTION_ERROR");
    }
  }
);

export const getTransactionsByYear = createAsyncThunk(
  "transaction/getTransactionsByYear",
  async (year, { dispatch }) => {
    dispatch(showLoading());
    try {
      const response = await axios.get(`${API_URI}/api/transaction/year/${year}`);
      dispatch(transactionSlice.actions.getTransactionsByYearSuccess(response.data));
      dispatch(hideLoading());
    } catch (error) {
      errorHandler(error, dispatch, "TRANSACTION_ERROR");
    }
  }
);

export const getTransactionsByDivision = createAsyncThunk(
  "transaction/getTransactionsByDivision",
  async ( {year, division} , { dispatch }) => {

    dispatch(showLoading());

    try {
      const response = await axios.get(`${API_URI}/api/transaction/division/${year}/${division}`);
      dispatch(transactionSlice.actions.getTransactionsByDivisionSuccess(response.data));
      dispatch(hideLoading());

    } catch (error) {
      errorHandler(error, dispatch, "TRANSACTION_ERROR");
    }
  }
);

export const closeTransaction = createAsyncThunk(
  "transaction/closeTransaction",
  async ({ id, body }, { dispatch }) => {

    dispatch(showLoading());
    let result = true;
    try {
      const response = await axios.put(`${API_URI}/api/transaction/close/${id}`, body);
      successMessage("ປີດລາຍການຄວາມສ່ຽງສໍາເລັດ");
      dispatch(transactionSlice.actions.closeTransactionSuccess(response.data));
      dispatch(hideLoading());
    } catch (error) {
      result = false;
      errorHandler(error, dispatch, "TRANSACTION_ERROR");
    }
    return { success: result };
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactions: [],
    transaction: null,
    dateType: { value: "year", name: "ປີ" },
    startDate: null,
    endDate: null,
    dataType: { value: "all", name: "ທັງໝົດ" },
    selectedYear: new Date().getFullYear(),
    selectedBranch: null,
    selectedDivision: null,
    loading: true,
    error: {},
  },
  reducers: {
    getTransactionSuccess(state, action) {
      state.transaction = action.payload.data;
      state.loading = false;
    },
    getTransactionsSuccess(state, action) {
      state.transactions = action.payload.data;
      state.transaction = null;
      state.loading = false;
    },
    getTransactionsByYearSuccess(state, action) {
      state.transactions = action.payload.data;
      state.transaction = null;
      state.loading = false;
    },
    getTransactionsByDivisionSuccess(state, action) {
      state.transactions = action.payload.data;
      state.transaction = null;
      state.loading = false;
    },
    closeTransactionSuccess(state, action) {
      const updatedTransactions = state.transactions.map((item) =>
        item._id === action.payload.data._id ? action.payload.data : item
      );
      state.transactions = updatedTransactions;
      state.transaction = action.payload.data;
      state.loading = false;
    },
    setTransactionDateType(state, action) {
      state.dateType = action.payload;
      state.loading = false;
    },
    setTransactionStartDate(state, action) {
      state.startDate = action.payload;
      state.loading = false;
    },
    setTransactionEndDate(state, action) {
      state.endDate = action.payload;
      state.loading = false;
    },
    setTransactionYear(state, action) {
      state.selectedYear = action.payload;
      state.loading = false;
    },
    setTransactionBranch(state, action) {
      state.selectedBranch = action.payload;
      state.loading = false;
    },
    setTransactionDivision(state, action) {
      state.selectedDivision = action.payload;
      state.loading = false;
    },
    setTransactionType(state, action) {
      state.dataType = action.payload;
      state.loading = false;
    },
    clearTransactionBranch(state) {
      state.selectedBranch = null;
      state.loading = false;
    },
    clearTransactionDivision(state) {
      state.selectedDivision = null;
      state.loading = false;
    },
    transactionError(state, action) {
      state.error = action.payload.error;
      state.loading = false;
    },
  },
});

export const {
  getTransactionSuccess,
  getTransactionsSuccess,
  getTransactionsByYearSuccess,
  getTransactionsByDivisionSuccess,
  closeTransactionSuccess,
  setTransactionDateType,
  setTransactionStartDate,
  setTransactionEndDate,
  setTransactionYear,
  setTransactionBranch,
  setTransactionDivision,
  setTransactionType,
  clearTransactionBranch,
  clearTransactionDivision,
  transactionError,
} = transactionSlice.actions;

export default transactionSlice.reducer;
