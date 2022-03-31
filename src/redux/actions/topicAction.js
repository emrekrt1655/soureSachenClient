import {  ALERT, TOPIC } from "../types/types";
import { postAPI, getAPI } from "../../utils/api";

export const getTopics = () => async (dispatch) => {
    try {
        dispatch({ type: ALERT, payload: {loading: false}})
        const res = await getAPI('topics');
        dispatch({ type: TOPIC, payload: res.data})
    } catch(err) {
        dispatch({ type: ALERT, payload: err?.response.data.message})
    }
}

export const createTopic= (topic, access_token) => async (dispatch) => {
    try{
        const accessToken = access_token
        const res = await postAPI("topicCreate", topic, accessToken)
        dispatch({
            type: TOPIC,
            payload: res.data
          });
          dispatch({ type: ALERT, payload: { success: res.data.message } });

    }catch (err) {
        dispatch({ type: ALERT, payload: { errors: err?.response?.data.message } });
      }
}