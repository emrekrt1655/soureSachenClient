import { ALERT, TOPIC } from "../types/types";
import { postAPI, getAPI } from "../../utils/api";

export const getTopics = () => async (dispatch) => {
    try {
        const res = await getAPI('topics');
        dispatch({ type: TOPIC, payload: res.data })
    } catch (err) {
        dispatch({ type: ALERT, payload: "Service Error" })
    }
}

export const createTopic = (topic, access_token) => async (dispatch) => {
    try {
        const accessToken = access_token
        dispatch({ type: ALERT, payload: { loading: true } })
        const res = await postAPI("topicCreate", topic, accessToken)
        dispatch({
            type: TOPIC,
            payload: res.data
        });
        dispatch({ type: ALERT, payload: { success: res.data.message } });

    } catch (err) {
        dispatch({ type: ALERT, payload: { errors: err?.response?.data.message } });
    }
}