// Alert Types
export const SET_ALERT = "SET_ALERT";
export const REMOVE_ALERT = "REMOVE_ALERT";
// Auth Types
export const USER_LOADED = "USER_LOADED";
export const UPDATE_AUTH = "UPDATE_AUTH";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
// User
export const GET_ADMINS = "GET_ADMINS";
export const SET_ADMIN = "SET_ADMIN";
export const ADD_ADMIN = "ADD_ADMIN";
export const UPDATE_ADMIN = "UPDATE_ADMIN";
export const DELETE_ADMIN = "DELETE_ADMIN";
export const ADMIN_ERROR = "ADMIN_ERROR";
// User
export const GET_USERS = "GET_USERS";
export const SET_USER = "SET_USER";
export const SET_FILTER_USERS = "SET_FILTER_USERS";
export const SET_USER_TYPE = "SET_USER_TYPE";
export const SET_USER_BRANCH = "SET_USER_BRANCH";
export const SET_USER_DIVISION = "SET_USER_DIVISION";
export const ADD_USER = "ADD_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";
export const USER_ERROR = "USER_ERROR";
// BRANCH
export const GET_BRANCHES = "GET_BRANCHES";
export const GET_BRANCH = "GET_BRANCH";
export const ADD_BRANCH = "ADD_BRANCH";
export const UPDATE_BRANCH = "UPDATE_BRANCH";
export const DELEETE_BRANCH = "DELEETE_BRANCH";
export const BRANCH_ERROR = "BRANCH_ERROR";
// DIVISION
export const GET_DIVISIONS = "GET_DIVISIONS";
export const RESET_DIVISION = "RESET_DIVISION";
export const SET_DIVISION = "SET_DIVISION";
export const SET_DIVISION_SELECTED_BRANCH = "SET_DIVISION_SELECTED_BRANCH";
export const GET_DIVISION_BY_BRANCH = "GET_DIVISION_BY_BRANCH";
export const ADD_DIVISION = "ADD_DIVISION";
export const UPDATE_DIVISION = "UPDATE_DIVISION";
export const DELETE_DIVISION = "DELETE_DIVISION";
export const CLEAR_DIVISION = "CLEAR_DIVISION";
export const DIVISION_ERROR = "DIVISION_ERROR";
// Risk Impact
export const GET_IMPACTS = "GET_IMPACTS";
export const GET_IMPACT = "GET_IMPACT";
export const SET_IMPACT = "SET_IMPACT";
export const ADD_IMPACT = "ADD_IMPACT";
export const UPPDATE_IMPACT = "UPPDATE_IMPACT";
export const DELETE_IMPACT = "DELETE_IMPACT";
export const IMPACT_ERROR = "IMPACT_ERROR";
// Risk Impact
export const GET_LIKELIHOODS = "GET_LIKELIHOODS";
export const GET_LIKELIHOOD = "GET_LIKELIHOOD";
export const SET_LIKELIHOOD = "SET_LIKELIHOOD";
export const ADD_LIKELIHOOD = "ADD_LIKELIHOOD";
export const UPDATE_LIKELIHOOD = "UPDATE_LIKELIHOOD";
export const DELETE_LIKELIHOOD = "DELETE_LIKELIHOOD";
export const LIKELIHOOD_ERROR = "LIKELIHOOD_ERROR";
// Risk Level
export const GET_LEVELS = "GET_LEVELS";
export const GET_LEVEL = "GET_LEVEL";
export const SET_LEVEL = "SET_LEVEL";
export const ADD_LEVEL = "ADD_LEVEL";
export const UPDATE_LEVEL = "UPDATE_LEVEL";
export const DELETE_LEVEL = "DELETE_LEVEL";
export const LEVEL_ERROR = "LEVEL_ERROR";
// Risk Measure
export const GET_MEASURES = "GET_MEASURES";
export const SET_MEASURE = "SET_MEASURE";
export const SET_MEASURE_LOADING = "SET_MEASURE_LOADING";
export const ADD_MEASURE = "ADD_MEASURE";
export const UPDATE_MEASURE = "UPDATE_MEASURE";
export const DELETE_MEASURE = "DELETE_MEASURE";
export const MEASURE_ERROR = "MEASURE_ERROR";
// Risk Impact
export const GET_YEARS = "GET_YEARS";
export const YEARS_ERROR = "YEARS_ERROR";
// Product Types
export const GET_REGISTER_BY_USER = "GET_REGISTER_BY_USER";
export const GET_REGISTER_BY_DATE = "GET_REGISTER_BY_DATE";
export const GET_REGISTER_BY_DIVISION = "GET_REGISTER_BY_DIVISION";
export const GET_REGISTER = "GET_REGISTER";
export const GET_REGISTER_ID = "GET_REGISTER_ID";
export const ADD_REGISTER = "ADD_REGISTER";
export const SET_REGISTER_DATE_TYPE = "SET_REGISTER_DATE";
export const SET_REGISTER_START_DATE = "SET_REGISTER_START_DATE";
export const SET_REGISTER_END_DATE = "SET_REGISTER_END_DATE";
export const SET_REGISTER_YEAR = "SET_REGISTER_YEAR";
export const SET_REGISTER_BRANCH = "SET_REGISTER_BRANCH";
export const SET_REGISTER_DIVISION = "SET_REGISTER_DIVISION";
export const SET_REGISTER_TYPE = "SET_REGISTER_TYPE";
export const CLEAR_REGISTER_BRANCH = "CLEAR_REGISTER_BRANCH";
export const CLEAR_REGISTER_DIVISION = "CLEAR_REGISTER_DIVISION";
export const UPDATE_REGISTER = "UPDATE_REGISTER";
export const UPDATE_REGISTER_RISK_STATUS = "UPDATE_REGISTER_RISK_STATUS";
export const VERIFY_REGISTER = "VERIFY_REGISTER";
export const APPROVE_REGISTER = "APPROVE_REGISTER";
export const CONFIRM_REGISTER = "CONFIRM_REGISTER";
export const UNRELEVANT_REGISTER = "UNRELEVANT_REGISTER";
export const DELETE_REGISTER = "DELETE_REGISTER";
export const REGISTER_ERROR = "REGISTER_ERROR";
// Transaction Types
export const GET_TRANSACTION = "GET_TRANSACTION";
export const GET_TRANSACTIONS = "GET_TRANSACTIONS";
export const GET_TRANSACTIONS_BY_DIVISION = "GET_TRANSACTIONS_BY_DIVISION";
export const GET_TRANSACTIONS_YEAR = "GET_TRANSACTIONS_YEAR";
export const SET_TRANSACTION_DATE_TYPE = "SET_TRANSACTION_DATE";
export const SET_TRANSACTION_START_DATE = "SET_TRANSACTION_START_DATE";
export const SET_TRANSACTION_END_DATE = "SET_TRANSACTION_END_DATE";
export const SET_TRANSACTION_YEAR = "SET_TRANSACTION_YEAR";
export const SET_TRANSACTION_BRANCH = "SET_TRANSACTION_BRANCH";
export const SET_TRANSACTION_DIVISION = "SET_TRANSACTION_DIVISION";
export const SET_TRANSACTION_TYPE = "SET_TRANSACTION_TYPE";
export const CLEAR_TRANSACTION_BRANCH = "CLEAR_TRANSACTION_BRANCH";
export const CLEAR_TRANSACTION_DIVISION = "CLEAR_TRANSACTION_DIVISION";
export const UPDATE_TRANSACTION = "UPDATE_TRANSACTION";
export const TRANSACTION_ERROR = "TRANSACTION_ERROR";
// Unrelevant Types
export const GET_UNRELEVANT = "GET_UNRELEVANT";
export const GET_UNRELEVANTS = "GET_UNRELEVANTS";
export const GET_UNRELEVANTS_BY_DIVISION = "GET_UNRELEVANTS_BY_DIVISION";
export const GET_UNRELEVANTS_YEAR = "GET_UNRELEVANTS_YEAR";
export const SET_UNRELEVANT_DATE_TYPE = "SET_UNRELEVANT_DATE";
export const SET_UNRELEVANT_START_DATE = "SET_UNRELEVANT_START_DATE";
export const SET_UNRELEVANT_END_DATE = "SET_UNRELEVANT_END_DATE";
export const SET_UNRELEVANT_YEAR = "SET_UNRELEVANT_YEAR";
export const SET_UNRELEVANT_BRANCH = "SET_UNRELEVANT_BRANCH";
export const SET_UNRELEVANT_DIVISION = "SET_UNRELEVANT_DIVISION";
export const SET_UNRELEVANT_TYPE = "SET_UNRELEVANT_TYPE";
export const CLEAR_UNRELEVANT_BRANCH = "CLEAR_UNRELEVANT_BRANCH";
export const CLEAR_UNRELEVANT_DIVISION = "CLEAR_UNRELEVANT_DIVISION";
export const UPDATE_UNRELEVANT = "UPDATE_UNRELEVANT";
export const VERIFY_UNRELEVANT = "VERIFY_UNRELEVANT";
export const DELETE_UNRELEVANT = "DELETE_UNRELEVANT";
// 1st Line Report
export const GET_1ST_REPORT = "GET_1ST_REPORT";
export const GET_1ST_REPORT_YEAR = "GET_1ST_REPORT_YEAR";
export const GET_1ST_REPORT_DIVISION = "GET_1ST_REPORT_DIVISION";
export const SET_1ST_REPORT_DATA_TYPE = "SET_1ST_REPORT_DATA_TYPE";
export const SET_1ST_REPORT_DATE_TYPE = "SET_1ST_REPORT_DATE";
export const SET_1ST_REPORT_START_DATE = "SET_1ST_REPORT_START_DATE";
export const SET_1ST_REPORT_END_DATE = "SET_1ST_REPORT_END_DATE";
export const SET_1ST_REPORT_YEAR = "SET_1ST_REPORT_YEAR";
export const SET_1ST_REPORT_BRANCH = "SET_1ST_REPORT_BRANCH";
export const SET_1ST_REPORT_DIVISION = "SET_1ST_REPORT_DIVISION";
export const SET_1ST_REPORT_STATUS = "SET_1ST_REPORT_STATUS";
export const SET_1ST_REPORT_DISABLED = "SET_1ST_REPORT_DISABLED";
export const CLEAR_1ST_REPORT_DIVISION = "CLEAR_1ST_REPORT_DIVISION";
// 2nd Line Report
export const GET_2ND_REPORT = "GET_2ND_REPORT";
export const GET_2ND_REPORT_YEAR = "GET_2ND_REPORT_YEAR";
export const GET_2ND_REPORT_DIVISION = "GET_2ND_REPORT_DIVISION";
export const SET_2ND_REPORT_DATA_TYPE = "SET_2ND_REPORT_DATA_TYPE";
export const SET_2ND_REPORT_DATE_TYPE = "SET_2ND_REPORT_DATE";
export const SET_2ND_REPORT_START_DATE = "SET_2ND_REPORT_START_DATE";
export const SET_2ND_REPORT_END_DATE = "SET_2ND_REPORT_END_DATE";
export const SET_2ND_REPORT_YEAR = "SET_2ND_REPORT_YEAR";
export const SET_2ND_REPORT_BRANCH = "SET_2ND_REPORT_BRANCH";
export const SET_2ND_REPORT_DIVISION = "SET_2ND_REPORT_DIVISION";
export const SET_2ND_REPORT_STATUS = "SET_2ND_REPORT_STATUS";
export const SET_2ND_REPORT_DISABLED = "SET_2ND_REPORT_DISABLED";
export const CLEAR_2ND_REPORT_DIVISION = "CLEAR_2ND_REPORT_DIVISION";
// Unrelevant Report
export const GET_UNRELEVANT_REPORT = "GET_UNRELEVANT_REPORT";
export const GET_UNRELEVANT_REPORT_YEAR = "GET_UNRELEVANT_REPORT_YEAR";
export const GET_UNRELEVANT_REPORT_DIVISION = "GET_UNRELEVANT_REPORT_DIVISION";
export const SET_UNRELEVANT_REPORT_DATA_TYPE =
  "SET_UNRELEVANT_REPORT_DATA_TYPE";
export const SET_UNRELEVANT_REPORT_DATE_TYPE = "SET_UNRELEVANT_REPORT_DATE";
export const SET_UNRELEVANT_REPORT_START_DATE =
  "SET_UNRELEVANT_REPORT_START_DATE";
export const SET_UNRELEVANT_REPORT_END_DATE = "SET_UNRELEVANT_REPORT_END_DATE";
export const SET_UNRELEVANT_REPORT_YEAR = "SET_UNRELEVANT_REPORT_YEAR";
export const SET_UNRELEVANT_REPORT_BRANCH = "SET_UNRELEVANT_REPORT_BRANCH";
export const SET_UNRELEVANT_REPORT_DIVISION = "SET_UNRELEVANT_REPORT_DIVISION";
export const CLEAR_UNRELEVANT_REPORT_DIVISION =
  "CLEAR_UNRELEVANT_REPORT_DIVISION";
// Pdf Report
export const GET_PDF_REPORT = "GET_PDF_REPORT";
export const CLEAR_PDF_REPORT = "CLEAR_PDF_REPORT";