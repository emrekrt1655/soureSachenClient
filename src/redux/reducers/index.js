import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { alertReducer } from "./alertReducer";
import { postReducer } from "./postReducer";
import { topicReducer } from "./topicReducer";

export default combineReducers({
  authReducer,
  alertReducer,
  postReducer,
  topicReducer
});
