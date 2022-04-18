import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { alertReducer } from "./alertReducer";
import { postReducer } from "./postReducer";
import { topicReducer } from "./topicReducer";
import { userReducer } from "./userReducer";
import { likeReducer } from "./likeReducer";
import { commentReducer } from "./commentReducer";

export default combineReducers({
  authReducer,
  alertReducer,
  postReducer,
  topicReducer,
  userReducer,
  likeReducer,
  commentReducer
});
