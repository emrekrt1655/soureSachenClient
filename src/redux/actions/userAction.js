import {  ALERT, USER } from "../types/types";
import {  getAPI } from "../../utils/api";

export const getUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALERT, payload: { loading: false } })
        const res = await getAPI('users', null);
        dispatch({ type: USER, payload: res.data })
    } catch (err) {
        dispatch({ type: ALERT, payload: err?.response.data.message })
    }
}