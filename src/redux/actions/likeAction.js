import { ALERT, LIKE } from "../types/types";
import { getAPI, postAPI, deleteAPI } from "../../utils/api";

export const getLikes = () => async (dispatch) => {

    try {
        dispatch({ type: ALERT, payload: { loading: false } })
        const res = await getAPI(`likes`);
        dispatch({ type: LIKE, payload: res.data })
    } catch (err) {
        dispatch({ type: ALERT, payload: "Service Error" })
    }
}


export const like = (likeState, access_token) => async (dispatch) => {
    try {
        const accessToken = access_token
        dispatch({ type: ALERT, payload: { loading: false } })
        const res = await postAPI("like", likeState, accessToken)
        dispatch({
            type: LIKE,
            payload: res.data
        })
        dispatch({ type: ALERT, payload: { success: res.data.message } });

    } catch (err) {
        dispatch({ type: ALERT, payload: { errors: err?.response?.data.message } });
    }
}


export const unlike = (id, access_token) => async (dispatch) => {
    try {
        const accessToken = access_token

        dispatch({ type: ALERT, payload: { loading: false } });
        const res = await deleteAPI(`unlike/${id}`, accessToken);
        dispatch({ type: ALERT, payload: { success: res.data.message } })
    } catch (err) {
        dispatch({ type: ALERT, payload: err?.response.data.message })
    }
}

