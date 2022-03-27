import {  ALERT, POST } from "../types/types";
import {  getAPI } from "../../utils/api";

export const getPosts = () => async (dispatch) => {
    try {
        dispatch({ type: ALERT, payload: { loading: false } })
        const res = await getAPI('posts', null);
        dispatch({ type: POST, payload: res.data })
    } catch (err) {
        dispatch({ type: ALERT, payload: err?.response.data.message })
    }
}