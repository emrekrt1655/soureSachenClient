import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { alertReducer } from "./alertReducer";
import { postReducer } from "./postReducer";
import { topicReducer } from "./topicReducer";
import { userReducer } from "./userReducer";

export default combineReducers({
  authReducer,
  alertReducer,
  postReducer,
  topicReducer,
  userReducer
});
