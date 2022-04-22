import { ALERT, POST } from "../types/types";
import { getAPI, postAPI } from "../../utils/api";

export const getPosts = () => async (dispatch) => {
    try {
        const res = await getAPI('posts', null);
        dispatch({ type: POST, payload: res.data })
    } catch (err) {
        dispatch({ type: ALERT, payload: "Service Error" })
    }
}

export const createPost = (post, access_token) => async (dispatch) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true } });
        const accessToken = access_token
        const res = await postAPI("postCreate", post, accessToken)
        dispatch({
            type: POST,
            payload: res.data
        });
        dispatch({ type: ALERT, payload: { success: res.data.message } });

    } catch (err) {
        dispatch({ type: ALERT, payload: { errors: err?.response?.data.message } });
    }
}