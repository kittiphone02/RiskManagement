import { combineReducers } from "redux";
import authReducer from "./auth/authSlice";
import branchReducer from "./branch/branchSlice";
import likelihoodsReducer from "./likelihoods/likelihoodsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  branch: branchReducer,
  likelihoods: likelihoodsReducer,
});

export default rootReducer;
