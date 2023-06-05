import { combineReducers } from "redux";
import authReducer from "./auth/authSlice";
import branchReducer from "./branch/branchSlice";
import likelihoodsReducer from "./likelihoods/likelihoodsSlice";
import divisionSlice from "./division/divisionSlice";
import measureSlice from "./measure/measureSlice";
import impactSlice from "./impact/impactSlice";
import levelSlice from "./level/levelSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  branch: branchReducer,
  likelihoods: likelihoodsReducer,
  division: divisionSlice,
  measure: measureSlice,
  impact: impactSlice,
  level: levelSlice,
});

export default rootReducer;
