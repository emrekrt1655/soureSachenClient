import { AUTH, ALERT, POST, TOPIC } from "../types/types";
import { postAPI, getAPI, putAPI, deleteAPI } from "../../utils/api";

export const getTopics = () => async (dispatch) => {
    try {
        dispatch({ type: ALERT, payload: {loading: true}})
        const res = await getAPI('topics', null);
        dispatch({ type: TOPIC, payload: res.data})
    } catch(err) {
        dispatch({ type: ALERT, payload: err?.response.data.message})
    }
}