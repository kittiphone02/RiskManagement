import { combineReducers } from "redux";
// import { loadingBarReducer } from "react-redux-loading-bar";
import auth from "./auth";
import alert from "./alert";
// import unrelevantReport from "./unrelevantReport";
import { LOGOUT } from "../types/types";

const appReducer = combineReducers({
  auth,
  alert,
});

// reset the state of a redux store
// const rootReducer = (state, action) => {
//   if (action.type === LOGOUT) {
//     state = undefined;
//   }
//   return appReducer(state, action);
// };

// reset the state of a redux store
const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
