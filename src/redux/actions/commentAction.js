import { ALERT, COMMENT } from "../types/types";
import { getAPI, postAPI, deleteAPI } from "../../utils/api";

export const getComments = (postId) => async (dispatch) => {
  try {
    const res = await getAPI(`comments/${postId}`, null);
    dispatch({ type: COMMENT, payload: res.data });
  } catch (err) {
    dispatch({ type: ALERT, payload: "Service Error" });
  }
};

export const createComment = (comment, access_token) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    const accessToken = access_token;
    const res = await postAPI("commentCreate", comment, accessToken);
    dispatch({
      type: COMMENT,
      payload: res.data,
    });
    dispatch({ type: ALERT, payload: { success: res.data.message } });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err?.response?.data.message } });
  }
};

export const deleteComment = (commentId, access_token) => async (dispatch) => {
  try {
    const accessToken = access_token;
    dispatch({ type: ALERT, payload: { loading: true } });
    const res = await deleteAPI(`commentDelete/${commentId}`, accessToken);
    dispatch({ type: ALERT, payload: { success: res.data.message } });
  } catch (err) {
    dispatch({ type: ALERT, payload: err?.response.data.message });
  }
};
