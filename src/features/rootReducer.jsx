import { combineReducers } from "redux";
import authReducer from "./auth/authSlice";
import branchReducer from "./branch/branchSlice";
import likelihoodsReducer from "./likelihoods/likelihoodsSlice";
import divisionSlice from "./division/divisionSlice";
import measureSlice from "./measure/measureSlice";
import impactSlice from "./impact/impactSlice";
import levelSlice from "./level/levelSlice";
import yearSlice from "./year/yearSlice";
import transactionSlice from "./transaction/transactionSlice";
import userSlice from "./user/userSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  branch: branchReducer,
  likelihoods: likelihoodsReducer,
  division: divisionSlice,
  measure: measureSlice,
  impact: impactSlice,
  level: levelSlice,
  year: yearSlice,
  transaction : transactionSlice,
  user: userSlice,

});

export default rootReducer;
