import { combineReducers } from "redux";
import PostReducer from "./post";
import AuthReducer from "./auth";

export default combineReducers({
  PostReducer,
  AuthReducer,
});
