import { combineReducers } from "redux";
import reviews from "./reviews";
import { routerReducer } from "react-router-redux";

const rootReducer = combineReducers({
  reviews,
  routing: routerReducer
});

export default rootReducer;
