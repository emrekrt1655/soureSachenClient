import { ALERT, FOLLOWER } from "../types/types";
import { getAPI, postAPI } from "../../utils/api";




export const getFollowers = ({ access_token }) => async (dispatch) => {
    try {
        const accessToken = access_token
        const res = await getAPI(`followers`, accessToken);
        dispatch({ type: FOLLOWER, payload: res.data })
    } catch (err) {
        dispatch({ type: ALERT, payload: err?.response.data.message })
    }
}

export const follow = (follower, access_token) => async (dispatch) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true } });
        const accessToken = access_token
        const res = await postAPI("follow", follower, accessToken)
        dispatch({
            type: FOLLOWER,
            payload: res.data
        });
        dispatch({ type: ALERT, payload: { success: res.data.message } });

    } catch (err) {
        dispatch({ type: ALERT, payload: { errors: err?.response?.data.message } });
    }
}



export const deleteFollower = (folId, access_token) => async (dispatch) => {
    try {
        const accessToken = access_token
        dispatch({ type: ALERT, payload: { loading: true } });
        const res = await deleteAPI(`unfollow/${folId}`, accessToken);
        dispatch({ type: ALERT, payload: { success: res.data.message } })
    } catch (err) {
        dispatch({ type: ALERT, payload: err?.response.data.message })
    }
}
